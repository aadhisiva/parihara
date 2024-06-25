import { AppDataSource } from "../db/config";
import { UserData, Version } from "../entities";
import { API_VERSION_ISSUE, HEADERS_ISSUE } from "./constants";
import jwt from 'jsonwebtoken';

export async function authVersion(req, res, next) {
    // Read the version from the request header
    const authVersion = req.headers["version"];
    if (!authVersion) return res.status(200).send({ code: 403, status: "Failed", message: "Provide Api Version In Headers." })
    let getVersion = await AppDataSource.getRepository(Version).find();
    let checkVersion = authVersion == getVersion[0]?.Version;
    if (!checkVersion) return res.status(200).send({ code: 403, status: "Failed", message: API_VERSION_ISSUE });
    next();
};

// Middleware function to verify JWT token
export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ code: 401, message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            return res.status(403).json({ code: 403, message: 'Failed to authenticate.' });
        }
        req.user = user;
        next();
    });
};

export async function authTokenAndVersion(req, res, next) {
    // Read the JWT access token from the request header
    // const token = req.headers["token"];
    const UserId = req.headers["userid"];
    const authVersion = req.headers["version"];
    if (!authVersion && !UserId) return res.status(200).send({ code: 403, status: "Failed", message: HEADERS_ISSUE });
    let getVersion = await AppDataSource.getRepository(Version).find();
    let checkVersion = authVersion == getVersion[0]?.Version;
    if (!checkVersion) return res.status(200).send({ code: 403, status: "Failed", message: API_VERSION_ISSUE });
    let getUser = await AppDataSource.getRepository(UserData).findOneBy({ UserId });
    if (!getUser) return res.status(200).send({ code: 422, message: "User Doesn't Exist." });
    // Verify the token
    // let verifyToken = (getUser?.Token == token) && getUser?.TokenExpirationTime == generateCurrentTime();
    // if (!verifyToken) {
    //     return res.status(403).send({ code: 403, status: "Failed", message: API_SESSION_EXPIRED }); // Return 403 if there is an error verifying
    // }
    next();
};
