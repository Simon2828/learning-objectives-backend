// TODO can i turn these into esm with import?
// rename name of directory and commit to github
// remove backend directory from lesson-objectives
// delete lesson-objectives-backend

// const express = require("express");
import express from "express";
import * as bodyParser from "body-parser";
const cors = require("cors");
import setupRoutes from './routes';

// const handlers = require("./lib/handlers");
// const credentials = require("./credentials");
// require("./db");

// putting in function so can use in tests
// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
export default function startServer() {
  const app = express();

  app.use("/", cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const port = process.env.PORT || 3033;

  app.use(express.static(__dirname + "/public"));

  setupRoutes(app)

  const server:any = app.listen(port, () => {
    // logger.info(`Listening on port ${server.address().port}`)
    console.log(`Express started on http://localhost:${port}`)
    const originalClose = server.close.bind(server)
    server.close = () => {
      return new Promise(resolveClose => {
        originalClose(resolveClose)
      })
    }
    return server
  })

  // if (require.main === module) {
  //   //  work out what this does...
  //   app.listen(port, () => {
  //     console.log(
  //       `Express started on http://localhost:${port}` +
  //         "; press Ctrl-C to terminate."
  //     );
  //   });
  // } else {
  //   module.exports = app;
  // }
}

startServer();