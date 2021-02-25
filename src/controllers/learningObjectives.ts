import { createId } from './../utils/index';
import { getAllTransformedLearningObjectives } from '../models/index';
import * as db from '../db/db';
import { Request } from 'express';

const getUserIdNumber = (userId) => Number(`${userId}`.slice(-10));

export async function getAllLearningObjectives(req, res) {
  const learningObjectives = await getAllTransformedLearningObjectives();
  if (learningObjectives) {
    return res.json(learningObjectives);
  } else {
    return res.status(404).send();
  }
}

export async function addLearningObjective(req, res) {
  const dbResponse = await db.addLearningObjective(
    req.body.title,
    false,
    getUserIdNumber(req.body.userId),
    db // pass in for testing
  );

  if (dbResponse > 0) {
    return res.sendStatus(204);
  }
  return res.sendStatus(400); // incorrect error code? - what if db down?
}

export async function updateLearningObjective(req, res) {
  const dbResponse: any = await db.updateLearningObjective(
    Number(req.params.id),
    req.body.title,
    getUserIdNumber(req.body.userId)
  );
  console.log(
    '🚀 ~ file: learningObjectives.ts ~ line 25 ~ updateLearningObjective ~ response',
    dbResponse
  );
  if (dbResponse.rowCount > 0) {
    return res.sendStatus(204);
  } else {
    return res.status(400).send();
  }
}

// export default learningObjectivesController()
