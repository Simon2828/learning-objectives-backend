import { Pool } from 'pg';
import _, { camelCase } from 'lodash';
import 'regenerator-runtime/runtime.js';
import postgresCredentials from '../../credentials.json';
const connectionString = postgresCredentials.postgres.connectionString;
export const dbClient: DB = new Pool({ connectionString });

interface DB {
  query: (sql: string, values: any[]) => any;
}

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

export const getAllLearningObjectives = async () => {  // teacherId = 10  - add param
  const text = `
    SELECT learning_objectives.title AS lo, steps_to_success.step_to_success AS step,
    learning_objectives.learning_objective_id AS lo_id, steps_to_success.step_to_success_id AS step_id,
    learning_objectives.achieved AS lo_achieved
    FROM learning_steps
      INNER JOIN learning_objectives
        ON learning_steps.learning_objective_id = learning_objectives.learning_objective_id
      INNER JOIN steps_to_success
        ON learning_steps.step_to_success_id = steps_to_success.step_to_success_id;
  `;
//     WHERE learning_objectives.teacher_id in (1, ($1));  - add to above or similar

  const values = [];
  // try {
  const { rows } = await dbClient.query(text, values);
  console.log({rows})
  return rows;
  // }
  // catch (err) {
  //   console.log(err.stack);
  // }
};

// added db = dbClient instead of doing dependency injection for testing.. refactor if it works
// SELECT learning_objectives.learning_objective_id FROM learning_objectives ORDER BY learning_objective_id DESC LIMIT 1;

export const addLearningObjective = async (
  title: string,
  achieved = false,
  teacherId,
  db // pass in for testing
) => {
  const text = `
                INSERT INTO learning_objectives(title, achieved, teacher_id)
                VALUES($1, $2, $3);
                `;
  const values = [title, achieved, teacherId];
  try {
    const { rowCount } = await dbClient.query(text, values); // assign to {rowCount} to check The number of rows processed by the last command. - for testing - better way? return loId
    return rowCount;
  } catch (err) {
    console.log(err.stack);
  }
};

// INSERT INTO steps_to_success(step_to_success, achieved, teacher_id)
// VALUES($4, $2, $3);

// need to have multiple functions to run multiple commands ( so don't think i can add learningObjectives and steps to success in one function call)
// pq: cannot insert multiple commands into a prepared statement - https://github.com/lib/pq/issues/928
// This is a limitation of postgres, not pq. You can only have a single query if you are using parameters.

export const addStepsToSuccess = async (
  titles: string[],
  achieved = false,
  teacherId = 1
) => {
  return Promise.all(
    titles.map((stepToSuccess) => {
      const text = `INSERT INTO steps_to_success(step_to_success, achieved, teacher_id)
                  VALUES($1, $2, $3)`;
      const values = [stepToSuccess, achieved, teacherId];
      callDb(text, values);
    })
  );
};

export async function callDb(text: string, values: (string | number | boolean)[]) {
  try {
    return await dbClient.query(text, values);
  } catch (err) {
    console.log(err.stack);
  }
}

export const addLearningStepsIds = async (
  loId: number,
  stepToSuccessIds: number[]
) => {
  return Promise.all(
    stepToSuccessIds.map((stepToSuccessId) => {
      const text = `INSERT INTO learning_steps(learning_objective_id, step_to_success_id)
                  VALUES($1, $2)`;

      const values = [loId, stepToSuccessId];
      callDb(text, values);
      // use limit desc... or something similar to return last loId and latest stepids...
      // TODO - SELECT learning_objectives.learning_objective_id FROM learning_objectives ORDER BY learning_objective_id DESC LIMIT 1;
      // ***use this https://node-postgres.com/features/transactions??? for multiple queries***
    })
  );
};
// add both learningObjective and steps to success
// promise.all then update,
// return the learning objective and the step to success to then update learning_steps

// adds into learning ob - must include step to success - logic on frontend?

export const updateLearningObjective = async (loId: number, title: string, userId) => {
  // AND teacher_id = ($3)  - add this query or something like it
  // const values = [loId, title, userId];   - add extra parameter
  const text = `UPDATE learning_objectives SET title = ($2) WHERE learning_objective_id = ($1) RETURNING learning_objective_id;`;
  const values = [loId, title];
  console.log(
    '🚀 ~ file: db.ts ~ line 110 ~ updateLearningObjective ~ values',
    values
  );
  const response = callDb(text, values);
  console.log("🚀 ~ file: db.ts ~ line 136 ~ updateLearningObjective ~ response", response)
  return response;
  //   if (rowCount === 0) {
  //   throw new Error('Sorry, the learning objective was not updated...')
  // }
};
