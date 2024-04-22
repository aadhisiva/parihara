export const YES = 'Yes';
export const SUPER_ADMIN = 'Super Admin';

export const API_VERSION_ISSUE = 'New Version Available. Please Contact To Technical Team';
export const API_SESSION_EXPIRED = 'Your Session Has Expired. Please Try To Login Again.';
export const HEADERS_ISSUE = 'Please Check Headers(version, userid, token).';


export enum WEBPAGES {
    LOGIN_PAGE='Login Page',
    USER_MANAGEMENT='User Management',
    SCEHEMS='Schemes' 
}


export enum RESPONSETYPE {
    SUCCESS='SUCCESS',
    FAILED='FAILED'
}
export enum WEBMESSAGES {
    SEND_OTP='Send Otp',
    VERIFY_OTP='Send Otp',
    GET_ALLDATA='Get All Data',
    ADDED='New Data Added',
    UPDATE='Update Exist Data', 
}
export enum MOBILE_MESSAGES {
    SEND_OTP='Send Otp',
    VERIFY_OTP='Verify Otp',
    GET_ALLDATA='Get All Data',
    ADDED='New Data Added',
    UPDATE='Update Exist Data',
    GET_CHILD_DATA="Get Child Data From External Source",
    GET_CHILD_WITH_AADHAR_HASH="Get Child Data From External Source(With aadhar hash)",
    GET_KUTUMBA_DATA="Get Kutumba Data From External Source",
};

export enum API_MESSAGES {
    VERIFICATION_FAILED='Verification Failed',
    VERIFICATION_SUCCESS='Verification Success'
};

export const DISTRICT_OFFICER = "District Officer";
export const TALUK_OFFICER = "Taluk Officer";
export const ZONE_OFFICER = "Zone Officer";
export const BBMP_OFFICER = "BBMP Head";
export const DIVISION_OFFICER = "Division Officer";
export const GP_OFFICER = "GramaPanchayat Officer";