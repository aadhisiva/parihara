import { Service } from "typedi";
import { SMSServices } from "./sms_otp";


@Service()
export class OtpServices {

    constructor(public smsServices: SMSServices) { };

    async sendOtpAsSingleSms(mobile_no, otp) {
        let text = `Your OTP is ${otp}.Directorate of EDCS.`;
        let sendSingleSms = await this.smsServices.sendSingleSMS(
            process.env.SMS_USERNAME,
            process.env.SMS_PASSWORD,
            process.env.SMS_SENDER_ID,
            text,
            mobile_no,
            process.env.SMS_API_SERVICE_KEY,
            process.env.TEMPLATE_ID
        );
        return {...sendSingleSms, ...{otpMessage: text}};
    };

    async sendOnlyBulkMsgs(mobile_no, msg) {
        let sendSingleSms = await this.smsServices.sendSingleSMSForBulk(
            process.env.SMS_USERNAME_BULK,
            process.env.SMS_PASSWORD_BULK,
            process.env.SMS_SENDER_ID_BULK,
            msg,
            mobile_no,
            process.env.SMS_API_SERVICE_KEY_BULK,
            process.env.TEMPLATE_ID_BULK
        );
        return {...sendSingleSms, ...{otpMessage: msg}};
    };

    async sendSmsInKannadaUnicode(mobile_no, otp) {
        let text = `ಅಪ್ಲಿಕೇಶನ್ ಲಾಗಿನ್ ಒಟಿಪಿ ${otp}.
        -NHM, Gok`;
        let sendSingleSms = await this.smsServices.sendSingleUnicode(
            process.env.SMS_USERNAME,
            process.env.SMS_PASSWORD,
            process.env.SMS_SENDER_ID,  
            text,
            mobile_no,
            process.env.SMS_API_SERVICE_KEY,
            process.env.TEMPLATE_ID_KANNADA
        );
        return sendSingleSms;
    }

    async sendOtpAsReadyForDeliver(mobile_no, otp, order_number) {
        let text = `${otp} is the OTP for Spectacle Delivery for the order number ${order_number}
        -National Health mission ,GOK.`;
        console.log("text",text)
        let sendSingleSms = await this.smsServices.sendSingleSMS(
            process.env.SMS_USERNAME,
            process.env.SMS_PASSWORD,
            process.env.SMS_SENDER_ID,
            text,
            mobile_no,
            process.env.SMS_API_SERVICE_KEY,
            process.env.TEMPLATE_ID_FOR_DELIVER
        );
        return sendSingleSms;
    };
}