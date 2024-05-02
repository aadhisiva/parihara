/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * created: [2024-04-19]
 * Project: Pariahra
 */


import { Container } from 'typedi';
import express from "express";
import { UserServices } from '../apiServices/userServices';
import { mobileAppResponse } from '../utils/errorHandling';
import { getRoleAndUserId } from '../utils/resuableCode';
import { MOBILE_MESSAGES } from '../utils/constants';
import { authTokenAndVersion, authVersion } from '../utils/middlewares';

const userRouter = express.Router()

const userServices = Container.get(UserServices);

userRouter.post('/signup', authVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.signupUser(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.ADDED));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/login', authVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.loginUser(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.SEND_OTP));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/verifyOtp', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.verifyOtp(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.VERIFY_OTP));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveSurveyData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.saveSurveyData(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.ADDED));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/updateSurveyData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.updateSurveyData(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.UPDATE));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getSubmissionList', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.getSubmissionList(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.UPDATE));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getSubmissionData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.getSubmissionData(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.UPDATE));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveSurveyImages', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.saveSurveyImages(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.ADDED));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/ekycProcess', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.ekycProcess(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.EKYC));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveEkycData', authTokenAndVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.saveEkycData(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.EKYC));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.get("/ekyRedirection", async (req: Request, res) => {
    try {
        res.send("");
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.get("/updateEkycProcess", async (req: Request, res) => {
    try {
        let body = req.body;
        let result = await userServices.updateEkycProcess(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.AFTER_EKYC_UPDATE));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});


export {
    userRouter
};