import { Service } from "typedi";
import { AdminRepo } from "../apiRepository/adminRepo";
import {
    generateUniqueId,
} from "../utils/resuableCode";
import { API_MESSAGES } from "../utils/constants";
import { OtpServices } from "../sms/smsServceResusable";
import { RESPONSEMSG } from "../utils/statusCodes";
import { PariharaData } from "../entities/pariharaData";
import { AssignMasters, UserData } from "../entities";
import { daysCalFromDate } from "../utils/helpers";
import jsonWebToken from 'jsonwebtoken';
import bcryptjs from "bcryptjs";


@Service()
export class AdminServices {
    constructor(public adminRepo: AdminRepo, public otpServices: OtpServices) { }

    // async addRolesAndAccess(data){
    //     if(data?.Role == "1"){
    //         return await this.adminRepo.saveLoginRoles(data);
    //     } else if(data?.Access == "1") {
    //         return await this.adminRepo.saveRoleAccess(data);
    //     } if(data?.Roles == "0"){
    //         return await this.adminRepo.getAllRoles();
    //     } else if(data?.Access == "0") {
    //         return await this.adminRepo.getAllAccess();
    //     } 
        
    // }

    async signupUser(data: UserData) {
        const { Mobile, RoleId, Version } = data;
        if (!Mobile) return { code: 400, message: "Provide Mobile" };
        if (!RoleId) return { code: 400, message: "Provide RoleId" };
        data.UserId = await generateUniqueId();
        // data.Otp = generateOTP(4);
        data.Otp = "1111";
        let checkLoginUser = await this.adminRepo.checkLoginUser(data);
        if (checkLoginUser) return { code: 422, message: "Your Already Registered With Mobile And Role" };
        let checkUserData = await this.adminRepo.addUser(data);
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
        const token = jsonWebToken.sign({ UserId: checkUserData.UserId, RoleId: checkUserData.RoleId, Mobile: Mobile }, 
                process.env.SECRET_KEY, { expiresIn: '24h' });
        return {
            message: RESPONSEMSG.OTP, data: { Otp: data?.Otp, token }
        };
    }

    async sendOtp(data: UserData) {
        const { Mobile, RoleId, Version } = data;
        if (!Mobile) return { code: 400, message: "Provide Mobile" };
        if (!RoleId) return { code: 400, message: "Provide RoleId" };
        // data.Otp = generateOTP(4);
        data.Otp = "1111";
        let checkUserData = await this.adminRepo.updateUser(data);
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
        const token = jsonWebToken.sign({ UserId: checkUserData.UserId, RoleId: checkUserData.RoleId, Mobile: Mobile }, process.env.SECRET_KEY, { expiresIn: '24h' });
        return {
            message: RESPONSEMSG.OTP, data: {otp: data?.Otp, token}
        };
    }

    async verifyOtp(data: UserData) {
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
        // if (!DateOfDamage) return { code: 400, message: "Provide DateOfDamage." };
        // if (!ApplicantAadhar) return { code: 400, message: "Provide ApplicantAadhar." };
        data.NoOfDaysFromDamage = daysCalFromDate(DateOfDamage);
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
                each['HobliArray'] = await this.adminRepo.retriveOnlyHobli(each.TalukCode);
                for (let j = 0; j < each['HobliArray'].length; j++) {
                    let eachHobliObj = each['HobliArray'][j];
                    eachHobliObj['VillageArray'] = await this.adminRepo.retriveOnlyVillages(eachHobliObj.HobliCode);
                };
            };
            return distict;
        };
    };


    async assigningProcess(data){
        const { ReqType, DistrictCode, TalukCode, VillageCode, HobliCode, ListType } = data;
        if(!DistrictCode) return {code: 400, message: "Provide DistrictCode"};
        if(!ListType) return {code: 400, message: "Provide ListType"};
        if(ReqType == 1){
            return await this.adminRepo.assignDistricts(data);
        } else if(ReqType == 2){
            if(!TalukCode) return {code: 400, message: "Provide TalukCode"};
            return await this.adminRepo.assignTaluks(data);
        } else if(ReqType == 3){
            if(!TalukCode) return {code: 400, message: "Provide TalukCode"};
            if(!HobliCode) return {code: 400, message: "Provide HobliCode"};
            return await this.adminRepo.assignHobli(data);
        } else if(ReqType == 2){
            if(!HobliCode) return {code: 400, message: "Provide HobliCode"};
            if(!VillageCode) return {code: 400, message: "Provide VillageCode"};
            if(!TalukCode) return {code: 400, message: "Provide DistrictCode"};
            return await this.adminRepo.assignVillages(data);
        }  else {
            return {code: 400, message: "Your request is not found", data: {}};
        }
    }

    async question(data){
        const {ReqType} = data;
        if(ReqType == "Get"){
            return this.adminRepo.getQuestions();
        } else if(ReqType == "Add") {
            return this.adminRepo.saveQuestions(data);
        } else if(ReqType == "Dropdown") {
            return this.adminRepo.getQuestionDropdown();
        } else {
            return {code: 422, message: "Send correct input."}
        }
    };

    async addRolesOrGet(data){
        const {ReqType} = data;
        if(ReqType == "Get"){
            return this.adminRepo.getAllRoles();
        } else if(ReqType == "Add") {
            return this.adminRepo.addRoles(data);
        } else if(ReqType == "Dropdown") {
            return this.adminRepo.getRolesDropdown();
        } else {
            return {code: 422, message: "Send correct input."}
        }
    };

}
