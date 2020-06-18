import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { UserDataBase } from '../data/UserDataBase'
import { JwtAuthenticator } from '../services/JwtAuthenticator'
import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'

export const signupUser = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        if (!req.body.password || req.body.password.length < 6) {
            throw new Error("Invalid password")
        }
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const idGenerator = new IdGenerator
        const id = idGenerator.idGenerator()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(
            userData.password
        )

        const userDataBase = new UserDataBase()
        await userDataBase.createUser(
            id,
            userData.name,
            userData.email,
            hashPassword
        );

        const authenticator = new JwtAuthenticator()
        const token = authenticator.generateToken({
            id: id
        })
        res.status(200).send({
            token
        })

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}

export const userLogin =  async (req: Request, res: Response) => {
    try {

        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        const userData = {
            email: req.body.email,
            password: req.body.password
        }
        const userDataBase = new UserDataBase()
        const user = await userDataBase.getUserByEmail(userData.email)

        const hashManager = new HashManager()
        const comparePassword = await hashManager.compare(userData.password, user.password)

        if(!comparePassword ){
            throw new Error("Invalid Password!")
        }
        const authenticator = new JwtAuthenticator()
        const token = authenticator.generateToken({
            id:user.id
        })
        res.status(200).send({
            token
        });

    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
}

export const getUserById =  async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;

        const authenticator = new JwtAuthenticator()
        const authenticationData = authenticator.getData(token)

        const userDB = new UserDataBase()
        const user = await userDB.getUserById(authenticationData.id)

        res.status(200).send({
            id:user.id, 
            name:user.name, 
            email:user.email
        })
    }  catch(err) {
        res.status(400).send({
            message: err.message
        })
    }    
}

export const getUserInfo =  async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string

        const authenticator = new JwtAuthenticator()
        const authenticationData = authenticator.getData(token);

         const userDB = new UserDataBase()
         const user = await userDB.getUserById(authenticationData.id)
 
         res.status(200).send({
             id:user.id, 
             name:user.name, 
             email:user.email
         })
    }  catch(err) {
        res.status(400).send({
            message: err.message
        })
    }    
}

