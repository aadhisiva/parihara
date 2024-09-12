import axios from "axios";
import https from "https";
import { DemoAuthEkyc } from "../../entities/demoAuthEkyc";
import { EkycData } from "../../entities";

const ekycAxiosRequest = async (url, body) => {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    return await axios.post(url, body, { httpsAgent });
};

export async function getEkycDataFfromDBT(data) {
    const { Name, txnDateTime, UniqueId } = data;
    try {
        let bodyData = {
            deptCode: process.env.DEP_CODE,
            applnCode: process.env.APPLI_CODE,
            schemeCode: process.env.SCHEME_CODE,
            beneficiaryID: UniqueId,
            beneficiaryName: Name,
            integrationKey: process.env.INTEGRATION_KEY,
            integrationPassword: process.env.INTEGRATION_PASS,
            txnNo: txnDateTime,
            txnDateTime: txnDateTime,
            serviceCode: process.env.SERVICE_CODE,
            responseRedirectURL: process.env.EKYC_REDIRECTION_URL
        };
        let res = await ekycAxiosRequest(process.env.EKYC_URL, bodyData);
        if (!res?.data?.Token) return {code: 422, message: "Something went wrong."};
        return `${process.env.EKYC_TOKEN_URL}?key=${process.env.INTEGRATION_KEY}&token=${res?.data?.Token}`;
    } catch (e) {
        return {code:422 , message: e.message};
    };
}

export async function getDemoEkycDataFfromDBT(data) {
    const {Name, UniqueId, txnDateTime} = data;
    try {
        let bodyData = {
            deptCode : Number(process.env.DEMO_DEP_CODE),
            applnCode : Number(process.env.DEMO_APPLI_CODE),
            schemeCode : Number(process.env.DEMO_SCHEME_CODE),
            beneficiaryID : UniqueId,
            beneficiaryName : Name,
            integrationKey : String(process.env.DEMO_INTEGRATION_KEY),
            integrationPassword : String(process.env.DEMO_INTEGRATION_PASS),
            txnNo : txnDateTime,
            txnDateTime : txnDateTime,
            responseRedirectURL : String(process.env.EKYC_REDIRECTION_URL)
        }
        let res = await ekycAxiosRequest(process.env.DEMO_EKYC_URL, bodyData);
        if (!res?.data?.Token) return {code: 422, message: "Something went wrong."};
        return `${process.env.DEMO_EKYC_TOKEN_URL}?key=${process.env.DEMO_INTEGRATION_KEY}&token=${res?.data?.Token}`;
    } catch (e) {
        return {code:422 , message: e.message};
    };
};

export function mapToDemoAuthEkycDetails(data) {
    let demoAuth = new DemoAuthEkyc();
    demoAuth.TxnNo = data?.txnNo ?? "";
    demoAuth.TxnDateTime = data?.txnDateTime+'' ?? "";
    demoAuth.BeneficiaryAadaarName = data?.beneficiaryAadaarName+'' ?? "";
    demoAuth.AadhaarDemoAuthError = data?.aadhaarDemoAuthError+'' ?? "";
    demoAuth.AadhaarDemoAuthStatus = data?.aadhaarDemoAuthStatus+'' ?? "";
    demoAuth.AadhaarHash = data?.aadhaarHash+'' ?? "";
    demoAuth.MaskedAadhaar = data?.maskedAadhaar+'' ?? "";
    demoAuth.BeneficiaryID = data?.beneficiaryID+'' ?? "";
    demoAuth.FinalStatus = data?.finalStatus+'' ?? "";
    demoAuth.MaskedAadhaar = data?.MaskedAadhaar+'' ?? "";
    demoAuth.NPCIError = data?.npciError+'' ?? "";
    demoAuth.NPCIStatus = data?.npciStatus+'' ?? "";
    demoAuth.NameMatchStatus = data?.nameMatchStatus+'' ?? "";
    demoAuth.NameMatchScore = data?.nameMatchScore+'' ?? "";
    demoAuth.VaultRefNumber = data?.vaultRefNumber+'' ?? "";
    demoAuth.UIDToken = data?.uidToken+'' ?? "";
    return demoAuth;
};

export function mapToEkycDetails(data){
    let newData = new EkycData();
    let eKYCData = data?.eKYCData;
    let localData = data?.localKYCData;
    newData.txnNo = data?.txnNo ?? "";
    newData.txnDateTime = data?.txnDateTime ?? "";
    newData.aadhaarHash = data?.aadhaarHash ?? "";
    newData.finalStatus = data?.finalStatus ?? "";
    newData.vaultRefNumber = data?.vaultRefNumber ?? "";
    newData.ekycTxnNo = data?.ekycTxnNo ?? "";
    newData.ekycTimestamp = data?.ekycTimestamp ?? "";
    newData.residentConsent = data?.residentConsent ?? "";
    newData.status = data?.status ?? "";
    newData.responseStatus = data?.responseStatus ?? "";
    newData.errorMessage = data?.errorMessage ?? "";
    newData.error = data?.error ?? "";
    newData.uidToken = data?.uidToken ?? "";
    newData.actionCode = data?.actionCode ?? "";
    newData.otp = data?.otp ?? "";
    newData.otpTxnNo = data?.otpTxnNo ?? "";
    newData.otpTimeStamp = data?.otpTimeStamp ?? "";
    newData.ekyc_dob = eKYCData?.dob ?? "";
    newData.ekyc_gender = eKYCData?.gender ?? "";
    newData.ekyc_name = eKYCData?.name ?? "";
    newData.ekyc_co = eKYCData?.co ?? "";
    newData.ekyc_country = eKYCData?.country ?? "";
    newData.ekyc_dist = eKYCData?.dist ?? "";
    newData.ekyc_house = eKYCData?.house ?? "";
    newData.ekyc_street = eKYCData?.street ?? "";
    newData.ekyc_lm = eKYCData?.lm ?? "";
    newData.ekyc_loc = eKYCData?.loc ?? "";
    newData.ekyc_pc = eKYCData?.pc ?? "";
    newData.ekyc_po = eKYCData?.po ?? "";
    newData.ekyc_state = eKYCData?.state ?? "";
    newData.ekyc_subdist = eKYCData?.subdist ?? "";
    newData.ekyc_vtc = eKYCData?.vtc ?? "";
    newData.ekyc_lang = eKYCData?.lang ?? "";
    newData.local_dob = localData?.dob ?? "";
    newData.local_gender = localData?.gender ?? "";
    newData.local_name = localData?.name ?? "";
    newData.local_co = localData?.co ?? "";
    newData.local_country = localData?.country ?? "";
    newData.local_dist = localData?.dist ?? "";
    newData.local_house = localData?.house ?? "";
    newData.local_street = localData?.street ?? "";
    newData.local_lm = localData?.lm ?? "";
    newData.local_loc = localData?.loc ?? "";
    newData.local_pc = localData?.pc ?? "";
    newData.local_po = localData?.po ?? "";
    newData.local_state = localData?.state ?? "";
    newData.local_subdist = localData?.subdist ?? "";
    newData.local_vtc = localData?.vtc ?? "";
    newData.local_lang = localData?.lang ?? "";
    newData.photo = data?.photo ?? "";
    newData.maskedAadhaar = data?.maskedAadhaar ?? "";
    newData.npciStatus = data?.npciStatus ?? "";
    newData.npciError = data?.npciError ?? "";
    newData.npciBankName = data?.npciBankName ?? "";
    newData.npciLastUpdateDate = data?.npciLastUpdateDate ?? "";
    return newData;
}