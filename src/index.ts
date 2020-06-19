import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";

import { signupUser, userLogin, getUserById, getUserInfo, feedUser } from './controllers/user';
import { createRecipe, getRecipeById } from './controllers/recipes';
import { followUser, unfollowUser } from "./controllers/followUnfollow";

dotenv.config();

const app = express();
app.use(express.json());

app.post ("/signup", signupUser);
app.post("/login", userLogin);
app.get("/user/profile", getUserInfo);
app.get("/user/:id", getUserById);

app.post("/recipes", createRecipe );
app.get("/recipes/:id", getRecipeById);
app.post("/user/follow", followUser );

app.post("/user/unfollow", unfollowUser);
app.get("/users/feed", feedUser);

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
