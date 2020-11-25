import * as sinon from 'sinon';
import { assert } from 'chai';

import * as learningObjectivesController from '../../src/controllers/learningObjectives';
import {transformedLearningObjectives} from '../fixtures/transformedLearningObjectives';
import { getAllTransformedLearningObjectives } from '../../src/models';

// update any type...

// interface Response {
//   status : number;
//   json: string;
// }
const sandbox = sinon.createSandbox();

it.only('getAllLearningObjectives returns all learning objectives in the database', async () => {
  let transformedLearningObjectivesStub = sandbox.stub().resolves();
  transformedLearningObjectivesStub = sandbox.stub(getAllTransformedLearningObjectives).resolves(transformedLearningObjectives);
  // console.log("transformedLearningObjectivesStub", JSON.stringify(transformedLearningObjectivesStub))

  // arrange
  const req = {};
  const mockResponse = () => {
    const res : any= {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
  };

  // act
  const learningObjectives = await learningObjectivesController.getAllLearningObjectives(req, mockResponse)

  // assert
  assert.deepEqual(learningObjectives, transformedLearningObjectives);


})