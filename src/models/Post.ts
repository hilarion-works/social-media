import '../util/initEnv'

import { connection1 } from '../util/database'
import { DataTypes, Model, Optional } from 'sequelize'
import JWT from 'jsonwebtoken'

// Define the attributes for the Post model
export interface PostAttributes {
  id: number;
  caption: string;
  media_url: string;
  media_type: string | null;
  media_width: string;
  media_height: string;
  is_private: boolean;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

// Define the optional attributes for creation
export interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'deleted_at'> {}

// Extend the Sequelize Model class
export class PostModel extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public caption!: string;
  public media_url!: string;
  public media_type!: string | null;
  public media_width!: string;
  public media_height!: string;
  public is_private!: boolean;
  public user_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date | null;
}


const Post = connection1.define<PostModel>(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey : true,
      allowNull : false,
      autoIncrement : true
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    media_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    media_width: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    media_height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER 
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'post',
    timestamps: false,
    underscored: true,
    // paranoid: true
  }
)

export default Post
