import express, { Request, Response } from "express";
import { JwtAuthenticator } from '../services/JwtAuthenticator';

import { RecipeDataBase } from '../data/RecipesDataBase';
import { IdGenerator } from "../services/IdGenerator";


export const createRecipe = async (req: Request, res: Response) => {
  try {
  const token = req.headers.authorization as string

  const recipeData = {
      title: req.body.title,
      description: req.body.description
  }
  const todayDate =  Date.now()

  const authenticator = new JwtAuthenticator()
   authenticator.getData(token)
  
  const idGenerator = new IdGenerator(); 
  const id = idGenerator.idGenerator(); 

  const recipeDataBase = new RecipeDataBase()
   await recipeDataBase.createRecipe(id, recipeData.title, recipeData.description, new Date(todayDate))
 
  res.status(200).send({
      message:"Receita criada com sucesso",
      id
  })

}catch(err) {
  res.status(400).send({
      message:err.message
  })
}}


