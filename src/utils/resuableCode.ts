import { AppDataSource } from "../db/config";
import { MobileLogs, OtpLogs, PariharaData, webLogs } from "../entities";
import cryptoJs from "crypto";
import Logger from "../loggers/winstonLogger";
import axios from "axios";

// generate random string
export const generateRandomString = (RequiredLength) => {
  let newString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < RequiredLength; i++) {
    let randomCharacter = characters.charAt(Math.floor(Math.random() * charactersLength));
    newString += randomCharacter;
  }
  return newString;
};

export function generateOTP(length) {
  // Declare a digits variable 
  // which stores all digits
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export function generateEOfTTime() {
  // generate time 
  const end = new Date();
  // end.setHours(23, 59, 59, 999);
  return end.toLocaleDateString();
};

export function generateCurrentTime() {
  // generate time 
  const current = new Date();
  return current.toLocaleDateString();
};

export function generateUniqueId() {
  // generate time 
  const [year, month, day] = new Date().toJSON().split('T')[0].split('-');
  return year + month + day + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds();
};

// export function generateUniqueId() {
//   const [year, month, day] = new Date().toJSON().split('T')[0].split('-');
//   return year + month + day + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds();
// };

export const saveWebLogs = async (WebPage, Message, UserId, Request, Response, Role, ResponseType) => {
  // generate time
  let newBody = {
    WebPage,
    Message,
    UserId,
    Role,
    Request: JSON.stringify(Request),
    Response: JSON.stringify(Response),
    ResponseType
  }
  return await AppDataSource.getRepository(webLogs).save(newBody);
};

export const saveMobileLogs = async (logMessage, apiMessage, UserId, Request, Response, Role, ResponseType) => {
  // generate time
  let newBody = {
    logMessage,
    apiMessage,
    UserId,
    Role,
    Request: JSON.stringify(Request),
    Response: JSON.stringify(Response),
    ResponseType
  }
  return await AppDataSource.getRepository(MobileLogs).save(newBody);
};

export const getRoleAndUserId = (req, message) => {
  // create new Object
  let newBody = {
    userId: req.headers["userid"],
    role: req.headers["role"],
    logMessage: message
  }
  return newBody;;
};

export const saveMobileOtps = async (Mobile, text, response, UserId = '', otp) => {
  // create new Object
  let newBody = {
    otp,
    Mobile,
    Message: text,
    Response: JSON.stringify(response),
    UserId
  }
  return await AppDataSource.getRepository(OtpLogs).save(newBody);
};

// convert aadhar no to hash for getting details from kutumba
export const convertAadharToSha256Hex = async (data) => {
  try {
      let hash = cryptoJs.createHash(process.env.HASHING256);
      hash.update(data);
      return hash.digest("hex").toUpperCase();
  } catch (e) {
      Logger.error("[******* convertAadharToSha256Hex *******]", e);
      return e.message;
  }
};

// hashmac means its combination of (aadhar no, client code, sec key, etc...)
export const HashHMACHex = (hMACKey, InputValue) => {
  let hashHMACHex = '';

  const HashHMAC = (message, hmac) => {
      return hmac.update(message).digest();
  };
  const HashEncode = (hash) => {
      return Buffer.from(hash).toString('base64');
  };
  try {
      const keyByte = Buffer.from(hMACKey, 'ascii');
      const hmacsha256 = cryptoJs.createHmac('sha256', keyByte);
      const messageBytes = Buffer.from(InputValue, 'ascii');

      const hash = HashHMAC(messageBytes, hmacsha256);
      hashHMACHex = HashEncode(hash);
  } catch (ex) {
      Logger.error("Error Message: [" + ex.message.toString() + "]");
      return ex.message;
  }
  return hashHMACHex;
};

// convert kutumba decryptData readable formate
export const DecryptStringFromEncrypt = (key, IV, cipherText) => {
  const buffer = Buffer.from(cipherText, 'base64');
  const aes = cryptoJs.createDecipheriv('aes-256-cbc', key, IV);
  let decrypted = aes.update(buffer, null, 'utf8');
  decrypted += aes.final('utf8');
  return decrypted;
};
// convert kutumba decryptData readable formate
export const expandCodeParameters = (type, DataType, codes) => {
 let getLength = codes.length;
 let newArray = ['','','','','','','','','','','',''];
 let slicedData = newArray.slice(getLength+2);
 for(let i=0; i < getLength; i++){
  slicedData.unshift(codes[i]);
  };
  slicedData.unshift(DataType);
  slicedData.unshift(type);
 return slicedData;
};

export const generateUniqueSubmissionId = async () => {
  let getData = await AppDataSource.query('select top 1 MAX(id) id from PariharaData');
  return !getData[0]?.id ? "PARI0" : "PARI"+getData[0]?.id;
};


export const checkXlsxKeysExistOrNot= (array, jsonData) => {
  let error = false;
  let message= "";
  array.map(key => {
    if(!jsonData.hasOwnProperty(key)) {
      error = true;
      message = `${key} is missing in xlsx.`;
      return {error, message};
    };
  });
  return {error, message};
};


export const GetEscomDataFromApi = async data => {
 return await axios.post("http://10.10.31.64/GetEscomData/api/GetEscomData", data, {
  headers: {
    "Accept": "application/json"
  }
 });
}