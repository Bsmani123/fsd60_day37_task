// console.log("hi hello");

import express from "express";
import fs from "fs";
import { format } from "date-fns";
import path from "path";             // when we utilise this import -> we must give ("type":"module")
import bodyParser from "body-parser";
                                // const express = require ("express"); 
                                // const bodyParser = require("body-parser");
                                // const httpServer = express();

const app = express();
app.use(express.json());
const PORT = 5500;

app.post("/", (req, res) => {
    let today = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
      fs.writeFileSync(`DateTime/${today}.txt`, `${today}`, "utf8");
       let data = fs.readFileSync(`DateTime/${today}.txt`, "utf8");
  
  try {
    res.status(200).send(data);
  } catch (error) {
    // req.res(500).send("Internel server error");
    res.status(500).send("Internal server error");
  }

});


app.get("/getTxtFiles", (req, res) => {

  fs.readdir('DateTime', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      const textFiles = files.filter((file) => path.extname(file) === ".txt");
      res.status(200).json(textFiles);
    }
  });
});

app.listen(PORT, () => console.log(`App Listening to ${PORT}`));