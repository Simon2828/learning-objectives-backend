import {getAllTransformedLearningObjectives} from '../../src/models';
import { assert } from 'chai';
import * as sinon from 'sinon';
import * as db from '../../src/db/db';

const sandbox = sinon.createSandbox();

const data = [
  {
    "lo": "Write an introduction.",
    "step": "Introduce the main character.",
    "loId": "1",
    "stepId": "1",
    "loAchieved": false
  },
  {
    "lo": "Write an introduction.",
    "step": "Describe the setting.",
    "loId": "1",
    "stepId": "2",
    "loAchieved": false
  },
  {
    "lo": "Write an introduction.",
    "step": "Use at least three adjectives.",
    "loId": "1",
    "stepId": "3",
    "loAchieved": false
  },
  {
    "lo": "Write a build up.",
    "step": "Use short sentences to build tension.",
    "loId": "2",
    "stepId": "4",
    "loAchieved": false
  },
  {
    "lo": "Write a build up.",
    "step": "Include an exclamation mark to show excitement.",
    "loId": "2",
    "stepId": "5",
    "loAchieved": false
  },
  {
    "lo": "Write an ending.",
    "step": "Use at least three adjectives.",
    "loId": "3",
    "stepId": "3",
    "loAchieved": false
  },
  {
    "lo": "Write an ending.",
    "step": "Describe the main character's feelings.",
    "loId": "3",
    "stepId": "6",
    "loAchieved": false
  },
  {
    "lo": "Write an ending.",
    "step": "Describe what the main character has learned.",
    "loId": "3",
    "stepId": "7",
    "loAchieved": false
  },
  {
    "lo": "Write an autobiography.",
    "step": "Use the past tense.",
    "loId": "4",
    "stepId": "8",
    "loAchieved": false
  },
  {
    "lo": "Write an autobiography.",
    "step": "Include time connectives.",
    "loId": "4",
    "stepId": "9",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Introduce the main character.",
    "loId": "5",
    "stepId": "1",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Describe the setting.",
    "loId": "5",
    "stepId": "2",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Use at least three adjectives.",
    "loId": "5",
    "stepId": "3",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Use short sentences to build tension.",
    "loId": "5",
    "stepId": "4",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Include an exclamation mark to show excitement.",
    "loId": "5",
    "stepId": "5",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Describe feelings and emotions.",
    "loId": "5",
    "stepId": "10",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Write in chronological order.",
    "loId": "5",
    "stepId": "11",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Use time connectives.",
    "loId": "5",
    "stepId": "12",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Use the past tense.",
    "loId": "5",
    "stepId": "8",
    "loAchieved": false
  },
  {
    "lo": "Write a recount.",
    "step": "Include who, what, where and when",
    "loId": "6",
    "stepId": "15",
    "loAchieved": false
  },
  {
    "lo": "Write a recount.",
    "step": "Describe people, places and things",
    "loId": "6",
    "stepId": "16",
    "loAchieved": false
  },
  {
    "lo": "Write a recount.",
    "step": "Use the past tense.",
    "loId": "6",
    "stepId": "8",
    "loAchieved": false
  },
  {
    "lo": "Write a recount.",
    "step": "Include time connectives.",
    "loId": "6",
    "stepId": "9",
    "loAchieved": false
  }
]

const expected = {
  learningObjectives: {
    byId: {
      "learningObjective1": {
        id: "learningObjective1",
        title: "Write an introduction.",
        stepsToSuccess: ["stepToSuccess1", "stepToSuccess2", "stepToSuccess3"],
        achieved: false
      },
      "learningObjective2": {
        id: "learningObjective2",
        title: "Write a build up.",
        stepsToSuccess: ["stepToSuccess4", "stepToSuccess5"],
        achieved: false
      },
      "learningObjective3": {
        id: "learningObjective3",
        title: "Write an ending.",
        stepsToSuccess: ["stepToSuccess3","stepToSuccess6","stepToSuccess7"],
        achieved: false
      },
      "learningObjective4": {
        id: "learningObjective4",
        title: "Write an autobiography.",
        stepsToSuccess: ["stepToSuccess8","stepToSuccess9"],
        achieved: false
      },
      "learningObjective5": {
        id: "learningObjective5",
        title: "Write a diary entry.",
        stepsToSuccess: ["stepToSuccess1","stepToSuccess2","stepToSuccess3","stepToSuccess4","stepToSuccess5","stepToSuccess10","stepToSuccess11","stepToSuccess12","stepToSuccess8"],
        achieved: false
      },
      "learningObjective6": {
        id: "learningObjective6",
        title: "Write a recount.",
        stepsToSuccess: ["stepToSuccess15","stepToSuccess16","stepToSuccess8","stepToSuccess9"],
        achieved: false
      },
    },
    allIds: ["learningObjective1", "learningObjective2", "learningObjective3", "learningObjective4","learningObjective5","learningObjective6"]
  },

  stepsToSuccess: {
    byId: {
      "stepToSuccess1": {
        id: "stepToSuccess1",
        stepToSuccess: "Introduce the main character.",
        achieved: false
      },
      "stepToSuccess2": {
        id: "stepToSuccess2",
        stepToSuccess: "Describe the setting.",
        achieved: false
      },
      "stepToSuccess3": {
        id: "stepToSuccess3",
        stepToSuccess: "Use at least three adjectives.",
        achieved: false
      },
      "stepToSuccess4": {
        id: "stepToSuccess4",
        stepToSuccess: "Use short sentences to build tension.",
        achieved: false
      },
      "stepToSuccess5": {
        id: "stepToSuccess5",
        stepToSuccess: "Include an exclamation mark to show excitement.",
        achieved: false
      },
      "stepToSuccess6": {
        id: "stepToSuccess6",
        stepToSuccess: "Describe the main character's feelings.",
        achieved: false
      },
      "stepToSuccess7": {
        id: "stepToSuccess7",
        stepToSuccess: "Describe what the main character has learned.",
        achieved: false
      },
      "stepToSuccess8": {
        id: "stepToSuccess8",
        stepToSuccess: "Use the past tense.",
        achieved: false
      },
      "stepToSuccess9": {
        id: "stepToSuccess9",
        stepToSuccess: "Include time connectives.",
        achieved: false
      },
      "stepToSuccess10": {
        id: "stepToSuccess10",
        stepToSuccess: "Describe feelings and emotions.",
        achieved: false
      },
      "stepToSuccess11": {
        id: "stepToSuccess11",
        stepToSuccess: "Write in chronological order.",
        achieved: false
      },
      "stepToSuccess12": {
        id: "stepToSuccess12",
        stepToSuccess: "Use time connectives.",
        achieved: false
      },
      "stepToSuccess15": {
        id: "stepToSuccess15",
        stepToSuccess: "Include who, what, where and when",
        achieved: false
      },
      "stepToSuccess16": {
        id: "stepToSuccess16",
        stepToSuccess: "Describe people, places and things",
        achieved: false
      },
    },
    allIds: ["stepToSuccess1", "stepToSuccess2", "stepToSuccess3", "stepToSuccess4", "stepToSuccess5", "stepToSuccess6", "stepToSuccess7", "stepToSuccess8","stepToSuccess9", "stepToSuccess10", "stepToSuccess11", "stepToSuccess12", "stepToSuccess15", "stepToSuccess16"]
  }
}

const oneLearningObjectiveInData = [
  {
    "lo": "Write an introduction.",
    "step": "Introduce the main character.",
    "loId": "learningObjective1",
    "stepId": "stepToSuccess1",
    "loAchieved": false
  },
  {
    "lo": "Write an introduction.",
    "step": "Describe the setting.",
    "loId": "learningObjective1",
    "stepId": "stepToSuccess2",
    "loAchieved": false
  },
  {
    "lo": "Write an introduction.",
    "step": "Use at least three adjectives.",
    "loId": "learningObjective1",
    "stepId": "stepToSuccess3",
    "loAchieved": false
  },
];

const oneExpectedLearningObjective = {
  learningObjectives: {
    byId: {
      "learningObjective1": {
        id: "learningObjective1",
        title: "Write an introduction.",
        stepsToSuccess: ["stepToSuccess1", "stepToSuccess2", "stepToSuccess3"],
        achieved: false
      }
    }
  }
};

// const newLearningObjective = {
//   learningObjective = 'Write something new',
//   title = "", achieved, teacherId}

describe('model', () => {
  let allLearningObjectivesStub = sandbox.stub(db, 'getAllLearningObjectives');
  // it('should return the transformed learning objectives with one learning objective', async () => {
  //   allLearningObjectivesStub.resolves(oneLearningObjectiveInData);
  //   const transformedLearningObjectives = await getAllTransformedLearningObjectives();
  //   assert.deepEqual(transformedLearningObjectives, oneExpectedLearningObjective);
  // })

  it('should return all transformed learning objectives from the database', async () => {
    allLearningObjectivesStub.resolves(data);
    const transformedLearningObjectives = await getAllTransformedLearningObjectives();
    console.log('transformed:: ', JSON.stringify(transformedLearningObjectives, null, 2))
    assert.deepEqual(transformedLearningObjectives, expected);
  })

  it('should add a learning objective', async () => {
    const title = 'Write a great story';

    // assign to loId instead of rowCount for a better test?
    const rowCount = await db.addLearningObjective(title, false, 1, {
      query(sql: string) {
        return 1;
      }
    });
    const expectedRows = 1;
    assert.deepEqual(rowCount, expectedRows);
  })

  it('should add stepsToSuccess', async() => {
    // use actual database for now and calling the db.ts file - need to update to separate out database call??
    const title = ['Use great words', 'Use superb words', 'Use excellent words'];

    db.addStepsToSuccess(title, false, 1);

  });

  it('should add the learning objective id and the ids of its steps to success to the database', async() => {
        // use actual database for now and calling the db.ts file - need to update to separate out database call??
    // TODO logic in models/index.ts for adding learning steps ids
    db.addLearningStepsIds(7, [18, 19, 20]);
  });

  // it('should edit the learning objective title of the given learning objective id', async () => {
  //       // use actual database for now and calling the db.ts file - need to update to separate out database call??
  //   db.updateLearningObjective(1, 'Write an introduction.');
  // })
})
