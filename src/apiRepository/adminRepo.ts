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
  Districts,
  Taluk,
  GramaPanchayat,
  Villages,
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
const distictRepo = AppDataSource.getRepository(Districts);
const talukRepo = AppDataSource.getRepository(Taluk);
const gramaPanchayatRepo = AppDataSource.getRepository(GramaPanchayat);
const villagesRepo = AppDataSource.getRepository(Villages);

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

  async checkMobileLogin(data) {
    const { Mobile, Otp } = data;
    let getData = await userDataRepo.createQueryBuilder('ud')
    .leftJoinAndSelect(LoginRoles, 'lr', "lr.id = ud.RoleId")
    .select(["DISTINCT ud.Mobile Mobile", "ud.Name Name", "lr.RoleName RoleName", "lr.id RoleId"])
    .where("ud.Mobile = :Mobile", { Mobile })
    .getRawMany();
    if (getData.length == 0) return { code: 422, message: "Access Denied" };
    let updateOtp = await userDataRepo.findOneBy({Mobile: Equal(Mobile)});
    let updateObj = {...updateOtp, ...{Otp}}
    await userDataRepo.save(updateObj);
    return getData;
  };

  async checkRoleAccess(data) {
    const { RoleId } = data;
    let getData = await loginAccessRepo.findOneBy({RoleId: Equal(RoleId)});
    if(!getData) return {code: 422, message: "You dont have access to go furthere"}
    return getData;
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

  async getAssignedDistricts(data){
    return await assignMastersRepo.createQueryBuilder('am')
    .leftJoinAndSelect(LoginRoles, 'rl', "rl.id = am.RoleId")
    .leftJoinAndSelect(Districts, 'dd', "dd.DistrictCode = am.DistrictCode")
    .select(["am.id as id","am.Name as Name", "am.Mobile as Mobile", "rl.RoleName as RoleName", "dd.DistrictNameEn as DistrictNameEn",
      "dd.DistrictCode as DistrictCode", "rl.id as RoleId"
    ])
    .where("am.ListType = :type", {type: "District"})
    .getRawMany();
  };

  async getAssignedTaluk(data){
    return await assignMastersRepo.createQueryBuilder('am')
    .leftJoinAndSelect(LoginRoles, 'rl', "rl.id = am.RoleId")
    .leftJoinAndSelect(Districts, 'dd', "dd.DistrictCode = am.DistrictCode")
    .leftJoinAndSelect(Taluk, 'td', "td.TalukCode = am.TalukCode and td.DistrictCode = am.DistrictCode")
    .select(["am.id as id","am.Name as Name", "am.Mobile as Mobile", "rl.RoleName as RoleName", "dd.DistrictNameEn as DistrictNameEn",
      "dd.DistrictCode as DistrictCode", "rl.id as RoleId", "td.TalukNameEn as TalukNameEn", "td.TalukCode as TalukCode"
    ])
    .where("am.ListType = :type", {type: "Taluk"})
    .getRawMany();
  };

  async getAssignedGp(data){
    return await assignMastersRepo.createQueryBuilder('am')
    .leftJoinAndSelect(LoginRoles, 'rl', "rl.id = am.RoleId")
    .leftJoinAndSelect(Districts, 'dd', "dd.DistrictCode = am.DistrictCode")
    .leftJoinAndSelect(Taluk, 'td', "td.TalukCode = am.TalukCode and td.DistrictCode = am.DistrictCode")
    .leftJoinAndSelect(GramaPanchayat, 'gd', "gd.GpCode = am.GpCode and gd.TalukCode = am.TalukCode and gd.DistrictCode = am.DistrictCode")
    .select(["am.id as id","am.Name as Name", "am.Mobile as Mobile", "rl.RoleName as RoleName", "dd.DistrictNameEn as DistrictNameEn",
      "dd.DistrictCode as DistrictCode", "rl.id as RoleId", "td.TalukNameEn as TalukNameEn", "gd.GpNameEn as GpNameEn", "td.TalukCode as TalukCode", "gd.GpCode as GpCode"
    ])
    .where("am.ListType = :type", {type: "Gp"})
    .getRawMany();
  };  

  async assignRoleAccess(data){
    let getOneObj = await loginAccessRepo.findOneBy({id: Equal(data?.id)});
    let newData = {...getOneObj, ...data};
    return await loginAccessRepo.save(newData);
  };

  async getRoleAccess(){
    return await loginAccessRepo.createQueryBuilder('la')
    .leftJoinAndSelect(LoginRoles, 'lr', 'lr.id=la.RoleId')
    .select(["la.id id","la.PendingEkyc PendingEkyc", "la.Pending Pending", "la.SeekClarification SeekClarification","la.District District", 
      "la.Taluk Taluk", "la.Gp as Gp", "la.Village Village","lr.RoleName RoleName", 'lr.id RoleId', "la.Type Type", "la.LossType LossType"])
    .getRawMany();
  }


  async getAssignedVillages(data){
    return await assignMastersRepo.find({
      where: {
        ListType: "Village"
      }
    });
  };

  async getDistrictsDD(data){
    return await distictRepo.createQueryBuilder('dd')
    .select(["dd.DistrictCode as value", "dd.DistrictNameEn as role"])
    .getRawMany();
  };

  async getAuthDistrictDD(data){
    const { Mobile, ListType } = data;
    return await distictRepo.createQueryBuilder('dd')
    .innerJoinAndSelect(AssignMasters, 'am', 'am.DistrictCode=dd.DistrictCode')
    .select(["dd.DistrictCode as value", "dd.DistrictNameEn as role"])
    .where("am.Mobile = :Mobile and am.ListType = :ListType", {Mobile, ListType})
    .getRawMany();
  };
  async getTalukDD(code){
    return await talukRepo.createQueryBuilder('tt')
    .select(["DISTINCT tt.TalukCode as value", "tt.TalukNameEn as role"])
    .where("tt.DistrictCode = :dc", {dc: code})
    .getRawMany();
  };
  async getAuthTalukDD(Mobile){
    return await talukRepo.createQueryBuilder('tt')
    .innerJoinAndSelect(AssignMasters, 'am', 'am.TalukCode=tt.TalukCode and am.DistrictCode=tt.DistrictCode')
    .select(["DISTINCT tt.TalukCode as value", "tt.TalukNameEn as role"])
    .where("am.Mobile = :Mobile and am.ListType = :ListType", {Mobile, ListType: "Taluk"})
    .getRawMany();
  };
  
  async getGpDD(UDCode, UTCode){
    return await gramaPanchayatRepo.createQueryBuilder('gd')
    .select(["DISTINCT gd.GpCode as value", "gd.GpNameEn as role"])
    .where("gd.TalukCode = :tc and gd.DistrictCode = :dc", {tc: UTCode, dc: UDCode})
    .getRawMany();
  };

  async getAuthGpDD(Mobile){
    return await gramaPanchayatRepo.createQueryBuilder('gd')
    .innerJoinAndSelect(AssignMasters, 'am', 'am.TalukCode=gd.TalukCode and am.DistrictCode=gd.DistrictCode and am.GpCode=gd.GpCode')
    .select(["DISTINCT gd.GpCode as value", "gd.GpNameEn as role"])
    .where("am.Mobile = :Mobile and am.ListType = :ListType", {Mobile, ListType: "Gp"})
    .getRawMany();
  }
  async getVillagesDD(UDCode, UTCode, UGCode){
    return await villagesRepo.createQueryBuilder('vd')
    .select(["DISTINCT vd.VillageCode as value", "vd.VillageNameEn as role"])
    .where("vd.GpCode = :Gp and vd.DistrictCode = :dc and vd.TalukCOde = :tc", {Gp: UGCode, dc: UDCode, tc: UTCode})
    .getRawMany();
  };

  async getDistrictMasters(data){
    return await distictRepo.find();
  };
  async getTalukMasters(data){
    return await talukRepo.find();
  };
  async getGpMasters(data){
    return await gramaPanchayatRepo.find();
  };
  async getVillagemasters(data){
    return await villagesRepo.find();
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
    .select(["rl.id as value",  "rl.RoleName as role"])
    .getRawMany();   
  };

  async uploadDistrictMasters(data){
    return await distictRepo.save(data);
  }

  async uploadTalukMasters(data){
    return await talukRepo.save(data);
  }

  async uploadGpMasters(data){
    return await gramaPanchayatRepo.save(data);
  }

  async uploadVillageMasters(data){
    return await villagesRepo.save(data);
  }
}