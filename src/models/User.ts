import '../util/initEnv'

import { connection1 } from '../util/database'
import { DataTypes, Model, Optional } from 'sequelize'
import JWT from 'jsonwebtoken'

// Define the attributes for the User model
export interface UserAttributes {
  id: number;
  username: string;
  name: string;
  password: string;
  email: string;
  level: number;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

// Define the optional attributes for creation
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'deleted_at'> {}

// Extend the Sequelize Model class
export class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public name!: string;
  public password!: string;
  public email!: string;
  public level!: number;
  public avatar!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date | null;
}


const User = connection1.define<UserModel>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey : true,
      allowNull : false,
      autoIncrement : true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER // auto value is 0 for basic membership
    },
    avatar: {
      type: DataTypes.STRING,
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
    tableName: 'user',
    timestamps: false,
    underscored: true,
    // paranoid: true
  }
)

export default User
