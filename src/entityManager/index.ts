import { Admin } from "typeorm";
import {
  EkycData,
  LoginAccess,
  LoginRoles,
  MasterData,
  MobileLogs,
  OtpLogs,
  PariharaData,
  PariharaRoles,
  UpdatedSurveyLogs,
  UserData,
  Version,
  webLogs,
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
    MasterData
  ];
};
