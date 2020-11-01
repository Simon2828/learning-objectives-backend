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
console.log('acc::', JSON.stringify(acc, null, 2))
console.log('curr::', curr)
// https://stackoverflow.com/questions/32722435/push-wont-work-as-expected-in-reduce

   // acc.learningObjectives.byId = acc.loId;)

  //  let loIdInCurr = acc.learningObjectives.byId[curr.loId];

  //   if (loIdInCurr !== curr.loId) {
  //     acc.learningObjectives.byId = { [curr.loId] : {
  //       stepsToSuccess: []
  //     }
  //   }
  // }
  // console.log('acc.learningObjectives.byId[curr.loId]: ', acc.learningObjectives.byId[curr.loId])

  // searchh

  // let loId: string | undefined = acc.learningObjectives?.byId[curr.loId].id;


  if (curr.loId === acc.learningObjectives.byId[curr.loId].id || i === 0) {
     //TODO - else logic for new curr.loId
     acc.learningObjectives.byId[curr.loId].title = curr.lo;
     acc.learningObjectives.byId[curr.loId].achieved = curr.loAchieved;
     acc.learningObjectives.byId[curr.loId].id = curr.loId;
     acc.learningObjectives.byId[curr.loId].stepsToSuccess = [...acc.learningObjectives.byId.learningObjective1.stepsToSuccess, curr.stepId];
    acc.learningObjectives.allIds = [...acc.learningObjectives.allIds, curr.loId]; // TODO - allIds filter...
   }

  //  else {
  //   acc.learningObjectives.byId[curr.loId].title = curr.lo;
  //   acc.learningObjectives.byId[curr.loId].achieved = curr.loAchieved;
  //   acc.learningObjectives.byId[curr.loId].id = curr.loId;
  //   acc.learningObjectives.byId[curr.loId].stepsToSuccess = [...acc.learningObjectives.byId.learningObjective1.stepsToSuccess, curr.stepId];
  //  }
  //  console.log('acc: ', JSON.stringify(acc, null, 2));
  return acc;
}, {
  learningObjectives: {
    byId: {
      learningObjective1: {
        stepsToSuccess: []
      }
    },
    allIds: []
  }
});

}

