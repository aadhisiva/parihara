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
import multer from "multer";
import XLSX from "xlsx";
import fs from "fs";
import { checkXlsxKeysExistOrNot } from '../utils/resuableCode';

const adminRouter = express.Router()

const adminServices = Container.get(AdminServices);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploadXlsx = multer({storage});

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

adminRouter.post('/checkMobileLogin', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.checkMobileLogin(body);
        return webAppResponse(res, result, body, '/checkMobileLogin', WEBMESSAGES.SEND_OTP, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/checkMobileLogin', WEBMESSAGES.SEND_OTP, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/findAccessById', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.findAccessById(body);
        return webAppResponse(res, result, body, '/findAccessById', WEBMESSAGES.SEND_OTP, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/findAccessById', WEBMESSAGES.SEND_OTP, req?.user?.UserId, req?.user?.RoleId);
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

adminRouter.post('/getAssignedMasters',authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.getAssignedMasters(body);
        return webAppResponse(res, result, body, '/getAssignedMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/getAssignedMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/assignRoleAccess',authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.assignRoleAccess(body);
        return webAppResponse(res, result, body, '/assignRoleAccess', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/assignRoleAccess', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/getMasterDropdown',authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.getMasterDropdown(body);
        return webAppResponse(res, result, body, '/getMasterDropdown', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/getMasterDropdown', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    };
});

adminRouter.post('/getMasters',authenticateToken, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req?.user?.UserId}};
        let result = await adminServices.getMasters(body);
        return webAppResponse(res, result, body, '/getMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
    } catch (error) {
        return webAppResponse(res, error, req.body, '/getMasters', WEBMESSAGES.GET_ALLDATA, req?.user?.UserId, req?.user?.RoleId);
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


adminRouter.post("/uploadDistrictMasters", uploadXlsx.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        // Read the file
        // Use streams for handling large files
        const workbook = XLSX.readFile(file.path, { cellText: false });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: ''});
        let findError = checkXlsxKeysExistOrNot(["DistrictNameKa", "DistrictCode","DistrictNameEn"], jsonData[0]);
        if(findError.error){
            return res.send({code: 422, message: findError.message, data: {}});
        };
        // Convert data to strings if needed
        const convertedData = jsonData.map((row) => {
            const convertedRow = {};
            Object.keys(row).forEach((key) => {
                convertedRow[key] = String(row[key]);
            });
            return convertedRow;
        });
        let result = await adminServices.uploadDistrictMasters(convertedData);
        // Clean up the uploaded file
        fs.unlinkSync(file.path);
        res.send(result)
    } catch (error) {
        return webAppResponse(res, error);
    }
});
adminRouter.post("/uploadTalukMasters", uploadXlsx.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        // Read the file
        // Use streams for handling large files
        const workbook = XLSX.readFile(file.path, { cellText: false });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: ''});
        let findError = checkXlsxKeysExistOrNot(["TalukNameKa", "TalukNameEn","TalukCode", "DistrictCode"], jsonData[0]);
        if(findError.error){
            return res.send({code: 422, message: findError.message, data: {}});
        };
        // Convert data to strings if needed
        const convertedData = jsonData.map((row) => {
            const convertedRow = {};
            Object.keys(row).forEach((key) => {
                convertedRow[key] = String(row[key]);
            });
            return convertedRow;
        });
        let result = await adminServices.uploadTalukMasters(convertedData);
        // Clean up the uploaded file
        fs.unlinkSync(file.path);
        res.send(result)
    } catch (error) {
        return webAppResponse(res, error);
    }
});

adminRouter.post("/uploadGpMasters", uploadXlsx.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        // Read the file
        // Use streams for handling large files
        const workbook = XLSX.readFile(file.path, { cellText: false });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: ''});
        let findError = checkXlsxKeysExistOrNot(["TalukCode", "DistrictCode","GpCode", "GpNameEn", "GpNameKa"], jsonData[0]);
        if(findError.error){
            return res.send({code: 422, message: findError.message, data: {}});
        };
        // Convert data to strings if needed
        const convertedData = jsonData.map((row) => {
            const convertedRow = {};
            Object.keys(row).forEach((key) => {
                convertedRow[key] = String(row[key]);
            });
            return convertedRow;
        });
        let result = await adminServices.uploadGpMasters(convertedData);
        // Clean up the uploaded file
        fs.unlinkSync(file.path);
        res.send(result)
    } catch (error) {
        return webAppResponse(res, error);
    }
});
adminRouter.post("/uploadVillageMasters", uploadXlsx.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        // Read the file
        // Use streams for handling large files
        const workbook = XLSX.readFile(file.path, { cellText: false });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: ''});
        let findError = checkXlsxKeysExistOrNot(["TalukCode", "DistrictCode","GpCode", "VillageNameEn","VillageNameKa"], jsonData[0]);
        if(findError.error){
            return res.send({code: 422, message: findError.message, data: {}});
        };
        // Convert data to strings if needed
        const convertedData = jsonData.map((row) => {
            const convertedRow = {};
            Object.keys(row).forEach((key) => {
                convertedRow[key] = String(row[key]);
            });
            return convertedRow;
        });
        let result = await adminServices.uploadVillageMasters(convertedData);
        // Clean up the uploaded file
        fs.unlinkSync(file.path);
        res.send(result)
    } catch (error) {
        return webAppResponse(res, error);
    }
});


export {
    adminRouter
};