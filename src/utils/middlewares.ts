import { AppDataSource } from "../db/config";
import { UserData, Version } from "../entities";
import { API_VERSION_ISSUE, HEADERS_ISSUE } from "./constants";

export async function authVersion(req, res, next) {
    // Read the version from the request header
    const authVersion = req.headers["version"];
    if (!authVersion) return res.status(200).send({ code: 403, status: "Failed", message: "Provide Api Version In Headers." })
    let getVersion = await AppDataSource.getRepository(Version).find();
    let checkVersion = authVersion == getVersion[0]?.Version;
    if (!checkVersion) return res.status(200).send({ code: 403, status: "Failed", message: API_VERSION_ISSUE });
    next();
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
    if(!getUser) return res.status(200).send({code: 422, message: "User Doesn't Exist."});
    // Verify the token
    // let verifyToken = (getUser?.Token == token) && getUser?.TokenExpirationTime == generateCurrentTime();
    // if (!verifyToken) {
    //     return res.status(403).send({ code: 403, status: "Failed", message: API_SESSION_EXPIRED }); // Return 403 if there is an error verifying
    // }
    next();
};

// export async function webAuthTokenAndVersion(req, res, next) {
//     // Read the JWT access token from the request header
//     const UserRole = req.headers["role"];
//     const token = req.headers["token"];
//     const UserId = req.headers["userid"];
//     const authVersion = req.headers["version"];
//     if (!authVersion && !token && !UserId) return res.status(403).send({ code: 403, status: "Failed", message: "Provide Valid Values." });
//     let getVersion = await AppDataSource.getRepository(Version).find();
//     let checkVersion = authVersion == getVersion[0].WebVersion;
//     if (!checkVersion) return res.status(403).send({ code: 403, status: "Failed", message: API_VERSION_ISSUE });
//     let getUser = await AppDataSource.getRepository(userData).findOneBy({ UserId });
//     // Verify the token 
//     let verifyToken = (getUser?.WebToken == token) && getUser?.WebTokenExpirationTime == generateCurrentTime();
//     if (!verifyToken) {
//         return res.status(403).send({ code: 403, message: "Please Login Again" }); // Return 403 if there is an error verifying
//     }
//     next();
// }; 