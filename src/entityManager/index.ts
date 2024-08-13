import { Admin } from "typeorm";
import {
  AssignMasters,
  EkycData,
  Kutumba,
  LoginAccess,
  LoginRoles,
  MasterData,
  MobileLogs,
  OtpLogs,
  PariharaData,
  PariharaImgAndVideo,
  PariharaRoles,
  QuestionMaster,
  UpdatedSurveyLogs,
  UploadImgAndVideo,
  UserData,
  Version,
  webLogs,
  QuestionMapping,
  DropdownValues,
  Districts,
  Taluks,
  GramaPanchayat,
  Villages
} from "../entities";

export const entities = () => {
  return [
    MobileLogs,
    OtpLogs,
    UserData,
    webLogs,
    Version,
    Admin,
    PariharaRoles,
    PariharaData,
    UpdatedSurveyLogs,
    EkycData,
    LoginAccess,
    LoginRoles,
    MasterData,
    UploadImgAndVideo,
    QuestionMaster,
    DropdownValues,
    QuestionMapping,
    AssignMasters,
    Kutumba,
    PariharaImgAndVideo,
    Districts,
    Taluks,
    GramaPanchayat,
    Villages
  ];
};
