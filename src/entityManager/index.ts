import { Admin } from "typeorm";
import {
  AssignMasters,
  EkycData,
  Kutumba,
  LoginAccess,
  LoginRoles,
  MobileLogs,
  OtpLogs,
  PariharaData,
  PariharaImgAndVideo,
  PariharaRoles,
  QuestionMaster,
  UpdatedSurveyLogs,
  UploadImgAndVideo,
  Version,
  webLogs,
  QuestionMapping,
  DropdownValues,
  Districts,
  Taluk,
  GramaPanchayat,
  Villages,
  ChildRole,
  RoleToLoss,
  AssignMastersHistory,
  EscomData,
  VaSurveyData,
  DemoAuthEkyc,
  RDMinority
} from "../entities";

export const entities = () => {
  return [
    MobileLogs,
    OtpLogs,
    VaSurveyData,
    webLogs,
    Version,
    Admin,
    PariharaRoles,
    PariharaData,
    UpdatedSurveyLogs,
    EkycData,
    LoginAccess,
    LoginRoles,
    UploadImgAndVideo,
    QuestionMaster,
    DropdownValues,
    QuestionMapping,
    AssignMasters,
    Kutumba,
    PariharaImgAndVideo,
    Districts,
    Taluk,
    GramaPanchayat,
    Villages,
    ChildRole,
    RoleToLoss,
    AssignMastersHistory,
    EscomData,
    DemoAuthEkyc,
    RDMinority
  ];
};
