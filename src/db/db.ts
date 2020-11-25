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

export const addLearningObjective = async (title: any, achieved = false, teacherId = 1) => {
  const text = `
                INSERT INTO learning_objectives(title, achieved, teacher_id)
                VALUES($1, $2, $3);
                SELECT learning_objectives.learning_objective_id FROM learning_objectives ORDER BY learning_objective_id DESC LIMIT 1;
                `
  const values = [title, achieved, teacherId];
  try {
    await dbClient.query(text, values);
   }
  catch (err) {
   console.log(err.stack)
 }
}

// INSERT INTO steps_to_success(step_to_success, achieved, teacher_id)
// VALUES($4, $2, $3);

// need to have multiple functions to run multiple commands ( so don't think i can add learningObjectives and steps to success in one function call)
// pq: cannot insert multiple commands into a prepared statement - https://github.com/lib/pq/issues/928
// This is a limitation of postgres, not pq. You can only have a single query if you are using parameters.


export const addStepsToSuccess = async (titles: string[], achieved = false, teacherId = 1) => {
  return Promise.all(titles.map(stepToSuccess => {
    const text = `INSERT INTO steps_to_success(step_to_success, achieved, teacher_id)
                  VALUES($1, $2, $3)`
    const values = [stepToSuccess, achieved, teacherId];
    callDb(text, values);
  }));
}

async function callDb (text, values) {
  try {
    await dbClient.query(text, values);
   }
  catch (err) {
   console.log(err.stack)
  }

}

export const addLearningStepsIds = async (loId: number, stepToSuccessIds: number[]) => {
  return Promise.all(stepToSuccessIds.map(stepToSuccessId => {
    const text = `INSERT INTO learning_steps(learning_objective_id, step_to_success_id)
                  VALUES($1, $2)`

    const values = [loId, stepToSuccessId];
    callDb(text, values);
    // use limit desc... or something similar to return last loId and latest stepids...
    // TODO - SELECT learning_objectives.learning_objective_id FROM learning_objectives ORDER BY learning_objective_id DESC LIMIT 1;
    // ***use this https://node-postgres.com/features/transactions??? for multiple queries***

}));
}
// add both learningObjective and steps to success
// promise.all then update,
// return the learning objective and the step to success to then update learning_steps

// adds into learning ob - must include step to success - logic on frontend?
