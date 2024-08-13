import { Service } from "typedi";
import { AppDataSource } from "../db/config";
import {
  Version,
  UserData,
  EkycData,
  LoginAccess,
  MasterData,
  LoginRoles,
  QuestionMaster,
  AssignMasters,
} from "../entities";
import { Equal } from "typeorm";
import { PariharaData } from "../entities/pariharaData";
import { generateUniqueSubmissionId } from "../utils/resuableCode";
import { UpdatedSurveyLogs } from "../entities/updateSurveyLogs";

const userDataRepo = AppDataSource.getRepository(UserData);
const pariharaDataRepo = AppDataSource.getRepository(PariharaData);
const loginAccessRepo = AppDataSource.getRepository(LoginAccess);
const loginRolesRepo = AppDataSource.getRepository(LoginRoles);
const updatedSurveyLogsRepo = AppDataSource.getRepository(UpdatedSurveyLogs);
const masterDataRepo = AppDataSource.getRepository(MasterData);
const questionMasterRepo = AppDataSource.getRepository(QuestionMaster);
const assignMastersRepo = AppDataSource.getRepository(AssignMasters);

@Service()
export class AdminRepo {

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
    const { Mobile, RoleId } = data;
    let getData = await userDataRepo.findOneBy({ Mobile: Equal(Mobile) });
    if (!getData) return { code: 422, message: "Your Data Does't Exist." }
    let newData = { ...getData, ...data };
    return await userDataRepo.save(newData);
  };

  async checkLoginUser(data) {
    const { Mobile, RoleId } = data;
    return await userDataRepo.findOneBy({ Mobile: Equal(Mobile), RoleId: Equal(RoleId) });
  };

  async verfiyWithUserId(data) {
    const { UserId } = data;
    return await userDataRepo.findOneBy({ UserId: Equal(UserId) });
  };

  async saveSurveyData(data: PariharaData) {
    const { ApplicantAadhar } = data;
    let findData = await pariharaDataRepo.findOneBy({ ApplicantAadhar: Equal(ApplicantAadhar) });
    if (findData) return { code: 422, message: "Already registered this aadhar details." };
    data.SurveyStatus = "Pending Ekyc"
    data.SubmissionId = await generateUniqueSubmissionId();
    return await pariharaDataRepo.save(data);
  };

  async updateSurveyData(data) {
    const { SubmissionId } = data;
    let getData = await pariharaDataRepo.findOneBy({ SubmissionId: Equal(SubmissionId) });
    if (!getData) return { code: 422, message: "Data doesn't exist." }
    let newData = { ...getData, ...data };
    await updatedSurveyLogsRepo.save(data);
    return await pariharaDataRepo.save(newData);
  };

  async FetchLoginAccessData(RoleId) {
    let totalData = await loginAccessRepo.find({
      where: { RoleId: Equal(RoleId) },
      select: ["Pending", "PendingEkyc", "RoleId", "SeekClarification"]
    });
    return totalData[0];
  }

  async getSubmissionList(data, roles) {
    const { PageNo = 1, PageSize = 10 } = data;
    let totalCount = await pariharaDataRepo.count({
      where: [{ SurveyStatus: roles?.Pending && "Pending"  }, { SurveyStatus: roles?.PendingEkyc && "Pending Ekyc"  }, { SurveyStatus: roles?.SeekClarification ?? "SeekClarification" }],
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id'],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    let totalData = await pariharaDataRepo.find({
      where: [{ SurveyStatus: roles?.Pending && "Pending"  }, { SurveyStatus: roles?.PendingEkyc && "Pending Ekyc"  }, { SurveyStatus: roles?.SeekClarification ?? "Seek Clarification" }],
      select: ["LossType", "Mobile", "ApplicantName", "CreatedDate", "NoOfDaysFromDamage", "DateOfDamage", "SubmissionId", "SurveyStatus", 'id'],
      skip: (PageNo - 1) * PageSize,
      take: PageSize
    });
    return {
      totalCount: totalCount,
      PageNo,
      PageSize,
      totalData: totalData
    };
  };

  async getSubmissionData(data) {
    const { SubmissionId } = data;
    return await pariharaDataRepo.findOneBy({ SubmissionId: Equal(SubmissionId) })
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

  async assignDistricts(data){
    let findData = await assignMastersRepo.findOneBy({id: Equal(data?.id)});
    let newData = {...findData, ...data};
    return await assignMastersRepo.save(newData);
  };

  async assignTaluks(data){
    let findData = await assignMastersRepo.findOneBy({id: Equal(data?.id)});
    let newData = {...findData, ...data};
    return await assignMastersRepo.save(newData);
  };

  async assignHobli(data){
    let findData = await assignMastersRepo.findOneBy({id: Equal(data?.id)});
    let newData = {...findData, ...data};
    return await assignMastersRepo.save(newData);
  };

  async assignVillages(data){
    let findData = await assignMastersRepo.findOneBy({id: Equal(data?.id)});
    let newData = {...findData, ...data};
    return await assignMastersRepo.save(newData);
  };

  async getQuestions(){
    return await questionMasterRepo.createQueryBuilder('qm')
    .leftJoinAndSelect(QuestionMaster, 'qmc', "qmc.QuestionId = role.qm.QuestionId")
    .select(["role.id as id",  "role.RoleName as RoleName", 
    "role.District as District","role.Taluk as Taluk", "role.Hobli as Hobli", "dp.DepartmentName as DepartmentName", 
    "role.Village as Village", "role.DepartmentId as DepartmentId"])
    .getRawMany();
      
  }

  async saveQuestions(data){
    let find = await questionMasterRepo.findOneBy({id: Equal(data?.id)});
    let newData = {...find, ...data};
    return await questionMasterRepo.save(newData);
  }

  async getQuestionDropdown(){
    return await questionMasterRepo.createQueryBuilder('qm')
    .leftJoinAndSelect(QuestionMaster, 'qmc', "qmc.QuestionId = role.qm.QuestionId")
    .select(["role.id as id",  "role.RoleName as RoleName", 
    "role.District as District","role.Taluk as Taluk", "role.Hobli as Hobli", "dp.DepartmentName as DepartmentName", 
    "role.Village as Village", "role.DepartmentId as DepartmentId"])
    .getRawMany();   
  };

  async getAllRoles(){
    return await loginRolesRepo.createQueryBuilder('rl')
    // .leftJoinAndSelect(QuestionMaster, 'qmc', "qmc.QuestionId = role.qm.QuestionId")
    .select(["rl.id as id", "rl.RoleName as RoleName"])
    .getRawMany();
      
  }

  async addRoles(data){
    let find = await loginRolesRepo.findOneBy({id: Equal(data?.id)});
    let newData = {...find, ...data};
    return await loginRolesRepo.save(newData);
  }

  async getRolesDropdown(){
    return await loginRolesRepo.createQueryBuilder('rl')
    .select(["rl.id as code",  "rl.RoleName as name"])
    .getRawMany();   
  };
}