"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogic = void 0;
const user_1 = require("../../domain/entity/user");
class UserLogic {
    constructor(userDb, auth) {
        this.userDb = userDb;
        this.auth = auth;
        this.create = (req) => __awaiter(this, void 0, void 0, function* () {
            let userExist = yield this.userDb.getOne({ username: req.username });
            if (userExist) {
                throw new Error(`User with this username : ${req.username} exist`);
            }
            const user = new user_1.User(req.username, 0, 0);
            const newUser = yield this.userDb.create(user);
            return newUser;
        });
        this.signInUser = (signInDTO) => __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.userDb.getOne({ username: signInDTO.username });
            if (!userExist) {
                throw new Error(`There is  no user with this username : ${signInDTO.username} exist`);
            }
            const encryptData = {
                username: userExist.username,
                id: userExist.id
            };
            const timeInSec = Number(process.env.EXPIRATION_TIME) || 3600; // 1 hr
            const encryptDataUsingJWT = yield this.auth.encryptDataUsingJWT(encryptData, timeInSec);
            return {
                username: userExist.username,
                token: encryptDataUsingJWT,
                expirationInSeconds: timeInSec
            };
        });
        this.topPlayers = () => __awaiter(this, void 0, void 0, function* () {
            const topPlayers = yield this.userDb.getTopPlayers();
            return topPlayers;
        });
        this.loadUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userDb.getOne({ id: userId });
        });
    }
}
exports.UserLogic = UserLogic;
