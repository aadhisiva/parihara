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
import { authTokenAndVersion, authVersion } from '../utils/middlewares';

const adminRouter = express.Router()

const adminServices = Container.get(AdminServices);

adminRouter.post('/login', authVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.signupUser(body);
        return webAppResponse(res, result, body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    } catch (error) {
        return webAppResponse(res, error, req.body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    }
});

adminRouter.post('/sendOtp', authVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.sendOtp(body);
        return webAppResponse(res, result, body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    } catch (error) {
        return webAppResponse(res, error, req.body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    }
});

adminRouter.post('/verifyOtp', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await adminServices.verifyOtp(body);
        return webAppResponse(res, result, body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    } catch (error) {
        return webAppResponse(res, error, req.body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    }
});

adminRouter.post('/saveSurveyData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await adminServices.saveSurveyData(body);
        return webAppResponse(res, result, body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    } catch (error) {
        return webAppResponse(res, error, req.body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    }
});

adminRouter.post('/updateSurveyData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await adminServices.updateSurveyData(body);
        return webAppResponse(res, result, body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    } catch (error) {
        return webAppResponse(res, error, req.body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    }
});

adminRouter.post('/getSubmissionList', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await adminServices.getSubmissionList(body);
        return webAppResponse(res, result, body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    } catch (error) {
        return webAppResponse(res, error, req.body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    }
});

adminRouter.post('/getSubmissionData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await adminServices.getSubmissionData(body);
        return webAppResponse(res, result, body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    } catch (error) {
        return webAppResponse(res, error, req.body, '/login', WEBMESSAGES.ADDED, req.headers.userid, '');
    }
});

export {
    adminRouter
};