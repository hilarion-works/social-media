import '../util/initEnv'

import { connection1 } from '../util/database'
import { DataTypes, Model, Optional } from 'sequelize'
import JWT from 'jsonwebtoken'

// Define the attributes for the Comment model
export interface CommentAttributes {
  id: number;
  content: string;
  post_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

// Define the optional attributes for creation
export interface CommentCreationAttributes extends Optional<CommentAttributes, 'id' | 'deleted_at'> {}

// Extend the Sequelize Model class
export class CommentModel extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public content!: string;
  public post_id!: number;
  public user_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date | null;
}


const Comment = connection1.define<CommentModel>(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey : true,
      allowNull : false,
      autoIncrement : true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: 'comment',
    timestamps: false,
    underscored: true,
    // paranoid: true
  }
)

export default Comment
