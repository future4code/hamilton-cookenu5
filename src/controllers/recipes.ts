import express, { Request, Response } from "express";
import { JwtAuthenticator } from '../services/JwtAuthenticator';

import { RecipeDataBase } from '../data/RecipesDataBase';
import { IdGenerator } from "../services/IdGenerator";
import { BaseDataBase } from "../data/BaseDataBase";


export const createRecipe = async (req: Request, res: Response) => {
  try {
  const token = req.headers.authorization as string

  const recipeData = {
      title: req.body.title,
      description: req.body.description
  }
  const todayDate =  Date.now()

  const authenticatorDate = new JwtAuthenticator()
  const authenticator = authenticatorDate.getData(token)
  
  const idGenerator = new IdGenerator(); 
  const id = idGenerator.idGenerator(); 

  const recipeDataBase = new RecipeDataBase();
  await recipeDataBase.createRecipe(id, recipeData.title, recipeData.description, new Date(todayDate), authenticator.id);
 
  res.status(200).send({
    message:"Recipe created successfully",
    id
  })

  }catch(err) {
  res.status(400).send({
      message:err.message
  })
  await BaseDataBase.destroyConnection();
}}

export const getRecipeById =  async (req: Request, res: Response) => {
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
}
