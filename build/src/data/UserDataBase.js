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
exports.UserDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
class UserDataBase extends BaseDataBase_1.BaseDataBase {
    createUser(id, name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id,
                name,
                email,
                password
            }).into(UserDataBase.TABLE_NAME);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*").from(UserDataBase.TABLE_NAME).where({
                email
            });
            return result[0];
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(UserDataBase.TABLE_NAME)
                .where({
                id
            });
            return result[0];
        });
    }
}
exports.UserDataBase = UserDataBase;
UserDataBase.TABLE_NAME = "users";
