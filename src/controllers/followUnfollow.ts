import express, { Request, Response } from "express";
import { JwtAuthenticator } from '../services/JwtAuthenticator'
import { FollowersDataBase } from "../data/FollowersDataBase";
import { BaseDataBase } from "../data/BaseDataBase";

export const followUser = async (req: Request, res: Response) => {
  try {
      const token = req.headers.authorization as string;

      const authenticator = new JwtAuthenticator()
      const authenticationData = authenticator.getData(token);
  
      const { userToFollowId } = req.body;

      if(!userToFollowId || "") {
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
  await BaseDataBase.destroyConnection();
}

export const unfollowUser = async (req: Request, res: Response) => {
  try {
      const token = req.headers.authorization as string;

      const authenticator = new JwtAuthenticator()
      const authenticationData = authenticator.getData(token);
  
      const { userToUnfollowId } = req.body;

      if(!userToUnfollowId || "" ) {
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
  await BaseDataBase.destroyConnection();
}
