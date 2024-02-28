import "dotenv/config";
import express from "express";
import Nurse from "./model/nurse.js";
import MySQL from "./utils/mysql.js";
const app = express();

const mysql = new MySQL();

app.get("/", (req, res) => {
  //   const nurse = new Nurse(1, "Sakthi", 123123, Date.now(), 21);
  //   console.log(nurse.print());
  //   res.send(nurse.convert());

  res.send("Hello world");
});

app.listen(process.env.port || 3000, () => {
  console.log(`Server is listening on ${process.env.port}`);
});
