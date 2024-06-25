import { Service } from "typedi";
import { AppDataSource } from "../db/config";
import {
  Version,
  UserData,
  EkycData,
  MasterData,
  LoginAccess,
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
const masterDataRepo = AppDataSource.getRepository(MasterData);

@Service()
export class UserRepo {

  async sendOtp(data) {
    const { Mobile } = data;
    let findOneBy = await userDataRepo.findOneBy({ Mobile: Equal(Mobile) });
    if (!findOneBy) return { code: 404, message: "UserData Not Found." };
    let newData = { ...findOneBy, ...data };
    return await userDataRepo.save(newData);
  };

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
    let getData = await userDataRepo.findOneBy({Mobile: Equal(Mobile), RoleId: Equal(RoleId)});
    if(!getData) return {code: 422, message: "Your Data Does't Exist."}
    let newData = {...getData, ...data};
    return await userDataRepo.save(newData);
  };

  async checkLoginUser(data) {
    const {Mobile, RoleId} = data;
    return await userDataRepo.findOneBy({Mobile: Equal(Mobile), RoleId: Equal(RoleId)});
  };

  async verfiyWithUserId(data) {
    const { UserId } = data;
    return await userDataRepo.findOneBy({UserId: Equal(UserId)});
  };

  async saveSurveyData(data: PariharaData) {
    const { ApplicantAadhar } = data;
    let findData = await pariharaDataRepo.findOneBy({ ApplicantAadhar: Equal(ApplicantAadhar) });
    if(findData) return {code: 422, message: "Already registered this aadhar details."};
    data.SurveyStatus = "Pending Ekyc"
    data.SubmissionId = await generateUniqueSubmissionId();
    return await pariharaDataRepo.save(data);
  };

  async updateSurveyData(data) {
    const {SubmissionId} = data;
    let getData = await pariharaDataRepo.findOneBy({SubmissionId: Equal(SubmissionId)});
    if(!getData) return {code: 422, message: "Data doesn't exist."} 
    let newData = {...getData, ...data};
    await updatedSurveyLogsRepo.save(data);
    return await pariharaDataRepo.save(newData);
  };

  /* *********** old ************** */
  async getSubmissionList(data) {
    const {  UserId , SurveyStatus,  LossType, PageNo = 1, PageSize= 10 } = data;
    let totalData = await pariharaDataRepo.findAndCount({
      where: {UserId: Equal(UserId), LossType: Equal(LossType), SurveyStatus: Equal(SurveyStatus)},
      select: ["LossType", "Mobile","ApplicantName", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus"],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    return {
      totalCount: totalData[1],
      PageNo,
      PageSize,
      totalData: totalData[0]
    }
  };

  async getSubmissionListAll(data) {
    const {  UserId ,  PageNo = 1, PageSize= 10 } = data;   
    let totalData = await pariharaDataRepo.findAndCount({
      where: {UserId: Equal(UserId)},
      select: ["LossType", "ApplicantName", "Mobile", "SurveyStatus", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus"],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    return {
      totalCount: totalData[1],
      PageNo,
      PageSize,
      totalData: totalData[0]
    }
  };

  
  async getSubmissionListAllWithLossType(data) {
    const {  UserId , LossType,  PageNo = 1, PageSize= 10 } = data;   
    let totalData = await pariharaDataRepo.findAndCount({
      where: {UserId: Equal(UserId), LossType: Equal(LossType)},
      select: ["LossType", "ApplicantName", "Mobile", "SurveyStatus", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus"],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    return {
      totalCount: totalData[1],
      PageNo,
      PageSize,
      totalData: totalData[0]
    }
  };
/* *********** Ended old ************** */

  async geAllList(data, access) {
    const { PageNo = 1, PageSize= 10, LossType } = data;   
    let totalCount = await pariharaDataRepo.count({
      where: [{ SurveyStatus: access?.Pending && "Pending"  }, { SurveyStatus: access?.PendingEkyc && "Pending Ekyc"  }, { SurveyStatus: access?.SeekClarification ?? "SeekClarification" }],
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id'],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    let totalData = await pariharaDataRepo.find({
      where: [{ LossType: Equal(LossType), SurveyStatus: access?.Pending && "Pending"  }, { SurveyStatus: access?.PendingEkyc && "Pending Ekyc"  }, { SurveyStatus: access?.SeekClarification ?? "Seek Clarification" }],
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id', "SurveyStatus"],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    return {
      totalCount: totalCount,
      PageNo,
      PageSize,
      totalData: totalData
    }
  };

  async getAllLossType(data, access) {
    const { PageNo = 1, PageSize= 10, LossType } = data;   
    let totalCount = await pariharaDataRepo.count({
      where: [
        { SurveyStatus: access?.Pending && "Pending", LossType: Equal(LossType)  }, 
        { SurveyStatus: access?.PendingEkyc && "Pending Ekyc", LossType: Equal(LossType)  }, 
        { SurveyStatus: access?.SeekClarification ?? "SeekClarification", LossType: Equal(LossType) }
      ],
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id'],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    let totalData = await pariharaDataRepo.find({
      where: [
        { SurveyStatus: access?.Pending && "Pending"  }, 
        { SurveyStatus: access?.PendingEkyc && "Pending Ekyc"  }, 
        { SurveyStatus: access?.SeekClarification ?? "Seek Clarification" }],
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id', "SurveyStatus"],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    return {
      totalCount: totalCount,
      PageNo,
      PageSize,
      totalData: totalData
    }
  };

  async getAllListTypesWise(data, access) {
    const { PageNo = 1, PageSize= 10, SurveyStatus, UserId, LossType } = data;   
    let totalCount = await pariharaDataRepo.count({
      where: { SurveyStatus: SurveyStatus, UserId: UserId, LossType: LossType},
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id'],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    let totalData = await pariharaDataRepo.find({
      where: { SurveyStatus: SurveyStatus, UserId: UserId, LossType: LossType},
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id', "SurveyStatus"],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    return {
      totalCount: totalCount,
      PageNo,
      PageSize,
      totalData: totalData
    }
  };

  async getUserAccessData(data) {
    let getData = await userDataRepo.createQueryBuilder('ud')
    .innerJoinAndSelect(LoginAccess, 'la', "la.RoleId=ud.RoleId")
    .select(["la.PendingEkyc as PendingEkyc", "la.RoleId as RoleId", "la.Pending as Pending", "la.SeekClarification as SeekClarification"])
    .where("ud.UserId = :id", {id: data?.UserId})
    .getRawOne();
    return getData;
  }

  async getSubmissionData(data) {
    const {  SubmissionId } = data;
    return await pariharaDataRepo.findOneBy({SubmissionId: Equal(SubmissionId)})
  };
  
  async saveSurveyImages(data) {
    const {SubmissionId} = data;
    let getData = await pariharaDataRepo.findOneBy({SubmissionId: Equal(SubmissionId)});
    if(!getData) return {code: 422, message: "Data doesn't exist."} 
    let newData = {...getData, ...data};
    return await newData.save(data);
  };

  async checkAadharStatus(ApplicantAadhar) {
    let EkycStatus = "Completed"; 
    return await pariharaDataRepo.findOneBy({ApplicantAadhar: Equal(ApplicantAadhar), EkycStatus: Equal(EkycStatus)});
  };

  async updateEkyctxnId(data) {
    const {SubmissionId, txnDateTime} = data;
    let getData = await pariharaDataRepo.findOneBy({SubmissionId: Equal(SubmissionId)});
    if(!getData) return {code: 422, message: "Data doesn't exist."} 
    let newData = {...getData, ...{txnDateTime}};
    return await pariharaDataRepo.save(newData);
  };

  async saveEkycData(data) {
    return await ekycDataRepo.save(data);
  };

  async fetchEkycData(txnDateTime) {
    return await ekycDataRepo.findOneBy({txnDateTime: Equal(txnDateTime)});
  };

  async updateEkycAfter(data) {
    const {SubmissionId} = data;
    let findOne = await pariharaDataRepo.findOneBy({SubmissionId: Equal(SubmissionId)});
    let newData = {...findOne, ...{EkycStatus: "Completed", SurveyStatus: "Pending"}}
    return await ekycDataRepo.save(newData);
  };

  
  async retriveDistrictWithCodes() {
    return await masterDataRepo.createQueryBuilder('md')
    .select("DISTINCT DistrictCode, DistrictName")
    .getRawMany();
  };

  async retriveAllData(code) {
    return await masterDataRepo.find({
      where: { DistrictCode: code },
      select: ["DistrictCode", "DistrictName", "HobliCode", "HobliName", "TalukCode", "TalukName", "VillageCode", "VillageName"]
    });
  };
  async retriveOnlyDistrict(code) {
    return await masterDataRepo.createQueryBuilder('md')
    .select("DISTINCT DistrictCode, DistrictName")
    .where("md.DistrictCode= :id", {id: code})
    .getRawMany();
  };
  async retriveOnlyTaluks(code) {
    return await masterDataRepo.createQueryBuilder('md')
    .select("DISTINCT TalukCode, TalukName")
    .where("md.DistrictCode= :id", {id: code})
    .getRawMany();
  };
  async retriveOnlyHobli(code) {
    return await masterDataRepo.createQueryBuilder('md')
    .select("DISTINCT HobliCode, HobliName")
    .where("md.TalukCode= :id", {id: code})
    .getRawMany();
  };
  async retriveOnlyVillages(code) {
    return await masterDataRepo.createQueryBuilder('md')
    .select("DISTINCT VillageCode, VillageName")
    .where("md.HobliCode= :id", {id: code})
    .getRawMany();
  };
}