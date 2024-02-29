import mysql from "mysql";
import logger from "./logger.js";

class MySQL {
  #connection = mysql.createConnection({
    host: process.env.host || "localhost",
    user: process.env.user || "root",
    password: process.env.password || "rootroot",
    database: process.env.database || "nurse",
  });

  mysqlErrorCodes = {
    ER_DUP_KEY: "Duplicate entry error",
    ER_DUP_ENTRY: "Duplicate entry error",
    ER_DATA_TOO_LONG: "Data too long for column",
    ER_BAD_FIELD_ERROR: "Unknown column in field list",
    ER_CONNECTION_DOESNT_EXIST: "Connection does not exist",
    ER_ACCESS_DENIED_ERROR: "Access denied for user",
  };

  start() {
    this.#connection.connect((err) => {
      if (err) {
        logger.error(err.message);
        return;
      }
      logger.info("DB Connected Successfully");
    });
  }

  executeQuery(query, params) {
    const p = new Promise((resolve, reject) => {
      this.#connection.query(query, params, function (error, results, fields) {
        if (error) {
          logger.error(error.message);
          logger.error(error.code);
          reject(error.code);
          return;
        }
        logger.info("Query Executed");
        resolve(true);
      });
    });
    return p;
  }

  getAll() {
    const p = new Promise((resolve, reject) => {
      this.#connection.query(
        "SELECT * FROM nurse",
        function (error, results, fields) {
          if (error) {
            logger.error(error.message);
            logger.error(error.code);
            reject(error.code);
            return;
          }
          resolve(results);
        }
      );
    });
    return p;
  }

  stop() {
    this.#connection.end();
    logger.info("DB Disconnected");
  }
}

export default MySQL;
