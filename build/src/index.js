"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./controllers/user");
const recipes_1 = require("./controllers/recipes");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.post("/signup", user_1.signupUser);
app.post("/login", user_1.userLogin);
app.get("/user/:id", user_1.getUserById);
app.get("/user/profile", user_1.getUserInfo);
app.post("/recipes", recipes_1.createRecipe);
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
