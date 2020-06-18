import { BaseDataBase } from "./BaseDataBase";
import { Moment } from "moment";

export class RecipeDataBase extends BaseDataBase {

private static TABLE_NAME: string = "recipes"
public async createRecipe(id: string, title: string, description: string, date: Date): Promise<any> {
    await this.getConnection()
        .insert({
            id,
            title,
            description,
            create_date: date

        }).into(RecipeDataBase.TABLE_NAME)
}}