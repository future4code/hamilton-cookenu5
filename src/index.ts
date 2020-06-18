import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { JwtAuthenticator } from './services/JwtAuthenticator'
import moment from 'moment'

import { RecipeDataBase } from './data/RecipesDataBase'

import { signupUser, userLogin, getUserById, getUserInfo } from './methods/user'
import { IdGenerator } from "./services/IdGenerator";

dotenv.config();


const app = express();

app.use(express.json());


app.post ("/signup", signupUser)

app.post("/login", userLogin)

app.get("/user/:id", getUserById)

app.get("/user/profile", getUserInfo)

app.post("/recipes", async (req: Request, res: Response) => {
    
    try {
    const token = req.headers.authorization as string

    const recipeData = {
        title: req.body.title,
        description: req.body.description
    }
    const todayDate =  Date.now()

    const authenticator = new JwtAuthenticator()
    const authenticationData = authenticator.getData(token)
    

    const idGenerator = new IdGenerator(); 
    const id = idGenerator.idGenerator(); 

    const recipeDataBase = new RecipeDataBase()
    const recipeCreated =  await recipeDataBase.createRecipe(id, recipeData.title, recipeData.description, new Date(todayDate))
   
    res.status(200).send({
        message:"Receita criada com sucesso"
    })

}catch(err) {
    res.status(400).send({
        message:err.message
    })
}
  
})





const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});