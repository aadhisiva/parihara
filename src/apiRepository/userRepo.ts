import { Service } from "typedi";
import { AppDataSource } from "../db/config";
import {
  Version,
  UserData,
  EkycData,
} from "../entities";
import { Equal, createConnection } from "typeorm";
import { PariharaData } from "../entities/pariharaData";
import { generateUniqueSubmissionId } from "../utils/resuableCode";
import { UpdatedSurveyLogs } from "../entities/updateSurveyLogs";

const userDataRepo = AppDataSource.getRepository(UserData);
const versionDataRepo = AppDataSource.getRepository(Version);
const pariharaDataRepo = AppDataSource.getRepository(PariharaData);
const updatedSurveyLogsRepo = AppDataSource.getRepository(UpdatedSurveyLogs);
const ekycDataRepo = AppDataSource.getRepository(EkycData);

@Service()
export class UserRepo {

  async sendOtp(data) {
    const { Mobile } = data;
    let findOneBy = await userDataRepo.findOneBy({ Mobile });
    if (!findOneBy) return { code: 404, message: "UserData Not Found." };
    let newData = { ...findOneBy, ...data };
    return await userDataRepo.save(newData);
  }

  // async getUsersList(data) {
  //   const { Mobile } = data;
  //   return await userDataRepo.find({
  //       where: {Mobile: Mobile},
  //       select: ["UserId", "Name"],
  //   });
  // }

  async addUser(data) {
    return await userDataRepo.save(data);
  };

  async updateUser(data) {
    const {Mobile, RoleId} = data;
    let getData = await userDataRepo.findOneBy({RoleId, Mobile});
    if(!getData) return {code: 422, message: "Your Data Does't Exist."}
    let newData = {...getData, ...data};
    return await userDataRepo.save(newData);
  };

  async checkLoginUser(data) {
    const {Mobile, RoleId} = data;
    return await userDataRepo.findOneBy({Mobile, RoleId});
  };

  async verfiyWithUserId(data) {
    const { UserId } = data;
    return await userDataRepo.findOneBy({UserId});
  };

  async saveSurveyData(data: PariharaData) {
    const { ApplicantAadhar } = data;
    let findData = await pariharaDataRepo.findOneBy({ ApplicantAadhar });
    if(findData) return {code: 422, message: "Already registered this aadhar details."};
    data.SubmissionId = await generateUniqueSubmissionId();
    return await pariharaDataRepo.save(data);
  };

  async updateSurveyData(data) {
    const {SubmissionId} = data;
    let getData = await pariharaDataRepo.findOneBy({SubmissionId});
    if(!getData) return {code: 422, message: "Data doesn't exist."} 
    let newData = {...getData, ...data};
    await updatedSurveyLogsRepo.save(data);
    return await pariharaDataRepo.save(newData);
  };

  async saveSurveyImages(data) {
    const {SubmissionId} = data;
    let getData = await pariharaDataRepo.findOneBy({SubmissionId});
    if(!getData) return {code: 422, message: "Data doesn't exist."} 
    let newData = {...getData, ...data};
    return await newData.save(data);
  };

  async checkAadharStatus(ApplicantAadhar) {
    let ekycStatus = "Completed"; 
    return await pariharaDataRepo.findOneBy({ApplicantAadhar, ekycStatus});
  };

  async updateEkyctxnId(data) {
    const {ApplicantAadhar, SubmissionId, txnDateTime} = data;
    let getData = await pariharaDataRepo.findOneBy({SubmissionId});
    if(!getData) return {code: 422, message: "Data doesn't exist."} 
    let newData = {...getData, ...{txnDateTime}};
    return await pariharaDataRepo.save(newData);
  };

  async saveEkycData(data) {
    return await ekycDataRepo.save(data);
  };
}