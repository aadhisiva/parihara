import { Service } from "typedi";
import { AdminRepo } from "../apiRepository/adminRepo";
import {
    generateUniqueId,
} from "../utils/resuableCode";
import { API_MESSAGES } from "../utils/constants";
import { OtpServices } from "../sms/smsServceResusable";
import { RESPONSEMSG } from "../utils/statusCodes";
import { PariharaData } from "../entities/pariharaData";
import jsonWebToken from 'jsonwebtoken';

@Service()
export class AdminServices {
    constructor(public adminRepo: AdminRepo, public otpServices: OtpServices) { }

    async signupUser(data) {
        const { Mobile, RoleId, Version } = data;
        if (!Mobile) return { code: 400, message: "Provide Mobile" };
        if (!RoleId) return { code: 400, message: "Provide RoleId" };
        data.UserId = await generateUniqueId();
        let checkLoginUser = await this.adminRepo.checkLoginUser(data);
        if (checkLoginUser) return { code: 422, message: "Your Already Registered With Mobile And Role" };
        let checkUserData = await this.adminRepo.addUser(data);
        return checkUserData;
    }

    async checkMobileLogin(data) {
        const { Mobile } = data;
        if (!Mobile) return { code: 400, message: "Provide Mobile" };
        data.Otp = "1111";
        let finRoleByMobile = await this.adminRepo.checkMobileLogin(data);
        if (finRoleByMobile['code'] == 422) return { code: 422, message: finRoleByMobile['message'] };
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
        // }
        let resObj = {
            Mobile,
            Otp: data.Otp,
            Token: jsonWebToken.sign({ RoleId: finRoleByMobile[0]?.RoleId, Mobile: Mobile }, process.env.SECRET_KEY, { expiresIn: '24h' }),
            UserData: finRoleByMobile
        }
        return resObj;
    };

    async findAccessById(data) {
        const { RoleId } = data;
        if (!RoleId) return { code: 400, message: "Provide Mobile" };
        return await this.adminRepo.checkRoleAccess(data);
    };

    async verifyOtp(data) {
        const { Otp } = data;
        let checkUserData = await this.adminRepo.verfiyWithUserId(data);
        if (!checkUserData) return { code: 422, message: "Your Data Does't Exist." }
        let checkOtp = checkUserData.Otp == Otp;
        if (!checkOtp) return { code: 422, message: API_MESSAGES.VERIFICATION_FAILED };
        return { message: API_MESSAGES.VERIFICATION_SUCCESS, data: {} };
    }

    async saveSurveyData(data: PariharaData) {
        const { RoleId, LossType, DateOfDamage } = data;
        if (!RoleId) return { code: 400, message: "Provide RoleId." };
        if (!LossType) return { code: 400, message: "Provide LossType." };
        let getData = await this.adminRepo.saveSurveyData(data);
        return getData;
    }

    async updateSurveyData(data: PariharaData) {
        const { SubmissionId } = data;
        if (!SubmissionId) return { code: 400, message: "Provide SubmissionId." };
        let getData = await this.adminRepo.updateSurveyData(data);
        return getData;
    };

    async getSubmissionList(data: PariharaData) {
        const { RoleId } = data;
        // console.log(data);
        let getRoles = await this.adminRepo.FetchLoginAccessData(RoleId);
        let getData = await this.adminRepo.getSubmissionList(data, getRoles);
        return getData;
    };

    async getSubmissionData(data: PariharaData) {
        const { SubmissionId } = data;
        if (!SubmissionId) return { code: 400, message: "Provide SubmissionId." };
        let getData = await this.adminRepo.getSubmissionData(data);
        return getData;
    };

    async retriveMasters(data) {
        const { DistrictCode } = data;
        if (!DistrictCode) {
            let getData = await this.adminRepo.retriveDistrictWithCodes();
            return getData;
        } else {
            let distict = await this.adminRepo.retriveOnlyDistrict(DistrictCode);
            distict[0]['TalukArray'] = await this.adminRepo.retriveOnlyTaluks(distict[0]?.DistrictCode);
            for (let i = 0; i < distict[0]['TalukArray'].length; i++) {
                let each = distict[0]['TalukArray'][i];
                each['GpArray'] = await this.adminRepo.retriveOnlyGp(each.TalukCode, distict[0]?.DistrictCode);
                for (let j = 0; j < each['GpArray'].length; j++) {
                    let eachHobliObj = each['GpArray'][j];
                    eachHobliObj['VillageArray'] = await this.adminRepo.retriveOnlyVillages(eachHobliObj.GpCode,each.TalukCode, distict[0]?.DistrictCode);
                };
            };
            return distict;
        };
    };


    async assigningProcess(data) {
        const { ReqType, DistrictCode, TalukCode, VillageCode, GpCode, ListType } = data;
        if (!DistrictCode) return { code: 400, message: "Provide DistrictCode" };
        if (!ListType) return { code: 400, message: "Provide ListType" };
        if (ReqType == 1) {
            return await this.adminRepo.assignToRespectivType(data);
        } else if (ReqType == 2) {
            if (!TalukCode) return { code: 400, message: "Provide TalukCode" };
            return await this.adminRepo.assignToRespectivType(data);
        } else if (ReqType == 3) {
            if (!TalukCode) return { code: 400, message: "Provide TalukCode" };
            if (!GpCode) return { code: 400, message: "Provide GpCode" };
            return await this.adminRepo.assignToVaSurvey(data);
        } else if (ReqType == 2) {
            if (!GpCode) return { code: 400, message: "Provide GpCode" };
            if (!VillageCode) return { code: 400, message: "Provide VillageCode" };
            if (!TalukCode) return { code: 400, message: "Provide DistrictCode" };
            return await this.adminRepo.assignToRespectivType(data);
        } else {
            return { code: 400, message: "Your request is not found", data: {} };
        };
    };

    async getAssignedMasters(data) {
        const { ReqType, Mobile } = data;
        if (!ReqType) return { code: 400, message: "Provide ReqType" };
        if (!Mobile) return { code: 400, message: "Provide Mobile" };
        return await this.adminRepo.getAssignedData(data);
    };

    async assignRoleAccess(data) {
        const { RoleId, ReqType } = data;
        if (ReqType == "Get") {
            return await this.adminRepo.getRoleAccess();
        } else if (ReqType == "Add") {
            if (!RoleId) return { code: 400, message: "Provide RoleId" };
            return await this.adminRepo.assignRoleAccess(data);
        } else {
            return { code: 400, message: "Your request is not found", data: {} };
        }
    };

    async assignLossAndGet(data) {
        const { RoleId, ReqType } = data;
        if (ReqType == "Get") {
            return await this.adminRepo.getRoleToLossAccess();
        } else if (ReqType == "Add") {
            if (!RoleId) return { code: 400, message: "Provide RoleId" };
            return await this.adminRepo.assignRoleToLossAccess(data);
        } else {
            return { code: 400, message: "Your request is not found", data: {} };
        }
    };

    async assignChildAndGet(data) {
        const { RoleId, ReqType } = data;
        if (ReqType == "Get") {
            return await this.adminRepo.getChildAccess();
        } else if (ReqType == "Add") {
            if (!RoleId) return { code: 400, message: "Provide RoleId" };
            return await this.adminRepo.assignChildAccess(data);
        } else {
            return { code: 400, message: "Your request is not found", data: {} };
        }
    };

    async getMasterDropdown(data) {
        const { ReqType, UDCode, UTCode, UGCode,Mobile, loginType, Type } = data;
        if (!ReqType) return { code: 400, message: "Provide ReqType" };
        if (ReqType == 1) {
            if(loginType == "District"){
                return await this.adminRepo.getAuthDistrictDD(data);
            };
            return await this.adminRepo.getDistrictsDD(data);
        } else if (ReqType == 2) {
            if(loginType == "Taluk"){
                return await this.adminRepo.getAuthTalukDD(data);
            };
            if (!UDCode) return { code: 400, message: "Provide UDCode" };
            return await this.adminRepo.getTalukDD(UDCode, Type);
        } else if (ReqType == 3) {
            if(loginType == "Gp"){
                return await this.adminRepo.getAuthGpDD(data);
            };
            if (!UDCode) return { code: 400, message: "Provide UDCode" };
            if (!UTCode) return { code: 400, message: "Provide UTCode" };
            return await this.adminRepo.getGpDD(UDCode, UTCode, Type);
        } else if (ReqType == 4) {
            if (!UDCode) return { code: 400, message: "Provide UDCode" };
            if (!UTCode) return { code: 400, message: "Provide UTCode" };
            if (!UGCode) return { code: 400, message: "Provide UGCode" };
            return await this.adminRepo.getVillagesDD(UDCode, UTCode, UGCode);
        } else {
            return { code: 400, message: "Your request is not found", data: {} };
        }
    };

    async getMasters(data) {
        const { ReqType } = data;
        if (!ReqType) return { code: 400, message: "Provide ReqType" };
        if (ReqType == 1) {
            return await this.adminRepo.getDistrictMasters(data);
        } else if (ReqType == 2) {
            return await this.adminRepo.getTalukMasters(data);
        } else if (ReqType == 3) {
            return await this.adminRepo.getGpMasters(data);
        } else if (ReqType == 4) {
            return await this.adminRepo.getVillagemasters(data);
        } else {
            return { code: 400, message: "Your request is not found", data: {} };
        }
    };

    async question(data) {
        const { ReqType } = data;
        if (ReqType == "Get") {
            return this.adminRepo.getQuestions();
        } else if (ReqType == "Add") {
            return this.adminRepo.saveQuestions(data);
        } else if (ReqType == "Dropdown") {
            return this.adminRepo.getQuestionDropdown();
        } else {
            return { code: 422, message: "Send correct input." }
        }
    };

    async addRolesOrGet(data) {
        const { ReqType } = data;
        if (ReqType == "Get") {
            return this.adminRepo.getAllRoles();
        } else if (ReqType == "Add") {
            return this.adminRepo.addRoles(data);
        } else if (ReqType == "Dropdown") {
            return this.adminRepo.getRolesDropdown();
        } else {
            return { code: 422, message: "Send correct input." }
        }
    };

    async getChildBasedOnParent(data){
        return this.adminRepo.getChildBasedOnParent(data);
    };
    
    async uploadDistrictMasters(data) {
        let chunkSize = 50;
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            await this.adminRepo.uploadDistrictMasters(chunk);
        }
        return { code: 200, message: "Uploaded Successfully.", data: {} }
    };

    async uploadTalukMasters(data) {
        let chunkSize = 50;
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            await this.adminRepo.uploadTalukMasters(chunk);
        }
        return { code: 200, message: "Uploaded Successfully.", data: {} }
    };

    async uploadGpMasters(data) {
        let chunkSize = 50;
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            await this.adminRepo.uploadGpMasters(chunk);
        }
        return { code: 200, message: "Uploaded Successfully.", data: {} }
    };

    async uploadVillageMasters(data) {
        let chunkSize = 50;
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            await this.adminRepo.uploadVillageMasters(chunk);
        }
        return { code: 200, message: "Uploaded Successfully.", data: {} }
    };

}
