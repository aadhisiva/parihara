/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * created: [2024-04-19]
 * Project: Pariahra
 */


import { Container } from 'typedi';
import express from "express";
import multer from "multer";
import { UserServices } from '../apiServices/userServices';
import { mobileAppResponse } from '../utils/errorHandling';
import { getRoleAndUserId } from '../utils/resuableCode';
import { MOBILE_MESSAGES } from '../utils/constants';
import { authTokenAndVersion, authVersion } from '../utils/middlewares';

const userRouter = express.Router()

const userServices = Container.get(UserServices);


// Multer setup
const upload = multer(); // No storage configuration means files are not saved

userRouter.post('/signup', authVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.signupUser(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, MOBILE_MESSAGES.ADDED));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/login', authVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.loginUser(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "login user"));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/loginWithOfficer', authVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.loginWithOfficer(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "login user"));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/sendOtpForAuth', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.sendOtpForAuth(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "otp for auth."));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/verifyOtp', authVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.verifyOtp(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, MOBILE_MESSAGES.VERIFY_OTP));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/verifyOfficerOtp', authVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.verifyOfficerOtp(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, MOBILE_MESSAGES.VERIFY_OTP));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/fetchLossData', authVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.fetchLossData(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, MOBILE_MESSAGES.VERIFY_OTP));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveSurveyData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.saveSurveyData(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "New Survey Added"));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/assignedGpDetails', authVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.assignedGpDetails(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "Survey Updated"));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/updateSurveyData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.updateSurveyData(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "update data from mobile"));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getSubmissionList', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.getSubmissionList(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "Get all submission data"));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getAllList', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.getAllList(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "Get all list of survey"));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getSubmissionData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.getSubmissionData(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "Get submission data"));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getEkycToken', async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.getEkycToken(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, MOBILE_MESSAGES.EKYC));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveEkycData', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.saveEkycData(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, MOBILE_MESSAGES.EKYC));
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

userRouter.post('/getDemoAuthToken', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.getDemoAuthToken(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, MOBILE_MESSAGES.EKYC));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveDemoAuthData', async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.saveDemoAuthResponse(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, MOBILE_MESSAGES.EKYC));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post("/updateEkycProcess", authTokenAndVersion,async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.updateEkycProcess(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, MOBILE_MESSAGES.AFTER_EKYC_UPDATE));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post("/updateDemoAuthProcess", authTokenAndVersion,async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.updateDemoAuthProcess(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "Update demo auth res in parihara data"));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/retriveMasters', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.userid}};
        let result = await userServices.retriveMasters(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "Get Masters data"));
    } catch (error) {
        return mobileAppResponse(res, error);
    };
});

userRouter.post('/getKutumbaData',authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.userid}};
        let result = await userServices.getKutumbaData(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "Get kutumba data"));
    } catch (error) {
        return mobileAppResponse(res, error);
    };
});

userRouter.post('/postEscomData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.userid}};
        let result = await userServices.postEscomData(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "Get Escom Data"));
    } catch (error) {
        return mobileAppResponse(res, error);
    };
});

userRouter.get('/getEdMinorityData', async (req, res) => {
    try {
        let body = {...{id: req.query.id}, ...{UserId: req?.user?.userid}};
        let result = await userServices.getEdMinorityData(body);
        return mobileAppResponse(res, result, req.body, getRoleAndUserId(req, "Get minority data"));
    } catch (error) {
        return mobileAppResponse(res, error);
    };
});

userRouter.post('/uploadImage', upload.single('image') ,authTokenAndVersion, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        };
        let imageObj = {
            ImageName: req.file.originalname,
            ImageData: req.file.buffer,
            UserId: req.header.userid
        };
        let result = await userServices.uploadImages(imageObj);
        return mobileAppResponse(res, result, req.file, getRoleAndUserId(req, "Upload image"));
    } catch (error) {
        return mobileAppResponse(res, error);
    };
});

userRouter.get('/getImage/:id', async (req, res) => {
    try {
        const imageId = req.params.id;
        let result:any = await userServices.getImage(imageId);
        res.setHeader('Content-Disposition', `inline; filename="${result.ImageName}"`);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(result.ImageData);
    } catch (error) {
        return mobileAppResponse(res, error);
    };
});

userRouter.post('/uploadVideo',  upload.single('video'), authTokenAndVersion, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        let videoObj = {
            ImageName: req.file.originalname,
            ImageData: req.file.buffer,
            UserId: req.header.UserId
        };
        let result = await userServices.uploadVideos(videoObj);
        return mobileAppResponse(res, result, req.file, getRoleAndUserId(req, "uploadVideo"));
    } catch (error) {
        return mobileAppResponse(res, error);
    };
});

userRouter.get('/getVideo/:id', async (req, res) => {
    try {
        const imageId = req.params.id;
        let result:any = await userServices.getVideo(imageId);
        res.setHeader('Content-Disposition', `inline; filename="${result.ImageName}"`);
        res.setHeader('Content-Type', 'video/mp4');
        res.send(result.ImageData);
    } catch (error) {
        return mobileAppResponse(res, error);
    };
});

export {
    userRouter
};