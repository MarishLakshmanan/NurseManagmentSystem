import "dotenv/config";
import express from "express";
import Nurse from "./model/nurse.js";
import MySQL from "./utils/mysql.js";
import logger from "./utils/logger.js";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const mysql = new MySQL();
mysql.start();

app.get("/nurse", async (req, res) => {
  try {
    const result = await mysql.getAll();
    logger.info("Got Data");
    res.send(result);
  } catch (e) {
    logger.error(e);
    res.send(mysql.mysqlErrorCodes[e]);
  }
});

app.post("/nurse", async (req, res) => {
  const payload = req.body;
  const nurse = new Nurse(
    payload.license,
    payload.name,
    payload.dob,
    payload.age
  );
  try {
    const result = await nurse.save(mysql);
    logger.info("Data Inserted");
    res.send(200);
  } catch (e) {
    logger.error(e);
    res.send(mysql.mysqlErrorCodes[e]);
  }
});

app.patch("/nurse", async (req, res) => {
  const payload = req.body;

  const nurse = new Nurse(
    payload.license,
    payload.name,
    payload.dob,
    payload.age
  );
  try {
    const result = await nurse.update(mysql);
    logger.info("Data Updated");
    res.send(200);
  } catch (e) {
    logger.error(e);
    res.send(mysql.mysqlErrorCodes[e]);
  }
});

app.delete("/nurse/:id", async (req, res) => {
  const license = req.params.id;
  const nurse = new Nurse();
  try {
    const result = await nurse.delete(mysql, license);
    logger.info("Data Deleted");
    res.send(200);
  } catch (e) {
    logger.error(e);
    res.send(mysql.mysqlErrorCodes[e]);
  }
});

app.listen(process.env.port || 3000, () => {
  logger.info(`Server is listening on ${process.env.port}`);
});

// const nurse = new Nurse(83469, "Sakthi", new Date(), 21);
//   try {
//     const result = await nurse.save(mysql);
//     console.log(result);
//   } catch (e) {
//     console.log(e);
//     logger.error(mysql.mysqlErrorCodes[e]);
//   }
//   res.send(nurse.convert());
