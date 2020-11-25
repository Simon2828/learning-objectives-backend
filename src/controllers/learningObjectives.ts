import {getAllTransformedLearningObjectives} from '../models/index';
// need to pass in getAllTransformedLearningObjectives as dependency injection
// for testing? Or it should be a method of

// class learningObjectivesController {

// } // ? should i make a class here?

export async function getAllLearningObjectives (req: {}, res: { (): any; json?: any; status?: any; }) {
  const learningObjectives = await getAllTransformedLearningObjectives();
  if (learningObjectives) {
    return res.json({learningObjectives});
  } else {
    return res.status(404).send();
  }

}

// export default learningObjectivesController()