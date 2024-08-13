/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * created: [2024-04-19]
 * Project: Pariahra
 */


import { Container } from 'typedi';
import express from "express";
import { AdminServices } from '../apiServices/adminServices';
import { webAppResponse } from '../utils/errorHandling';
import { WEBMESSAGES } from '../utils/constants';
import { authenticateToken, authVersion } from '../utils/middlewares';

const adminRouter = express.Router()

const adminServices = Container.get(AdminServices);

adminRouter.post('/siginIn', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.signupUser(body);
        return webAppResponse(res, result, body, '/siginIn', WEBMESSAGES.SIGN_UP, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/siginIn', WEBMESSAGES.SIGN_UP, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/sendOtp', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.sendOtp(body);
        return webAppResponse(res, result, body, '/sendOtp', WEBMESSAGES.SEND_OTP, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/sendOtp', WEBMESSAGES.SEND_OTP, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/verifyOtp', authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.verifyOtp(body);
        return webAppResponse(res, result, body, '/verifyOtp', WEBMESSAGES.VERIFY_OTP, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/verifyOtp', WEBMESSAGES.VERIFY_OTP, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/saveSurveyData', authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.saveSurveyData(body);
        return webAppResponse(res, result, body, '/saveSurveyData', WEBMESSAGES.ADDED, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/saveSurveyData', WEBMESSAGES.ADDED, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/updateSurveyData', authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.updateSurveyData(body);
        return webAppResponse(res, result, body, '/updateSurveyData', WEBMESSAGES.UPDATE, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/updateSurveyData', WEBMESSAGES.UPDATE, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/getSubmissionList', authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId, RoleId: req?.user?.RoleId}};
        let result = await adminServices.getSubmissionList(body);
        return webAppResponse(res, result, body, '/getSubmissionList', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/getSubmissionList', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    }
});

adminRouter.post('/getSubmissionData', authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.getSubmissionData(body);
        return webAppResponse(res, result, body, '/getSubmissionData', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/getSubmissionData', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/retriveMasters',authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.retriveMasters(body);
        return webAppResponse(res, result, body, '/retriveMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/retriveMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/assigningProcess',authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.assigningProcess(body);
        return webAppResponse(res, result, body, '/retriveMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/retriveMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/question',authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.question(body);
        return webAppResponse(res, result, body, '/retriveMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/retriveMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/addRolesOrGet',authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.addRolesOrGet(body);
        return webAppResponse(res, result, body, '/retriveMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/retriveMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    };
});

export {
    adminRouter
};