import { Sequelize } from 'sequelize';
import { config } from '../config/var.config.js';


const USERNAME = config.SqlUser;
const PASSWORD = config.SqlPassword;
const SERVER = config.SqlServer
const PORT = config.SqlPort;
const DATABASE = config.SqlDatabase

export const sequelize = new Sequelize(
    DATABASE,
    USERNAME,
    PASSWORD,
    {
        host: SERVER,
        port: PORT,
        dialect: 'postgres',
        logging: false,
    }
)

export const getSqlConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection established successfully")
    } catch (error) {
        console.error("Unable to connect to PostgreSQL:", error.message);
    }
}