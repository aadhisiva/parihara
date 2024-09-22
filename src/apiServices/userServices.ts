import { Service } from "typedi";
import { UserRepo } from "../apiRepository/userRepo";
import {
    generateOTP,
    generateUniqueId,
    GetEscomDataFromApi,
    GetRdMinorityData,
    saveMobileOtps,
} from "../utils/resuableCode";
import { API_MESSAGES } from "../utils/constants";
import { OtpServices } from "../sms/smsServceResusable";
import { RESPONSEMSG } from "../utils/statusCodes";
import { PariharaData } from "../entities/pariharaData";
import { EkycData } from "../entities/ekycData";
import { fetchDataFromKutumba } from "../utils/kutumba/kutumbaData";
import { daysCalFromDate } from "../utils/helpers";
import { getDemoEkycDataFfromDBT, getEkycDataFfromDBT, mapToDemoAuthEkycDetails, mapToEkycDetails } from "../utils/ekyc";

@Service()
export class UserServices {
    constructor(public userRepo: UserRepo, public otpServices: OtpServices) { }

    async signupUser(data) {
        const { Mobile, RoleId } = data;
        if (!Mobile) return { code: 400, message: "Provide Mobile" };
        if (!RoleId) return { code: 400, message: "Provide RoleId" };
        data.UserId = await generateUniqueId();
        // data.Otp = generateOTP(4);
        data.Otp = "1111";
        let checkLoginUser = await this.userRepo.checkLoginUser(data);
        if (checkLoginUser) return { code: 422, message: "Your Already Registered With Mobile And Role" };
        let checkUserData = await this.userRepo.addUser(data);
        // let sendSingleSms = await this.otpServices.sendOtpAsSingleSms(
        //     Mobile,
        //     data?.Otp
        // );
        // await saveMobileOtps(
        //     Mobile,
        //     sendSingleSms?.otpMessage,
        //     sendSingleSms?.response,
        //     data?.UserId,
        //     data?.Otp
        // );
        // if (sendSingleSms.code !== 200) {
        //     return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        // };
        return {
            message: RESPONSEMSG.OTP, data: {
                UserId: checkUserData.UserId,
                RoleId: checkUserData.RoleId
            }
        };
    }

    async loginUser(data) {
        const { Mobile, RoleId } = data;
        if (!Mobile) return { code: 400, message: "Provide Mobile" };
        if (!RoleId) return { code: 400, message: "Provide RoleId" };
        data.Otp = generateOTP(4);
        // data.Otp = "1111";
        let checkUserData = await this.userRepo.updateUser(data);
        if (checkUserData['code'] == 422) return checkUserData;
        let sendSingleSms = await this.otpServices.sendOtpAsSingleSms(
            Mobile,
            data?.Otp
        );
        await saveMobileOtps(
            Mobile,
            sendSingleSms?.otpMessage,
            sendSingleSms?.response,
            data?.UserId,
            data?.Otp
        );
        if (sendSingleSms.code !== 200) {
            return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        }
        return {
            message: RESPONSEMSG.OTP, data: checkUserData
        };
    };

    async sendOtpForAuth(data){
        data.Otp = generateOTP(4);
        // data.Otp = "1111";
        const {Mobile, Otp, UserId} = data;
        let sendSingleSms = await this.otpServices.sendOtpAsSingleSms(
            Mobile,
            Otp
        );
        await saveMobileOtps(
            Mobile,
            sendSingleSms?.otpMessage,
            sendSingleSms?.response,
            UserId,
            Otp
        );
        if (sendSingleSms.code !== 200) {
            return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        };
        return {message: RESPONSEMSG.OTP ,data: Otp}
    }

    async verifyOtp(data) {
        const { Otp, Mobile } = data;
        let checkUserData = await this.userRepo.verfiyWithUserId(data);
        if (!checkUserData) return { code: 422, message: "Your Data Does't Exist." }
        let checkOtp = checkUserData.Otp == Otp;
        if (!checkOtp) return { code: 422, message: API_MESSAGES.VERIFICATION_FAILED };
        return { message: API_MESSAGES.VERIFICATION_SUCCESS, data: {} };
    }

    async saveSurveyData(data) {
        const { RoleId, LossType, DateOfDamage } = data;
        if (!RoleId) return { code: 400, message: "Provide RoleId." };
        if (!LossType) return { code: 400, message: "Provide LossType." };
        let getData: any = await this.userRepo.saveSurveyData(data);
        if(getData?.code == 422) return {code: getData?.code, message: getData?.message};
        let imagesList = data?.ImagesList;
        let error;
        for (let i = 0; i < imagesList?.length; i++) {
            let eachList = imagesList[i];
            eachList['SubmissionId'] = getData.SubmissionId;
            if (!eachList['SubmissionId']) return { code: 400, message: "Provide SubmissionId." };
            eachList['UserId'] = data.UserId;
            let saveImage = await this.userRepo.saveSurveyImages(eachList);
            if (saveImage?.code == 422) {
                error = saveImage.message;
            };
        };
        if (error) return { code: 422, message: error };
        return getData;
    };

    async assignedGpDetails(data) {
        let result = await this.userRepo.assignedGpDetails(data);
        if(result?.length == 0) return {code: 422, message: "Access denied"};
        return result;
    };

    async updateSurveyData(data: PariharaData) {
        const { SubmissionId } = data;
        if (!SubmissionId) return { code: 400, message: "Provide SubmissionId." };
        let getData = await this.userRepo.updateSurveyData(data);
        return getData;
    };

    async getSubmissionList(data: PariharaData) {
        const { SurveyStatus, LossType } = data;
        if (!SurveyStatus) return { code: 400, message: "Provide SurveyStatus." };
        if (SurveyStatus == "History") {
            if (!LossType) {
                let getData = await this.userRepo.getSubmissionListAll(data);
                return getData;
            } else {
                let getData = await this.userRepo.getSubmissionListAllWithLossType(data);
                return getData;
            }
        }
        if (!LossType) return { code: 400, message: "Provide LossType." };
        let getData = await this.userRepo.getSubmissionList(data);
        return getData;
    };

    async getAllList(data: PariharaData) {
        const { SurveyStatus, LossType } = data;
        if (!SurveyStatus) return { code: 400, message: "Provide SurveyStatus." };
        let findAccess = await this.userRepo.getUserAccessData(data);
        if (SurveyStatus == "History") {
            if (!LossType) {
                let getData = await this.userRepo.geAllList(data, findAccess);
                return getData;
            } else {
                let getData = await this.userRepo.getAllLossType(data, findAccess);
                return getData;
            }
        }
        if (!LossType) return { code: 400, message: "Provide LossType." };
        let getData = await this.userRepo.getAllListTypesWise(data, findAccess);
        return getData;
    };

    async getSubmissionData(data: PariharaData) {
        const { SubmissionId } = data;
        if (!SubmissionId) return { code: 400, message: "Provide SubmissionId." };
        let getData = await this.userRepo.getSubmissionData(data);
        return getData;
    };

    async getEkycToken(data) {
        const { ApplicantAadhar } = data;
        let checkAadharStatus = await this.userRepo.checkAadharStatus(ApplicantAadhar);
        if (checkAadharStatus) return { code: 422, message: "Ekyc verification completed." };
        data.txnDateTime = new Date().getFullYear() + "" + new Date().getTime();
        data.UniqueId = new Date().getTime();
        let ekycIntiResponse = await getEkycDataFfromDBT(data);
        if (ekycIntiResponse['code'] == 422) return { code: 422, message: ekycIntiResponse['message'] };
        return { txnDateTime: data?.txnDateTime, url: ekycIntiResponse };
    };
    

    async saveEkycData(data) {
        const mappedData = mapToEkycDetails(data);
        return await this.userRepo.saveEkycData(mappedData);
    };

    async updateEkycProcess(data) {
        const { txnDateTime } = data;
        let checkData = await this.userRepo.fetchEkycData(txnDateTime);
        if (!checkData) return { code: 422, message: "Ekyc access denied." };
        if (checkData?.finalStatus == 'F') return { code: 422, message: checkData.errorMessage, data: {} };
        let updatedData = await this.userRepo.updateEkycAfter(data, "Ekyc");
        if(updatedData['code'] == 422) return {code: 422, message: updatedData['message']};
        return updatedData;
    };

    async updateDemoAuthProcess(data) {
        const { txnDateTime } = data;
        let checkData = await this.userRepo.fetchDemoEkycData(txnDateTime);
        if (!checkData) return { code: 422, message: "Demo Ekyc access denied." };
        if(Number(checkData?.NameMatchScore) <= 50) return {code: 422, message: "As per aadhaar, Your name has not matched."};
        if(checkData?.NameMatchStatus !== "S") return {code: 422, message: "Demo Auth Verfiication Failed"};
        let updatedData = await this.userRepo.updateEkycAfter(data, "Demo");
        if(updatedData['code'] == 422) return {code: 422, message: updatedData['message']};
        return updatedData;
    };

    async retriveMasters(data) {
        const { DistrictCode, Type } = data;
        if (!DistrictCode) {
            let getData = await this.userRepo.retriveDistrictWithCodes();
            return getData;
        } else {
            let distict = await this.userRepo.retriveOnlyDistrict(DistrictCode);
            distict[0]['TalukArray'] = await this.userRepo.retriveOnlyTaluks(distict[0]?.DistrictCode, Type);
            for (let i = 0; i < distict[0]['TalukArray'].length; i++) {
                let each = distict[0]['TalukArray'][i];
                each['GpArray'] = await this.userRepo.retriveOnlyGp(each.TalukCode, distict[0]?.DistrictCode, Type);
                for (let j = 0; j < each['GpArray'].length; j++) {
                    let eachHobliObj = each['GpArray'][j];
                    eachHobliObj['VillageArray'] = await this.userRepo.retriveOnlyVillages(eachHobliObj.GpCode,each.TalukCode, distict[0]?.DistrictCode);
                };
            };
            return distict;
        };
    };


    async getDemoAuthToken(data) {
        data.txnDateTime = new Date().getFullYear() + "" + new Date().getTime();
        data.UniqueId = new Date().getTime();
        const demoAuthResponse = await getDemoEkycDataFfromDBT(data);
        if (demoAuthResponse['code'] == 422)  return { code: 422, message: demoAuthResponse['message'] };
        return { txnDateTime: data?.txnDateTime, url: demoAuthResponse };
    };

    async saveDemoAuthResponse(data) {
        const mappedData = mapToDemoAuthEkycDetails(data);
        return await this.userRepo.saveDemoAuthResponse(mappedData);
    };

    // async retriveMasters(data) {
    //     const { DistrictCode } = data;
    //     if (!DistrictCode) {
    //         let getData = await this.userRepo.retriveDistrictWithCodes();
    //         return getData;
    //     } else {
    //         let distict = await this.userRepo.retriveOnlyDistrict(DistrictCode);
    //         distict[0]['TalukArray'] = await this.userRepo.retriveOnlyTaluks(distict[0]?.DistrictCode);
    //         for (let i = 0; i < distict[0]['TalukArray'].length; i++) {
    //             let each = distict[0]['TalukArray'][i];
    //             each['HobliArray'] = await this.userRepo.retriveOnlyHobli(each.TalukCode);
    //             for (let j = 0; j < each['HobliArray'].length; j++) {
    //                 let eachHobliObj = each['HobliArray'][j];
    //                 eachHobliObj['VillageArray'] = await this.userRepo.retriveOnlyVillages(eachHobliObj.HobliCode);
    //             };
    //         };
    //         return distict;
    //     };
    // };

    async getKutumbaData(data) {
        const { rc, aadhar } = data;
        if (rc) {
            let getUserDetails = await fetchDataFromKutumba(data);
            if (!Array.isArray(getUserDetails))
                return { code: 422, message: getUserDetails?.StatusText };
            for (let i = 0; i < getUserDetails.length; i++) {
                await this.userRepo.saveKutumbaData(getUserDetails[i]);
            };
            return await this.userRepo.getKutumbaData(rc);
        } else {
            let getUserDetails = await fetchDataFromKutumba(data);
            if (!Array.isArray(getUserDetails))
                return { code: 422, message: getUserDetails?.StatusText };
            for (let i = 0; i < getUserDetails.length; i++) {
                await this.userRepo.saveKutumbaData(getUserDetails[i]);
            };
            return getUserDetails;
        }
    };

    async postEscomData(data) {
        let getEscomData = await GetEscomDataFromApi(data);
        const response = getEscomData.data;
        if (response.StatusCode !== "200") return { code: 422, message: response.Status };
        let saveData = await this.userRepo.saveEscomData(response);
        return saveData;
    };

    async getEdMinorityData(data) {
        let getRdData = await GetRdMinorityData(data.id);
        if(getRdData['code'] == 422) return {code: getRdData['code'], message: getRdData['message']}
        const result = getRdData['data'];
        if(!result.ApplicantDetails) return {code: 422, message: "Record Not Found"}
        let saveData = await this.userRepo.saveRdMinority(result?.ApplicantDetails);
        return saveData;
    }

    async uploadImages(imageObj) {
        let savedData = await this.userRepo.uploadImages(imageObj);
        let insertedId = savedData.id;

        // Construct video URL
        const imageUrl = `${process.env.PRO_URL}/api/mobile/getImage/${insertedId}`;
        return { insertedId: insertedId, imageUrlUrl: imageUrl };
    }

    async getImage(id) {
        let fetchData = await this.userRepo.getImage(id);
        if (!fetchData) return { code: 422, message: "Image not found" };
        return fetchData;
    }

    async uploadVideos(data) {
        let savedData = await this.userRepo.uploadVideos(data);
        let insertedId = savedData.id;

        // Construct video URL
        const videoUrl = `${process.env.PRO_URL}/api/mobile/getVideo/${insertedId}`;
        return { insertedId: insertedId, videoUrl: videoUrl };
    }

    async getVideo(id) {
        let fetchData = await this.userRepo.getVideo(id);
        if (!fetchData) return { code: 422, message: "Video not found" };
        return fetchData;
    }
}
