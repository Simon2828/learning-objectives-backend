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
        id: 1,
        title: "Write an introduction.",
        stepsToSuccess: [1, 2, 3],
        achieved: false
    },
    {
        id: 2,
        title: "Write a build up.",
        stepsToSuccess: [4, 5],
        achieved: false
    },
    {
        id: 3,
        title: "Write an ending.",
        stepsToSuccess: [3,6,7],
        achieved: false
    },
    {
        id: 4,
        title: "Write an autobiography.",
        stepsToSuccess: [8,9],
        achieved: false
    },
    {
        id: 5,
        title: "Write a diary entry.",
        stepsToSuccess: [1,3,4,5,10,11,12,8],
        achieved: false
    },
    {
        id: 6,
        title: "Write a recount.",
        stepsToSuccess: [15,16,8,9],
        achieved: false
    }
  ];

  let stepsToSuccessSeed = [
       {
        id: 1,
        stepToSuccess: "Introduce the main character.",
        achieved: false
      },
       {
        id: 2,
        stepToSuccess: "Describe the setting.",
        achieved: false
      },
       {
        id: 3,
        stepToSuccess: "Use at least three adjectives.",
        achieved: false
      },
       {
        id: 4,
        stepToSuccess: "Use short sentences to build tension.",
        achieved: false
      },
       {
        id: 5,
        stepToSuccess: "Include an exclamation mark to show excitement.",
        achieved: false
      },
       {
        id: 6,
        stepToSuccess: "Describe the main character's feelings.",
        achieved: false
      },
       {
        id: 7,
        stepToSuccess: "Describe what the main character has learned.",
        achieved: false
      },
       {
        id: 8,
        stepToSuccess: "Use the past tense.",
        achieved: false
      },
       {
        id: 9,
        stepToSuccess: "Include time connectives.",
        achieved: false
      },
       {
        id: 10,
        stepToSuccess: "Describe feelings and emotions.",
        achieved: false
      },
       {
        id: 11,
        stepToSuccess: "Write in chronological order.",
        achieved: false
      },
       {
        id: 12,
        stepToSuccess: "Use time connectives.",
        achieved: false
      },
       {
        id: 13,
        stepToSuccess: "Begin the direct speech with a capital letter",
        achieved: false
      },
       {
        id: 14,
        stepToSuccess: "Use lowercase letters when....",
        achieved: false
      },
       {
        id: 15,
        stepToSuccess: "Include who, what, where and when",
        achieved: false
      },
       {
        id: 16,
        stepToSuccess: "Describe people, places and things",
        achieved: false
      },
       {
        id: 17,
        stepToSuccess: "todo",
        achieved: false
      }
    ];

  module.exports = {
    learningObjectives: learningObjectivesSeed,
    stepsToSuccess: stepsToSuccessSeed
  }