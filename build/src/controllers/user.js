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
exports.getUserInfo = exports.getUserById = exports.userLogin = exports.signupUser = void 0;
const UserDataBase_1 = require("../data/UserDataBase");
const JwtAuthenticator_1 = require("../services/JwtAuthenticator");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
exports.signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        if (!req.body.password || req.body.password.length < 6) {
            throw new Error("Invalid password");
        }
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        const idGenerator = new IdGenerator_1.IdGenerator;
        const id = idGenerator.idGenerator();
        const hashManager = new HashManager_1.HashManager();
        const hashPassword = yield hashManager.hash(userData.password);
        const userDataBase = new UserDataBase_1.UserDataBase();
        yield userDataBase.createUser(id, userData.name, userData.email, hashPassword);
        const authenticator = new JwtAuthenticator_1.JwtAuthenticator();
        const token = authenticator.generateToken({
            id: id
        });
        res.status(200).send({
            token: token
        });
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
exports.userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        const userData = {
            email: req.body.email,
            password: req.body.password
        };
        const userDataBase = new UserDataBase_1.UserDataBase();
        const user = yield userDataBase.getUserByEmail(userData.email);
        const hashManager = new HashManager_1.HashManager();
        const comparePassword = yield hashManager.compare(userData.password, user.password);
        if (!comparePassword) {
            throw new Error("Invalid Password!");
        }
        const authenticator = new JwtAuthenticator_1.JwtAuthenticator();
        const token = authenticator.generateToken({
            id: user.id
        });
        res.status(200).send({
            message: "Usuário logado!"
        });
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
exports.getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const authenticator = new JwtAuthenticator_1.JwtAuthenticator();
        const authenticationData = authenticator.getData(token);
        const userDB = new UserDataBase_1.UserDataBase();
        const user = yield userDB.getUserById(authenticationData.id);
        res.status(200).send({
            id: user.id, name: user.name, email: user.email
        });
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
exports.getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const authenticator = new JwtAuthenticator_1.JwtAuthenticator();
        const authenticationData = authenticator.getData(token);
        res.status(200).send({});
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
