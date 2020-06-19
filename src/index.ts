import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { JwtAuthenticator } from './services/JwtAuthenticator'

import { RecipeDataBase } from './data/RecipesDataBase'

import { signupUser, userLogin, getUserById, getUserInfo } from './controllers/user';
import { createRecipe } from './controllers/recipes';
import { IdGenerator } from "./services/IdGenerator";
import { UserDataBase } from "./data/UserDataBase";
import { FollowersDataBase } from "./data/FollowersDataBase";

dotenv.config();

const app = express();
app.use(express.json());

app.post ("/signup", signupUser);

app.post("/login", userLogin);

app.get("/user/profile", getUserInfo);

app.get("/user/:id", getUserById);

app.post("/recipes", createRecipe );

app.get("/recipes/:id", async (req, res) => {
    try {
    const token = req.headers.authorization as string;

    const authorization = new JwtAuthenticator();
    authorization.getData(token);

    const recipeDB = new RecipeDataBase();
    const recipe = await recipeDB.getRecipeById(req.params.id);
    
    res.status(200).send({
        id: recipe.id, 
        name: recipe.title, 
        email: recipe.description
    })
    }catch(err) {
        res.status(400).send({
            message: err.message
        });
    }
})

app.post("/user/follow", async (req, res) => {
    try {
        const token = req.headers.authorization as string;

        const authenticator = new JwtAuthenticator()
        const authenticationData = authenticator.getData(token);
    
        const { userToFollowId } = req.body;

        if(!userToFollowId) {
            throw new Error("User not found");
        }
    
        const followDataBase = new FollowersDataBase();
        await followDataBase.followUserById(  userToFollowId, authenticationData.id);
        
        res.status(200).send({
            message:"Followed successfully",
        });
            
    }catch(err) {
        res.status(400).send({
            message:err.message
        })
    }
})

app.post("/user/unfollow", async (req, res) => {
    try {
        const token = req.headers.authorization as string;

        const authenticator = new JwtAuthenticator()
        const authenticationData = authenticator.getData(token);
    
        const { userToUnfollowId } = req.body;

        if(!userToUnfollowId) {
            throw new Error("User not found");
        }

        const followDataBase = new FollowersDataBase();
        await followDataBase.unfollowUserById(userToUnfollowId, authenticationData.id)

        res.status(200).send({
            message:"Unfollowed successfully",
        });
            
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