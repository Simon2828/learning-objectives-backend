// requirement
// want all lesson objectives and steps to success
// just keep achieved front end for now
// teacher_id as 1 for logged out..

// (looged in) want all lessons objectives for user

import * as mocha from "mocha";
import * as sinon from 'sinon';
const sandbox = sinon.createSandbox();
// import * as routes from '../../src/routes/routes';

const loAndStepsStub = {
"learningObjectives": {
  "byId": {
    "learningObjective1": {
      "id": "learningObjective1",
      "title": "Write an introduction.",
      "stepsToSuccess": "stepToSuccess3",
      "achieved": false
    },
    "learningObjective2": {
      "id": "learningObjective2",
      "title": "Write a build up.",
      "stepsToSuccess": "stepToSuccess5",
      "achieved": false
    },
  },
  "allIds": [
    "learningObjective1",
    "learningObjective2",
  ]
},
"stepsToSuccess": {
  "byId": {
    "stepToSuccess1": {
      "id": "stepToSuccess1",
      "stepsToSuccess": "Introduce the main character.",
      "achieved": "false"
    },
    "stepToSuccess2": {
      "id": "stepToSuccess2",
      "stepsToSuccess": "Describe the setting.",
      "achieved": "false"
    },
    "stepToSuccess3": {
      "id": "stepToSuccess3",
      "stepsToSuccess": "Use at least three adjectives.",
      "achieved": "false"
    },
    "stepToSuccess4": {
      "id": "stepToSuccess4",
      "stepsToSuccess": "Use short sentences to build tension.",
      "achieved": "false"
    },
    "stepToSuccess5": {
      "id": "stepToSuccess5",
      "stepsToSuccess": "Include an exclamation mark to show excitement.",
      "achieved": "false"
    },
    "stepToSuccess6": {
      "id": "stepToSuccess6",
      "stepsToSuccess": "Describe the main character's feelings.",
      "achieved": "false"
    },
    "stepToSuccess7": {
      "id": "stepToSuccess7",
      "stepsToSuccess": "Describe what the main character has learned.",
      "achieved": "false"
    },
    "stepToSuccess8": {
      "id": "stepToSuccess8",
      "stepsToSuccess": "Use the past tense.",
      "achieved": "false"
    },
    "stepToSuccess9": {
      "id": "stepToSuccess9",
      "stepsToSuccess": "Include time connectives.",
      "achieved": "false"
    },
    "stepToSuccess10": {
      "id": "stepToSuccess10",
      "stepsToSuccess": "Describe feelings and emotions.",
      "achieved": "false"
    },
    "stepToSuccess11": {
      "id": "stepToSuccess11",
      "stepsToSuccess": "Write in chronological order.",
      "achieved": "false"
    },
    "stepToSuccess12": {
      "id": "stepToSuccess12",
      "stepsToSuccess": "Use time connectives.",
      "achieved": "false"
    },
    "stepToSuccess15": {
      "id": "stepToSuccess15",
      "stepsToSuccess": "Include who, what, where and when",
      "achieved": "false"
    },
    "stepToSuccess16": {
      "id": "stepToSuccess16",
      "stepsToSuccess": "Describe people, places and things",
      "achieved": "false"
    }
  },
  "allIds": [
    "stepToSuccess1",
    "stepToSuccess2",
    "stepToSuccess3",
    "stepToSuccess4",
    "stepToSuccess5",
    "stepToSuccess6",
    "stepToSuccess7",
    "stepToSuccess8",
    "stepToSuccess9",
    "stepToSuccess10",
    "stepToSuccess11",
    "stepToSuccess12",
    "stepToSuccess15",
    "stepToSuccess16"
  ]
}
}

describe('Routing', () => {
  // beforeEach(function () {
//     // stub out the `hello` method
//     sandbox.stub(myAPI, 'hello');
// });

afterEach(function () {
    sandbox.restore();
});
  it('fetches all learning objectives and steps to success', async () => {
    // arrange
    // sandbox.stub(routes, 'getAllLearningObjectivesAndStepsToSuccess').resolves(loAndStepsStub)


    // data fixture
    // stub of getAllLearningObjectivesAndStepsToSuccess
    const getAllLearningObjectivesAndStepsToSuccessStub = {};

    // act

    // assert

  })
})


