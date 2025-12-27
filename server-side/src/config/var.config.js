import dotenv from 'dotenv'

dotenv.config();

class Config {
    #sql_server;
    #sql_db;
    #sql_user;
    #sql_password;
    #sql_port;
    #mongo_uri;

    constructor () {
        this.#sql_server = process.env.MYSQL_SERVER;
        this.#sql_user = process.env.MYSQL_USER;
        this.#sql_password = process.env.MYSQL_PASSWORD;
        this.#sql_port = process.env.MYSQL_PORT;
        this.#sql_db = process.env.MYSQL_DATABASE;
        this.#mongo_uri = process.env.MONGO_URI;
    };

    get SqlServer () {
        return this.#sql_server
    }

    get SqlPort () {
        return this.#sql_port
    }

    get SqlUser () {
        return this.#sql_user
    }

    get SqlPassword () {
        return this.#sql_password
    }

    get SqlDatabase () {
        return this.#sql_db
    }

    get MongoDb () {
        return this.#mongo_uri
    }
};

export const config = new Config();