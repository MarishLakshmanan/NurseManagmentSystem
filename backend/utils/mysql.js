import mysql from "mysql";

class MySQL {
  #connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "nurse",
  });

  start() {
    this.#connection.connect((err) => {
      if (err) console.log(err);
      else console.log("DB Connected Successfully");
    });
  }

  executeQuery(query, params) {
    connection.query(query, params, function (error, results, fields) {
      if (error) throw error;
      // connected!
    });
  }

  stop() {
    this.#connection.end("DB Disconnected");
  }
}

export default MySQL;
