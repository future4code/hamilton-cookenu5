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
exports.createRecipe = void 0;
const JwtAuthenticator_1 = require("../services/JwtAuthenticator");
const RecipesDataBase_1 = require("../data/RecipesDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
exports.createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const recipeData = {
            title: req.body.title,
            description: req.body.description
        };
        const todayDate = Date.now();
        const authenticator = new JwtAuthenticator_1.JwtAuthenticator();
        authenticator.getData(token);
        const idGenerator = new IdGenerator_1.IdGenerator();
        const id = idGenerator.idGenerator();
        const recipeDataBase = new RecipesDataBase_1.RecipeDataBase();
        const recipeCreated = yield recipeDataBase.createRecipe(id, recipeData.title, recipeData.description, new Date(todayDate));
        res.status(200).send({
            message: "Receita criada com sucesso"
        });
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
