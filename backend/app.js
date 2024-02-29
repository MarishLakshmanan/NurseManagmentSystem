import "dotenv/config";
import express from "express";
import Nurse from "./model/nurse.js";
import MySQL from "./utils/mysql.js";
import logger from "./utils/logger.js";
const app = express();

const mysql = new MySQL();
mysql.start();

app.get("/", async (req, res) => {
  const nurse = new Nurse(83469, "Sakthi", new Date(), 21);
  try {
    const result = await nurse.save(mysql);
    console.log(result);
  } catch (e) {
    console.log(e);
    logger.error(mysql.mysqlErrorCodes[e]);
  }
  res.send(nurse.convert());
});

app.listen(process.env.port || 3000, () => {
  logger.info(`Server is listening on ${process.env.port}`);
});
