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
exports.RecipeDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
class RecipeDataBase extends BaseDataBase_1.BaseDataBase {
    createRecipe(id, title, description, date) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id,
                title,
                description,
                create_date: date
            }).into(RecipeDataBase.TABLE_NAME);
        });
    }
}
exports.RecipeDataBase = RecipeDataBase;
RecipeDataBase.TABLE_NAME = "recipes";
