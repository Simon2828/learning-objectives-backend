// TODO can i turn these into esm with import?
// rename name of directory and commit to github
// remove backend directory from lesson-objectives
// delete lesson-objectives-backend

// const express = require("express");
import express from "express";
import * as bodyParser from "body-parser";
const multiparty = require("multiparty");
const cors = require("cors");

// const handlers = require("./lib/handlers");

const credentials = require("./credentials");

require("./db");

const app = express();

app.use("/api", cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3033;

app.use(express.static(__dirname + "/public"));

// app.get("/api/vacations", handlers.getVacationsApi);
// app.get("/api/vacation/:sku", handlers.getVacationBySkuApi);
// app.post(
//   "/api/vacation/:sku/notify-when-in-season",
//   handlers.addVacationInSeasonListenerApi
// );
// app.delete("/api/vacation/:sku", handlers.requestDeleteVacationApi);

if (require.main === module) {
  //  work out what this does...
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        "; press Ctrl-C to terminate."
    );
  });
} else {
  module.exports = app;
}
