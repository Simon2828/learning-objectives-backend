// https://codesandbox.io/s/github/rwieruch/node-express-server-rest-api/tree/modular-routing?file=/src/routes/message.js - helpful for how to set up routes etc.
import express from 'express'
import setupLearningObjectivesRoutes from './learningObjectives';

function setupRoutes(app: any) {
  const authRouter = express.Router()
  setupLearningObjectivesRoutes(authRouter)
  app.use('/', authRouter)
}

export default setupRoutes;
