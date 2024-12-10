require('dotenv').config()
import './initEnv'

// import { debugDB } from './debug'
import { Sequelize } from 'sequelize'

const db_name = process.env.DB_NAME
const username = process.env.DB_USERNAME
const password = process.env.DB_PASS
const host = process.env.DB_HOST

// Replace with your database credentials
export const connection1 = new Sequelize(db_name || '', username || '', password || '', {
  host: host,
  dialect: 'postgres', // Use 'mysql' for MySQL databases
  port: 5432,
  logging: false,  // Disable SQL query logging (optional)
  dialectOptions: {
    connectTimeout: 10000,  // Optional: set connection timeout
    // allowPublicKeyRetrieval: true, // Enable public key retrieval
  },
});

