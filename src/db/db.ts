import { LearningObjective } from './db';
import { Pool } from "pg";
import _, { camelCase } from "lodash";

import postgresCredentials from "../../credentials.json";
const connectionString = postgresCredentials.postgres.connectionString;
const dbClient = new Pool({ connectionString });

interface LearningObjectiveBasics {
  learning_objective_id: string;
  title: string;
  achieved: boolean;
}

interface LearningObjectiveTeacher extends LearningObjectiveBasics {
  teacherId: number;
}

interface LearningObjectiveStudent extends LearningObjectiveBasics {
  student_id: number;
}

// const stepsArray: any[] = [];

export type LearningObjective =
  | LearningObjectiveStudent
  | LearningObjectiveTeacher;

export const getAllLearningObjectives = async () => {
  const { rows } = await dbClient.query(`
    SELECT learning_objectives.title AS lo, steps_to_success.step_to_success AS step,
    learning_objectives.learning_objective_id AS lo_id, steps_to_success.step_to_success_id AS step_id,
    learning_objectives.achieved AS lo_achieved
    FROM learning_steps
      INNER JOIN learning_objectives
        ON learning_steps.learning_objective_id = learning_objectives.learning_objective_id
      INNER JOIN steps_to_success
        ON learning_steps.step_to_success_id = steps_to_success.step_to_success_id;


  `);
    return rows;
}

export const addLearningObjective = async ({learningObjectiveId, title, achieved, teacherId}) => {
  // need to get learning objective id from state on front end... or make learning_objective_id unique primary key
  const text = `INSERT INTO learning_objectives(learning_objective_id, title, achieved, false, teacher_id)
                VALUES($1, $2, $3, $4, $5)`
  const values = [learningObjectiveId, title, achieved, teacherId];
  try {
    await dbClient.query(text, values);
   }
  catch (err) {
   console.log(err.stack)
 }
}