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


//   return rows.map((row) => {
//     console.log("getAllLearningObjectives -> row", row)

//     return _.mapKeys(row, (value, key) => {
//       return _.camelCase(key);
//     });
//   }).reduce((acc, curr, i) => {
//     console.log('acc: ', acc)
//     // logic for if acc.loId = curr.loId, then don't update acc.loId, but do push to stepIds
//     acc = {
//       learningObjectives: {
//         byId: {
//           [acc.loId]: {
//             id:''

//           }
//         }
//       }
//     };
//     // acc.learningObjectives.byId = acc.loId;
//     return acc;
// });
}