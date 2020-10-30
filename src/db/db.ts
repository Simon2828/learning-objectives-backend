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
  return rows.map((row) => {
    return _.mapKeys(row, (value, key) => {
      return _.camelCase(key);
    });
  }).reduce((acc, curr, i) => {
  //   console.log(`getAllLearningObjectives -> acc${i}`, acc)
  // console.log(`getAllLearningObjectives -> curr${i}`, curr)

  // let stepsArray = acc.stepId.concat(curr.stepId);
// console.log('stepsArray: ', stepsArray)
    acc.learningObjectives.byId[curr.loId] = {
        id: curr.loId,
        title: curr.lo,
        stepsToSuccess: [curr.stepId], // TODO:: how to update this...? use spread operator??
        achieved: curr.loAchieved
    };
    // console.log('here: ', )


    // get last element in allIds array to avoid adding duplicated loIds to allIds array
    if (acc.learningObjectives.allIds[acc.learningObjectives.allIds.length -1] !== curr.loId) {
      acc.learningObjectives.allIds.push(curr.loId);
    }
    // if (acc.learningObjectives.allIds[acc.learningObjectives.allIds.length -1] === curr.loId
    //   ) {

    // TODO - need to push curr.stepId (stepToSuccess id) to stepsToSuccess key
    // have a loop - while curr.loId does not change, push to curr.l

    // console.log("getAllLearningObjectives -> accumulatedLoIdValue", accumulatedLoIdValue)


    // let accumulatedLoIdValue ;
    // if (accumulatedLoIdValue === acc.learningObjectives.byId[curr.loId]) {
    //   accumulatedLoIdValue.stepsToSuccess.push(curr.stepId)
    // }

    // create keys to be more readable - move them higher up function
    const stepsToSuccessKeyInLearningObjectives = acc.learningObjectives.byId[curr.loId].stepsToSuccess;

    //
console.log('curr.stepId: ', curr.stepId)
console.log('acc.learningObjectives.byId ', acc.learningObjectives.byId)
    acc.learningObjectives.byId[curr.loId].stepsToSuccess.push(curr.stepId);
    // }
    acc.stepsToSuccess.byId[curr.stepId] = {
      id: curr.stepId,
      stepsToSuccess: curr.step,
      achieved: 'false'
    };

    if (acc.stepsToSuccess.allIds[acc.stepsToSuccess.allIds.length -1] !== curr.stepId) {
      if (acc.stepsToSuccess.allIds.indexOf(curr.stepId) === -1) {
        acc.stepsToSuccess.allIds.push(curr.stepId);
      }
    }
    return acc;
  }, {
      learningObjectives: {
        byId: {learningObjective1: {
          stepsToSuccess:[]
        }},
        allIds: []
      },
      stepsToSuccess: {
        byId: {},
        allIds: []
      }
    })

    // "stepToSuccess1": {
    //   id: "stepToSuccess1",
    //   stepToSuccess: "Introduce the main character.",
    //   achieved: false
    // },
    // "stepToSuccess2": {
    //   id: "stepToSuccess2",
    //   stepToSuccess: "Describe the setting.",
    //   achieved: false
    // },

  // LoId of acc equals curr add stepId to array to stepsToSuccess
  // .reduce((acc, curr, i) => {
  //   console.log({acc})
  //   if (acc.loId === curr.loId || i === 0) { // get rid off if statement - build up slowly
  //     console.log('AAA')
  //     acc.learningObjectives.byId[acc.loId] = {[curr.loId] : {
        // id: [curr.loId],
        // title: [curr.lo],
        // stepsToSuccess: [curr.stepId],
        // achieved: [curr.loAchieved]
  //     }
  //   }
  //   }
  //   return acc;
  // }, {
  //   learningObjectives: {
  //     byId: {}
  //   },
  //   stepsToSuccess: {
  //     byId: {}
  //   }
  // })
};


// byId: {
//   "learningObjective1": {
//     id: "learningObjective1",
//     title: "Write an introduction.",
//     stepsToSuccess: ["stepToSuccess1", "stepToSuccess2", "stepToSuccess3"],
//     achieved: false
//   },
//   "learningObjective2": {
//     id: "learningObjective2",
//     title: "Write a build up.",
//     stepsToSuccess: ["stepToSuccess4", "stepToSuccess5"],
//     achieved: false
//   },