import { Service } from "typedi";
import { AppDataSource } from "../db/config";
import {
  Version,
  EkycData,
  LoginAccess,
  QuestionMaster,
  UploadImgAndVideo,
  Kutumba,
  PariharaImgAndVideo,
  EscomData,
  VaSurveyData,
  DemoAuthEkyc,
  Districts,
  GramaPanchayat,
  Taluk,
  Villages,
  RDMinority,
} from "../entities";
import { Equal, createConnection } from "typeorm";
import { PariharaData } from "../entities/pariharaData";
import { generateUniqueId, generateUniqueSubmissionId } from "../utils/resuableCode";
import { UpdatedSurveyLogs } from "../entities/updateSurveyLogs";

const vaSurveyDataRepo = AppDataSource.getRepository(VaSurveyData);
const versionDataRepo = AppDataSource.getRepository(Version);
const pariharaDataRepo = AppDataSource.getRepository(PariharaData);
const updatedSurveyLogsRepo = AppDataSource.getRepository(UpdatedSurveyLogs);
const ekycDataRepo = AppDataSource.getRepository(EkycData);
const questionMasterRepo = AppDataSource.getRepository(QuestionMaster);
const uploadImgAndVideoRepo = AppDataSource.getRepository(UploadImgAndVideo);
const kutumbaRepo = AppDataSource.getRepository(Kutumba);
const pariharaImgAndVideoRepo = AppDataSource.getRepository(PariharaImgAndVideo);
const escomDataRepo = AppDataSource.getRepository(EscomData);
const demoAuthEkycRepo = AppDataSource.getRepository(DemoAuthEkyc);
const distictRepo = AppDataSource.getRepository(Districts);
const talukRepo = AppDataSource.getRepository(Taluk);
const gramaPanchayatRepo = AppDataSource.getRepository(GramaPanchayat);
const villagesRepo = AppDataSource.getRepository(Villages);
const rdMinorityRepo = AppDataSource.getRepository(RDMinority);

@Service()
export class UserRepo {

  async sendOtp(data) {
    const { Mobile } = data;
    let findOneBy = await vaSurveyDataRepo.findOneBy({ Mobile: Equal(Mobile) });
    if (!findOneBy) return { code: 404, message: "UserData Not Found." };
    let newData = { ...findOneBy, ...data };
    return await vaSurveyDataRepo.save(newData);
  };

  // async getUsersList(data) {
  //   const { Mobile } = data;
  //   return await userDataRepo.find({
  //       where: {Mobile: Mobile},
  //       select: ["UserId", "Name"],
  //   });
  // }

  async addUser(data) {
    return await vaSurveyDataRepo.save(data);
  };

  async updateUser(data) {
    const { Mobile, RoleId } = data;
    let getData = await vaSurveyDataRepo.findOneBy({ Mobile: Equal(Mobile), RoleId: Equal(RoleId) });
    if (!getData) return { code: 422, message: "Your Data Does't Exist." }
    let newData = { ...getData, ...data };
    await vaSurveyDataRepo.save(newData);
    return await vaSurveyDataRepo.createQueryBuilder('vs')
      .innerJoinAndSelect(Districts, 'dd', 'dd.DistrictCode=vs.DistrictCode')
      .innerJoinAndSelect(Taluk, 'td', 'td.DistrictCode=vs.DistrictCode and td.TalukCode=vs.TalukCode and td.Type=vs.Type')
      .innerJoinAndSelect(GramaPanchayat, 'gp', 'gp.DistrictCode=vs.DistrictCode and gp.TalukCode=vs.TalukCode and gp.GpCode=vs.GpCode and gp.Type=vs.Type')
      .select(["vs.DistrictCode DistrictCode, vs.TalukCode TalukCode, vs.GpCode GpCode, vs.Type Type", "vs.UserId UserId",
        "CONCAT('D-',dd.DistrictNameEn,'-T-',td.TalukNameEn,'-G-',gp.GpNameEn) as assignedGp"
      ])
      .where("vs.Mobile = :Mobile and vs.RoleId = :RoleId", { Mobile, RoleId })
      .getRawMany();
  };

  async checkLoginUser(data) {
    const { Mobile, RoleId } = data;
    return await vaSurveyDataRepo.findOneBy({ Mobile: Equal(Mobile), RoleId: Equal(RoleId) });
  };

  async verfiyWithUserId(data) {
    const { Mobile } = data;
    return await vaSurveyDataRepo.findOneBy({ Mobile: Equal(Mobile) });
  };

  async saveSurveyData(data) {
    const { ApplicantAadhar } = data;
    let findData = await pariharaDataRepo.findOneBy({ ApplicantAadhar: Equal(ApplicantAadhar) });
    if (findData) return { code: 422, message: "Already registered application with aadhar." };
    data.SurveyStatus = "Pending Ekyc";
    data.SubmissionId = "PARI"+"-"+generateUniqueId().slice(2)+"-"+Math.floor(Math.random() * 1000);
    let findUser = await vaSurveyDataRepo.findOneBy({ UserId: Equal(data?.UserId) });
    let createdData = {CreatedMobile: `${findUser.Mobile +'-AE-'+ findUser.AEOMobile+'-PD-'+findUser.PDOMobile}`, CreatedRole: "VA"}
    let updateLogs = {...data, ...{History: "New Application Added"}, ...createdData}
    await updatedSurveyLogsRepo.save(updateLogs);
    return await pariharaDataRepo.save({...data, ...createdData});
  };

  async updateSurveyData(data) {
    const { SubmissionId } = data;
    let getData = await pariharaDataRepo.findOneBy({ SubmissionId: Equal(SubmissionId) });
    if (!getData) return { code: 422, message: "Data doesn't exist." }
    let newData = { ...getData, ...data };
    await updatedSurveyLogsRepo.save(data);
    return await pariharaDataRepo.save(newData);
  };

  /* *********** old ************** */
  async getSubmissionList(data) {
    const { UserId, SurveyStatus, LossType, PageNo = 1, PageSize = 10 } = data;
    let totalData = await pariharaDataRepo.findAndCount({
      where: { UserId: Equal(UserId), LossType: Equal(LossType), SurveyStatus: Equal(SurveyStatus) },
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "DateOfDamage", "SubmissionId", "SurveyStatus"],
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
    const { UserId, PageNo = 1, PageSize = 10 } = data;
    let totalData = await pariharaDataRepo.findAndCount({
      where: { UserId: Equal(UserId) },
      select: ["LossType", "ApplicantName", "Mobile", "SurveyStatus", "CreatedDate", "DateOfDamage", "SubmissionId", "SurveyStatus"],
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
    const { UserId, LossType, PageNo = 1, PageSize = 10 } = data;
    let totalData = await pariharaDataRepo.findAndCount({
      where: { UserId: Equal(UserId), LossType: Equal(LossType) },
      select: ["LossType", "ApplicantName", "Mobile", "SurveyStatus", "CreatedDate", "DateOfDamage", "SubmissionId", "SurveyStatus"],
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
    const { PageNo = 1, PageSize = 10, LossType } = data;
    let totalCount = await pariharaDataRepo.count({
      where: [{ SurveyStatus: access?.Pending && "Pending" }, { SurveyStatus: access?.PendingEkyc && "Pending Ekyc" }, { SurveyStatus: access?.SeekClarification ?? "SeekClarification" }],
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id'],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    let totalData = await pariharaDataRepo.find({
      where: [{ LossType: Equal(LossType), SurveyStatus: access?.Pending && "Pending" }, { SurveyStatus: access?.PendingEkyc && "Pending Ekyc" }, { SurveyStatus: access?.SeekClarification ?? "Seek Clarification" }],
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id', "SurveyStatus"],
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
    const { PageNo = 1, PageSize = 10, LossType } = data;
    let totalCount = await pariharaDataRepo.count({
      where: [
        { SurveyStatus: access?.Pending && "Pending", LossType: Equal(LossType) },
        { SurveyStatus: access?.PendingEkyc && "Pending Ekyc", LossType: Equal(LossType) },
        { SurveyStatus: access?.SeekClarification ?? "SeekClarification", LossType: Equal(LossType) }
      ],
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id'],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    let totalData = await pariharaDataRepo.find({
      where: [
        { SurveyStatus: access?.Pending && "Pending" },
        { SurveyStatus: access?.PendingEkyc && "Pending Ekyc" },
        { SurveyStatus: access?.SeekClarification ?? "Seek Clarification" }],
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id', "SurveyStatus"],
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
    const { PageNo = 1, PageSize = 10, SurveyStatus, UserId, LossType } = data;
    let totalCount = await pariharaDataRepo.count({
      where: { SurveyStatus: SurveyStatus, UserId: UserId, LossType: LossType },
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id'],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    let totalData = await pariharaDataRepo.find({
      where: { SurveyStatus: SurveyStatus, UserId: UserId, LossType: LossType },
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id', "SurveyStatus"],
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
    let getData = await vaSurveyDataRepo.createQueryBuilder('ud')
      .innerJoinAndSelect(LoginAccess, 'la', "la.RoleId=ud.RoleId")
      .select(["la.PendingEkyc as PendingEkyc", "la.RoleId as RoleId", "la.Pending as Pending", "la.SeekClarification as SeekClarification"])
      .where("ud.UserId = :id", { id: data?.UserId })
      .getRawOne();
    return getData;
  }

  async getSubmissionData(data) {
    const { SubmissionId } = data;
    return await pariharaDataRepo.findOneBy({ SubmissionId: Equal(SubmissionId) })
  };

  async saveSurveyImages(data) {
    return await pariharaImgAndVideoRepo.save(data);
  };

  async assignedGpDetails(data) {
    const { DistrictCode, TalukCode,GpCode, Type } = data;
    let query = `execute getAssignedGpData @0,@1,@2,@3`;
    return await AppDataSource.query(query, [DistrictCode, TalukCode, GpCode, Type]);
  }

  async checkAadharStatus(ApplicantAadhar) {
    let EkycStatus = "Completed";
    return await pariharaDataRepo.findOneBy({ ApplicantAadhar: Equal(ApplicantAadhar), EkycStatus: Equal(EkycStatus) });
  };

  async updateEkyctxnId(data) {
    const { SubmissionId, txnDateTime } = data;
    let getData = await pariharaDataRepo.findOneBy({ SubmissionId: Equal(SubmissionId) });
    if (!getData) return { code: 422, message: "Data doesn't exist." }
    let newData = { ...getData, ...{ txnDateTime } };
    return await pariharaDataRepo.save(newData);
  };

  async saveEkycData(data) {
    return await ekycDataRepo.save(data);
  };

  async fetchEkycData(txnDateTime) {
    return await ekycDataRepo.findOneBy({ txnDateTime: Equal(txnDateTime) });
  };

  async fetchDemoEkycData(txnDateTime) {
    return await demoAuthEkycRepo.findOneBy({ TxnDateTime: Equal(txnDateTime) });
  };


  async retriveDistrictWithCodes() {
    return await distictRepo.createQueryBuilder('md')
      .select("DISTINCT DistrictCode, DistrictNameEn DistrictName")
      .getRawMany();
  };

  // async retriveAllData(code) {
  //   return await masterDataRepo.find({
  //     where: { DistrictCode: code },
  //     select: ["DistrictCode", "DistrictName", "HobliCode", "HobliName", "TalukCode", "TalukName", "VillageCode", "VillageName"]
  //   });
  // };
  async retriveOnlyDistrict(code) {
    return await distictRepo.createQueryBuilder('md')
    .select("DISTINCT DistrictCode, DistrictNameEn DistrictName")
    .where("md.DistrictCode= :id", {id: code})
    .getRawMany();
  };
  async retriveOnlyTaluks(code, Type) {
    return await talukRepo.createQueryBuilder('md')
    .select("DISTINCT TalukCode, TalukNameEn TalukName")
    .where("md.DistrictCode= :id and md.Type = :Type", {id: code, Type})
    .getRawMany();
  };
  async retriveOnlyGp(code, dcode, Type) {
    return await gramaPanchayatRepo.createQueryBuilder('md')
    .select("DISTINCT GpCode, GpNameEn GpName")
    .where("md.TalukCode= :id and md.DistrictCode = :dcode and md.Type = :Type", {id: code, dcode, Type})
    .getRawMany();
  };
  async retriveOnlyVillages(code, tcode, dcode) {
    return await villagesRepo.createQueryBuilder('md')
    .select("DISTINCT VillageCode, VillageNameEn VillageName")
    .where("md.GpCode= :id and md.DistrictCode = :dcode and md.TalukCode = :tcode", {id: code, dcode, tcode})
    .getRawMany();
  };

  async updateEkycAfter(data, AuthType) {
    const { SubmissionId, txnDateTime } = data;
    let findOne = await pariharaDataRepo.findOneBy({ SubmissionId: Equal(SubmissionId) });
    if(!findOne) return {code: 422, message: "Access Denied"};
    let findUser = await vaSurveyDataRepo.findOneBy({ UserId: Equal(data?.UserId) });
    let newData = { ...findOne, ...{ EkycStatus: "Completed", SurveyStatus: "Pending", txnDateTime: txnDateTime } };
    let updateLogs = {...newData, ...{CreatedMobile: `${findUser.Mobile +'-AE-'+ findUser.AEOMobile+'-PD-'+findUser.PDOMobile}`, CreatedRole: "VA", History: `Updated With ${AuthType} Process`}}
    await updatedSurveyLogsRepo.save(updateLogs);
    return await pariharaDataRepo.save(newData);
  };

  async saveKutumbaData(data) {
    const { RC_NUMBER, MBR_HASH_AADHAR } = data;
    let findData = await kutumbaRepo.findOneBy({ MBR_HASH_AADHAR: Equal(MBR_HASH_AADHAR), RC_NUMBER: Equal(RC_NUMBER) });
    let newData = { ...findData, ...data };
    return await kutumbaRepo.save(newData);
  };

  async saveDemoAuthResponse(data) {
    return await demoAuthEkycRepo.save(data);
  };

  async saveEscomData(data) {
    let findData = await escomDataRepo.save(data);
    return findData;
  };

  async saveRdMinority(data) {
    let findData = await rdMinorityRepo.findOneBy({GSCNo: Equal(data?.GSCNo)});
    let newData = {...findData, ...data};
    return await rdMinorityRepo.save(newData);
  };

  async getKutumbaData(rc) {
    let findData = await kutumbaRepo.find({ where: { RC_NUMBER: Equal(rc) } });
    return findData;
  };

  async uploadImages(imageObj) {
    const { ImageData, ImageName, UserId } = imageObj;
    return await uploadImgAndVideoRepo.save({ ImageData, ImageName, RecordType: 'Image', UserId: UserId })
  }

  async getImage(id) {
    return await uploadImgAndVideoRepo.findOneBy({ id: Equal(id) })
  }

  async uploadVideos(data) {
    const { ImageData, ImageName, UserId } = data;
    return await uploadImgAndVideoRepo.save({ ImageData, ImageName, RecordType: 'Video', UserId: UserId })
  }

  async getVideo(id) {
    return await uploadImgAndVideoRepo.findOneBy({ id: Equal(id) })
  }
}