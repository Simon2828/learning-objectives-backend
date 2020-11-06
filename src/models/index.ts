import * as db from '../db/db';
import _, { camelCase } from "lodash";

// TODO add typescript shape for acc?

// TODO - update Promise<any>
export async function transformLearningObjectives(): Promise<any> {
  const rows = await db.getAllLearningObjectives()

  return rows.map((row) => {
   return _.mapKeys(row, (value, key) => {
     return _.camelCase(key);
   });
 }).reduce((acc, curr, i) => {
    if (!acc.learningObjectives.allIds.includes(curr.loId) && i > 0) {
      acc.learningObjectives.byId = { ...acc.learningObjectives.byId, [curr.loId] : {
        stepsToSuccess: [],
        id: curr.loId
      }
    }
  }

  if (curr.loId === acc.learningObjectives.byId[curr.loId].id || i === 0) {
     acc.learningObjectives.byId[curr.loId].title = curr.lo;
     acc.learningObjectives.byId[curr.loId].achieved = curr.loAchieved;
     acc.learningObjectives.byId[curr.loId].id = curr.loId;

     acc.learningObjectives.byId[curr.loId].stepsToSuccess = [...acc.learningObjectives.byId[curr.loId].stepsToSuccess, curr.stepId];
     if (!acc.learningObjectives.allIds.includes(curr.loId)) {
       acc.learningObjectives.allIds = [...acc.learningObjectives.allIds, curr.loId];
     }
   }

   // check if step to success id is already in allIds
   if (!acc.stepsToSuccess.allIds.includes(curr.stepId)) {
    acc.stepsToSuccess.byId = {
      ...acc.stepsToSuccess.byId, [curr.stepId] : {
        id: curr.stepId,
        stepToSuccess: curr.step,
        achieved: false
      }
    }
    acc.stepsToSuccess.allIds = [...acc.stepsToSuccess.allIds, curr.stepId];
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
  }
});

}

