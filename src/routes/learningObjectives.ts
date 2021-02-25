// import { Router } from 'express';
import { Router } from 'express-serve-static-core';
import * as learningObjectivesController from '../controllers/learningObjectives';

function setupLearningObjectivesRoutes(router: Router) {
  router.get('/', learningObjectivesController.getAllLearningObjectives);

  router.post('/update/learning-objective/:id', learningObjectivesController.updateLearningObjective);

  router.post('/add/learning-objective', learningObjectivesController.addLearningObjective);
}

export default setupLearningObjectivesRoutes;