import * as db from '../db/db';
import _, { camelCase } from "lodash";

interface LearningObjectivesAndStepsToSuccess {
  learningObjectives: {
    byId: {
      [id: string]: LearningObjective;
    },
    allIds: string[];
  },
  stepsToSuccess: {
    byId: {
      [id: string]: StepToSuccess
    },
    allIds: string[];
  }
};

interface StepToSuccess {
  id: string;
  stepToSuccess: string;
  achieved: boolean;
}

interface LearningObjective {
  id: string;
  title: string;
  addStepsToSuccess: string[];
  achieved: boolean;
}

// TODO - update with type using LearningObjectivesAndStepsToSuccees interface above??
export async function getAllTransformedLearningObjectives(): Promise<any> {
  const rows = await db.getAllLearningObjectives() //  ?? []; // this will override state in frontend... maybe return a fallback state the same as frontend context?

  return rows.map((row) => {
   return _.mapKeys(row, (value, key) => {
     return _.camelCase(key);
   });
 }).reduce((acc, curr, i) => {
    if (!acc.learningObjectives.allIds.includes(`learningObjective${curr.loId}`) && i > 0) {
      acc.learningObjectives.byId = { ...acc.learningObjectives.byId, [`learningObjective${curr.loId}`] : {
        stepsToSuccess: [],
        id: `learningObjective${curr.loId}`
      }
    }
  }

  if (`learningObjective${curr.loId}` === acc.learningObjectives.byId[`learningObjective${curr.loId}`].id || i === 0) {
     acc.learningObjectives.byId[`learningObjective${curr.loId}`].title = curr.lo;
     acc.learningObjectives.byId[`learningObjective${curr.loId}`].achieved = curr.loAchieved;
     acc.learningObjectives.byId[`learningObjective${curr.loId}`].id = `learningObjective${curr.loId}`;

     acc.learningObjectives.byId[`learningObjective${curr.loId}`].stepsToSuccess = [...acc.learningObjectives.byId[`learningObjective${curr.loId}`].stepsToSuccess, `stepToSuccess${curr.stepId}`];
     if (!acc.learningObjectives.allIds.includes(`learningObjective${curr.loId}`)) {
       acc.learningObjectives.allIds = [...acc.learningObjectives.allIds, `learningObjective${curr.loId}`];
     }
   }

   // check if step to success id is already in allIds
   if (!acc.stepsToSuccess.allIds.includes(`stepToSuccess${curr.stepId}`)) {
    acc.stepsToSuccess.byId = {
      ...acc.stepsToSuccess.byId, [`stepToSuccess${curr.stepId}`] : {
        id: `stepToSuccess${curr.stepId}`,
        stepToSuccess: curr.step,
        achieved: false
      }
    }
    acc.stepsToSuccess.allIds = [...acc.stepsToSuccess.allIds, `stepToSuccess${curr.stepId}`];
  }

  return acc;
}, {
  learningObjectives: {
    byId: {
      learningObjective1: {
        stepsToSuccess: []
      }
    },
    allIds: []
  },
  stepsToSuccess: {
    byId: {},
    allIds: []
  },
  searchText: ''
});

}

// to run with ts-node to get eg. log of rows

// (async () => {
//   await getAllTransformedLearningObjectives();
// })().catch(err => {
//   console.error(err);
// });
