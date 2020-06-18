import knex from 'knex'
import { BaseDataBase } from './BaseDataBase'

export class UserDataBase extends BaseDataBase{
    private static TABLE_NAME: string = "users"
    public async createUser(id: string, name: string, email: string, password: string): Promise<void> {
        await this.getConnection()
            .insert({
                id,
                name,
                email,
                password
            }).into(UserDataBase.TABLE_NAME)
    }

    public async getUserByEmail(email:string):Promise<any>{
        const result = await this.getConnection()
        .select("*").from(UserDataBase.TABLE_NAME).where({
            email
        })
        return result[0]
    }
    public async getUserById(id:string):Promise <any>{
        const result = await this.getConnection()
        .select("*")
        .from(UserDataBase.TABLE_NAME)
        .where({
            id
        })
        return result[0]
    }
}
