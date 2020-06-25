import { BaseDataBase } from "./BaseDataBase";

export class RecipeDataBase extends BaseDataBase {

private static TABLE_NAME: string = "recipes"
public async createRecipe(id: string, title: string, description: string, date: Date, user_id: string): Promise<any> {
    await this.getConnection()
        .insert({
            id,
            title,
            description,
            create_date: date,
            user_id
        }).into(RecipeDataBase.TABLE_NAME)
}

public async getRecipeById(id:string):Promise <any>{
    const result = await this.getConnection()
    .select("*")
    .from(RecipeDataBase.TABLE_NAME)
    .where({
        id
    })
    return result[0]
}
}
