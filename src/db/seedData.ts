// import { learningObjectivesSeed } from './seedData';
// interface learningObjectivesSeedConfig {
//   id: string,
//   title: string,
//   stepsToSuccess?: string[],
//   achieved: boolean
// }
// const learningObjectivesSeed: learningObjectivesSeedConfig[] = [
  let learningObjectivesSeed = [
    {
        id: "learningObjective1",
        title: "Write an introduction.",
        stepsToSuccess: ["stepToSuccess1", "stepToSuccess2", "stepToSuccess3"],
        achieved: false
    },
    {
        id: "learningObjective2",
        title: "Write a build up.",
        stepsToSuccess: ["stepToSuccess4", "stepToSuccess5"],
        achieved: false
    },
    {
        id: "learningObjective3",
        title: "Write an ending.",
        stepsToSuccess: ["stepToSuccess3","stepToSuccess6","stepToSuccess7"],
        achieved: false
    },
    {
        id: "learningObjective4",
        title: "Write an autobiography.",
        stepsToSuccess: ["stepToSuccess8","stepToSuccess9"],
        achieved: false
    },
    {
        id: "learningObjective5",
        title: "Write a diary entry.",
        stepsToSuccess: ["stepToSuccess1","stepToSuccess2","stepToSuccess3","stepToSuccess4","stepToSuccess5","stepToSuccess10","stepToSuccess11","stepToSuccess12","stepToSuccess8"],
        achieved: false
    },
    {
        id: "learningObjective6",
        title: "Write a recount.",
        stepsToSuccess: ["stepToSuccess15","stepToSuccess16","stepToSuccess8","stepToSuccess9"],
        achieved: false
    }
  ];

  let stepsToSuccessSeed = [
       {
        id: "stepToSuccess1",
        stepToSuccess: "Introduce the main character.",
        achieved: false
      },
       {
        id: "stepToSuccess2",
        stepToSuccess: "Describe the setting.",
        achieved: false
      },
       {
        id: "stepToSuccess3",
        stepToSuccess: "Use at least three adjectives.",
        achieved: false
      },
       {
        id: "stepToSuccess4",
        stepToSuccess: "Use short sentences to build tension.",
        achieved: false
      },
       {
        id: "stepToSuccess5",
        stepToSuccess: "Include an exclamation mark to show excitement.",
        achieved: false
      },
       {
        id: "stepToSuccess6",
        stepToSuccess: "Describe the main character's feelings.",
        achieved: false
      },
       {
        id: "stepToSuccess7",
        stepToSuccess: "Describe what the main character has learned.",
        achieved: false
      },
       {
        id: "stepToSuccess8",
        stepToSuccess: "Use the past tense.",
        achieved: false
      },
       {
        id: "stepToSuccess9",
        stepToSuccess: "Include time connectives.",
        achieved: false
      },
       {
        id: "stepToSuccess10",
        stepToSuccess: "Describe feelings and emotions.",
        achieved: false
      },
       {
        id: "stepToSuccess11",
        stepToSuccess: "Write in chronological order.",
        achieved: false
      },
       {
        id: "stepToSuccess12",
        stepToSuccess: "Use time connectives.",
        achieved: false
      },
       {
        id: "stepToSuccess13",
        stepToSuccess: "Begin the direct speech with a capital letter",
        achieved: false
      },
       {
        id: "stepToSuccess14",
        stepToSuccess: "Use lowercase letters when....",
        achieved: false
      },
       {
        id: "stepToSuccess15",
        stepToSuccess: "Include who, what, where and when",
        achieved: false
      },
       {
        id: "stepToSuccess16",
        stepToSuccess: "Describe people, places and things",
        achieved: false
      },
       {
        id: "stepToSuccess17",
        stepToSuccess: "todo",
        achieved: false
      }
    ];

  module.exports = {
    learningObjectives: learningObjectivesSeed,
    stepsToSuccess: stepsToSuccessSeed
  }