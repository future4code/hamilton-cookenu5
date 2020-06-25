import { BaseDataBase } from './BaseDataBase'

export class FollowersDataBase extends BaseDataBase{
  private static TABLE_NAME: string = "followers";

  public async followUserById(followed_id: string, follower_id: string):Promise<void>{
    await this.getConnection()
    .insert({
      follower_id,
      followed_id
    }).into(FollowersDataBase.TABLE_NAME)
  }

  public async unfollowUserById(unfollowed_id: string, unfollower_id: string): Promise<void> {
    await this.getConnection()
    .delete().from(FollowersDataBase.TABLE_NAME)
    .where({followed_id: unfollowed_id})
    .andWhere({  follower_id: unfollower_id})
  }
};
