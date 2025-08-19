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
exports.UserDb = void 0;
const user_config_1 = require("../config/user_config");
const base_db_1 = require("./base_db");
class UserDb extends base_db_1.BaseDb {
    constructor(myDataSource) {
        super(myDataSource, user_config_1.UserConfig);
        this.getTopPlayers = (...args_1) => __awaiter(this, [...args_1], void 0, function* (limit = 10) {
            return this.model.find({
                select: ["username", "wins"],
                order: { wins: "DESC" }, // order by wins descending
                take: limit, // limit to top 10
            });
        });
    }
}
exports.UserDb = UserDb;
