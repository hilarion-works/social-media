
import * as dbs from '../util/database'
// import { SequelizeHelper } from 'sequelize-utility'
// import { Sequelize } from 'sequelize'
// const dbHelper = new SequelizeHelper(dbs, Sequelize)

import User from './User'
import Post from './Post'
import Comment from './Comment'

Post.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
Post.hasMany(Comment, { as: 'comments', foreignKey: 'post_id' });

Comment.belongsTo(Post, { foreignKey: 'post_id' });
Comment.belongsTo(User, { as: 'user_comment', foreignKey: 'user_id' });

User.hasMany(Post, { foreignKey: 'user_id' });
User.hasMany(Comment, { as: 'user_comments', foreignKey: 'user_id' });


export {
    User,
    Post,
    Comment,
}