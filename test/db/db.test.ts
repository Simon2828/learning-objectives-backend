import { chain } from "lodash";
import { getAllLearningObjectives } from "./../../src/db/db";
import { assert } from 'chai';
import { LearningObjective } from '../../src/db/db';

const data = [
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
  {
    "lo": "Write a build up.",
    "step": "Use short sentences to build tension.",
    "loId": "learningObjective2",
    "stepId": "stepToSuccess4",
    "loAchieved": false
  },
  {
    "lo": "Write a build up.",
    "step": "Include an exclamation mark to show excitement.",
    "loId": "learningObjective2",
    "stepId": "stepToSuccess5",
    "loAchieved": false
  },
  {
    "lo": "Write an ending.",
    "step": "Use at least three adjectives.",
    "loId": "learningObjective3",
    "stepId": "stepToSuccess3",
    "loAchieved": false
  },
  {
    "lo": "Write an ending.",
    "step": "Describe the main character's feelings.",
    "loId": "learningObjective3",
    "stepId": "stepToSuccess6",
    "loAchieved": false
  },
  {
    "lo": "Write an ending.",
    "step": "Describe what the main character has learned.",
    "loId": "learningObjective3",
    "stepId": "stepToSuccess7",
    "loAchieved": false
  },
  {
    "lo": "Write an autobiography.",
    "step": "Use the past tense.",
    "loId": "learningObjective4",
    "stepId": "stepToSuccess8",
    "loAchieved": false
  },
  {
    "lo": "Write an autobiography.",
    "step": "Include time connectives.",
    "loId": "learningObjective4",
    "stepId": "stepToSuccess9",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Introduce the main character.",
    "loId": "learningObjective5",
    "stepId": "stepToSuccess1",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Describe the setting.",
    "loId": "learningObjective5",
    "stepId": "stepToSuccess2",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Use at least three adjectives.",
    "loId": "learningObjective5",
    "stepId": "stepToSuccess3",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Use short sentences to build tension.",
    "loId": "learningObjective5",
    "stepId": "stepToSuccess4",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Include an exclamation mark to show excitement.",
    "loId": "learningObjective5",
    "stepId": "stepToSuccess5",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Describe feelings and emotions.",
    "loId": "learningObjective5",
    "stepId": "stepToSuccess10",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Write in chronological order.",
    "loId": "learningObjective5",
    "stepId": "stepToSuccess11",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Use time connectives.",
    "loId": "learningObjective5",
    "stepId": "stepToSuccess12",
    "loAchieved": false
  },
  {
    "lo": "Write a diary entry.",
    "step": "Use the past tense.",
    "loId": "learningObjective5",
    "stepId": "stepToSuccess8",
    "loAchieved": false
  },
  {
    "lo": "Write a recount.",
    "step": "Include who, what, where and when",
    "loId": "learningObjective6",
    "stepId": "stepToSuccess15",
    "loAchieved": false
  },
  {
    "lo": "Write a recount.",
    "step": "Describe people, places and things",
    "loId": "learningObjective6",
    "stepId": "stepToSuccess16",
    "loAchieved": false
  },
  {
    "lo": "Write a recount.",
    "step": "Use the past tense.",
    "loId": "learningObjective6",
    "stepId": "stepToSuccess8",
    "loAchieved": false
  },
  {
    "lo": "Write a recount.",
    "step": "Include time connectives.",
    "loId": "learningObjective6",
    "stepId": "stepToSuccess9",
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
      "stepToSuccess13": {
        id: "stepToSuccess13",
        stepToSuccess: "Begin the direct speech with a capital letter",
        achieved: false
      },
      "stepToSuccess14": {
        id: "stepToSuccess14",
        stepToSuccess: "Use lowercase letters when....",
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
      "stepToSuccess17": {
        id: "stepToSuccess17",
        stepToSuccess: "todo",
        achieved: false
      },
    },
    allIds: ["stepToSuccess1", "stepToSuccess2", "stepToSuccess3", "stepToSuccess4", "stepToSuccess5", "stepToSuccess6", "stepToSuccess7", "stepToSuccess8","stepToSuccess9", "stepToSuccess10", "stepToSuccess11", "stepToSuccess12", "stepToSuccess13", "stepToSuccess14", "stepToSuccess15", "stepToSuccess16","stepToSuccess17"]
  }
}


describe("database", () => {
  it.only("should fetch all learning objectives", async () => {
    const lOs  = await getAllLearningObjectives();
    console.log(JSON.stringify(lOs, null, 2))
    assert.isObject(lOs.learningObjectives.byId);
    // assert.equal(lOs.learningObjectives.byId///// update this .....)
  });
});
