import { LearningObjective } from './../../src/db/db';
import { assert } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import {transformedLearningObjectives} from '../fixtures/transformedLearningObjectives'
import setupLearningObjectivesRoutes, * as learningObjectivesController from '../../src/routes/learningObjectives'
import startServer from '../../src';
import {Router} from 'express';

const sandbox = sinon.createSandbox();
const baseUrl = 'http://localhost:3033';

// TODO: don't use any type
let app: any;

describe('learningObjectives', () => {
  beforeEach(() => {
    app = startServer();
  })

  afterEach(() => app.close());

describe('GET / : ', () => {
  it('returns all learning objectives and steps to success', async () => {
    const learningObjectives = await request(app)
      .get(`${baseUrl}/`)
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      assert.deepEqual(learningObjectives.body, transformedLearningObjectives)
  })

})


// should these tests be integration tests (like the one above but mock out db? or just have
// as unit testand mock out method in controller? like test below)


// TODO fix below...
describe('POST: /update/learning-objective/:id', () => {

  // sandbox.stub(Router.prototype, 'learningObjectivesController.updateLearningObjecive').resolves('Write a better title')
  // arrange
    // id
    const learningObjectiveId = 5;

  it('updates the learning objective when the user is logged in', async () => {
    // authorize

    // act
    const updatedLearningObjective = await request(learningObjectiveId);

    // assert
    // assert.deepEqual(updatedLearningObjective.body, )

  })

})
})