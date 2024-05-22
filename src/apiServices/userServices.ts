import { Service } from "typedi";
import { UserRepo } from "../apiRepository/userRepo";
import {
    generateUniqueId,
} from "../utils/resuableCode";
import { API_MESSAGES } from "../utils/constants";
import { OtpServices } from "../sms/smsServceResusable";
import { RESPONSEMSG } from "../utils/statusCodes";
import { PariharaData } from "../entities/pariharaData";
import { UserData } from "../entities";
import { AppDataSource } from "../db/config";
import { EkycData } from "../entities/ekycData";
import { ekycPostAPi } from "../utils/kutumba/kutumbaData";
import { daysCalFromDate } from "../utils/helpers";

@Service()
export class UserServices {
    constructor(public userRepo: UserRepo, public otpServices: OtpServices) { }

    async signupUser(data: UserData) {
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

    async loginUser(data: UserData) {
        const { Mobile, RoleId } = data;
        if (!Mobile) return { code: 400, message: "Provide Mobile" };
        if (!RoleId) return { code: 400, message: "Provide RoleId" };
        // data.Otp = generateOTP(4);
        data.Otp = "1111";
        let checkUserData = await this.userRepo.updateUser(data);
        if (checkUserData?.code == 422) return checkUserData;
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
        return {
            message: RESPONSEMSG.OTP, data: {
                UserId: checkUserData.UserId,
                RoleId: checkUserData.RoleId
            }
        };
    }

    async verifyOtp(data: UserData) {
        const { Otp } = data;
        let checkUserData = await this.userRepo.verfiyWithUserId(data);
        if (!checkUserData) return { code: 422, message: "Your Data Does't Exist." }
        let checkOtp = checkUserData.Otp == Otp;
        if (!checkOtp) return { code: 422, message: API_MESSAGES.VERIFICATION_FAILED };
        return { message: API_MESSAGES.VERIFICATION_SUCCESS, data: {} };
    }

    async saveSurveyData(data: PariharaData) {
        const {RoleId, LossType, DateOfDamage } = data;
        if (!RoleId) return { code: 400, message: "Provide RoleId." };
        if (!LossType) return { code: 400, message: "Provide LossType." };
        // if (!DateOfDamage) return { code: 400, message: "Provide DateOfDamage." };
        // if (!ApplicantAadhar) return { code: 400, message: "Provide ApplicantAadhar." };
        data.NoOfDaysFromDamage = daysCalFromDate(DateOfDamage);
        let getData = await this.userRepo.saveSurveyData(data);
        return getData;
    }

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
            let getData = await this.userRepo.getSubmissionListAll(data);
            return getData;
        }
        if (!LossType) return { code: 400, message: "Provide LossType." };
        let getData = await this.userRepo.getSubmissionList(data);
        return getData;
    };

    async getSubmissionData(data: PariharaData) {
        const { SubmissionId } = data;
        if (!SubmissionId) return { code: 400, message: "Provide SubmissionId." };
        let getData = await this.userRepo.getSubmissionData(data);
        return getData;
    };

    async saveSurveyImages(data: PariharaData) {
        const { SubmissionId } = data;
        if (!SubmissionId) return { code: 400, message: "Provide SubmissionId." };
        let savedData = await this.userRepo.saveSurveyImages(data);
        return savedData;
    };

    async ekycProcess(data) {
        const { ApplicantAadhar } = data;
        let checkAadharStatus = await this.userRepo.checkAadharStatus(ApplicantAadhar);
        if (checkAadharStatus) return { code: 422, message: "Ekyc verification completed." };
        let txnDateTime = new Date().getFullYear() + "" + new Date().getTime();
        let bodyData = {
            deptCode: process.env.DEP_CODE,
            applnCode: process.env.APPLI_CODE,
            schemeCode: process.env.SCHEME_CODE,
            beneficiaryID: txnDateTime,
            beneficiaryName: data?.name,
            integrationKey: process.env.INTEGRATION_KEY,
            integrationPassword: process.env.INTEGRATION_PASS,
            txnNo: txnDateTime,
            txnDateTime: txnDateTime,
            serviceCode: process.env.SERVICE_CODE,
            responseRedirectURL: process.env.EKYC_REDIRECTION_URL
        };
        let res = await ekycPostAPi(process.env.EKYC_URL, bodyData);
        if (!res?.data?.Token) {
            return { code: 422, message: "Something went wrong." };
        } else {
            data.txnDateTime = txnDateTime;
            await this.userRepo.updateEkyctxnId(data);
            return { txnDateTime: txnDateTime, url: `${process.env.EKYC_TOKEN_URL}?key=${process.env.INTEGRATION_KEY}&token=${res?.data?.Token}` };
        };
    };

    async saveEkycData(data) {
        let newData = new EkycData({});
        let eKYCData = data.eKYCData;
        let localData = data.localKYCData;
        newData.txnNo = data.txnNo;
        newData.txnDateTime = data.txnDateTime;
        newData.aadhaarHash = data.aadhaarHash;
        newData.finalStatus = data.finalStatus;
        newData.vaultRefNumber = data.vaultRefNumber;
        newData.ekycTxnNo = data.ekycTxnNo;
        newData.ekycTimestamp = data.ekycTimestamp;
        newData.residentConsent = data.residentConsent;
        newData.status = data.status;
        newData.responseStatus = data.responseStatus;
        newData.errorMessage = data.errorMessage;
        newData.error = data.error;
        newData.uidToken = data.uidToken;
        newData.actionCode = data.actionCode;
        newData.otp = data.otp;
        newData.otpTxnNo = data.otpTxnNo;
        newData.otpTimeStamp = data.otpTimeStamp;
        newData.ekyc_dob = eKYCData.dob;
        newData.ekyc_gender = eKYCData.gender;
        newData.ekyc_name = eKYCData.name;
        newData.ekyc_co = eKYCData.co;
        newData.ekyc_country = eKYCData.country;
        newData.ekyc_dist = eKYCData.dist;
        newData.ekyc_house = eKYCData.house;
        newData.ekyc_street = eKYCData.street;
        newData.ekyc_lm = eKYCData.lm;
        newData.ekyc_loc = eKYCData.loc;
        newData.ekyc_pc = eKYCData.pc;
        newData.ekyc_po = eKYCData.po;
        newData.ekyc_state = eKYCData.state;
        newData.ekyc_subdist = eKYCData.subdist;
        newData.ekyc_vtc = eKYCData.vtc;
        newData.ekyc_lang = eKYCData.lang;
        newData.local_dob = localData.dob;
        newData.local_gender = localData.gender;
        newData.local_name = localData.name;
        newData.local_co = localData.co;
        newData.local_country = localData.country;
        newData.local_dist = localData.dist;
        newData.local_house = localData.house;
        newData.local_street = localData.street;
        newData.local_lm = localData.lm;
        newData.local_loc = localData.loc;
        newData.local_pc = localData.pc;
        newData.local_po = localData.po;
        newData.local_state = localData.state;
        newData.local_subdist = localData.subdist;
        newData.local_vtc = localData.vtc;
        newData.local_lang = localData.lang;
        newData.photo = data.photo;
        newData.maskedAadhaar = data.maskedAadhaar;
        newData.npciStatus = data.npciStatus;
        newData.npciError = data.npciError;
        newData.npciBankName = data.npciBankName;
        newData.npciLastUpdateDate = data.npciLastUpdateDate;
        return await this.userRepo.saveEkycData(newData);
    };

    async updateEkycProcess(data) {
        const { SubmissionId, txnDateTime } = data;
        let checkData = await this.userRepo.fetchEkycData(txnDateTime);
        if (!checkData) return { code: 422, message: "Ekyc access denied." };
        if (checkData?.finalStatus == 'F') return { code: 422, message: checkData.errorMessage, data: {} };
        return await this.userRepo.updateEkycAfter(SubmissionId);
    };

}
