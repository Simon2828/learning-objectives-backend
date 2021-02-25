import { updateLearningObjective } from './../../src/db/db';
import * as sinon from 'sinon';
import { assert } from 'chai';

import * as learningObjectivesController from '../../src/controllers/learningObjectives';
import { transformedLearningObjectives } from '../fixtures/transformedLearningObjectives';
import * as model from '../../src/models';
import { repeat, rest } from 'lodash';
import * as db from '../../src/db/db';
import { QueryResult } from 'pg';

const sandbox = sinon.createSandbox();

afterEach(() => {
  console.log('here in afterEach')
  sandbox.restore();
});

describe('getAllLearningObjectives', () => {
  it('returns all learning objectives in the database', async () => {
    sandbox
      .stub(model, 'getAllTransformedLearningObjectives')
      .resolves(transformedLearningObjectives);

    const req = {}; // as Partial<Request>;

    const mockResponse = () => {
      const res = {}; //as Partial<Response>;
      Object.assign(res, {
        status: sinon.stub().returns(res),
        json: sinon.stub().returns(res),
      });
      return res;
    };

    const res: any = mockResponse();
    await learningObjectivesController.getAllLearningObjectives(req, res);

    sandbox.assert.calledWith(res.json, transformedLearningObjectives);
  });
});

describe('addLearningObjective', () => {
  it('adds a new learning objective', async () => {
    const dbResponse = 1; // as QueryResult<any>;
    sandbox.stub(db, 'addLearningObjective').resolves(dbResponse);
    const req: any = {};
    req.params = { userId: 321 };
    req.body = {
      title: 'A new learning objective',
      loId: 123,
    };
    const res: any = {};
    res.json = sandbox.stub().returns(res);
    res.sendStatus = sandbox.stub().returns(res);

    await learningObjectivesController.addLearningObjective(req, res);

    sandbox.assert.calledWith(res.sendStatus, 204);
  });
});

describe('updateLearningObjective', () => {
  it('updates the learning objective with the given changes', async () => {
    const dbResponse = { rowCount: 1 } as QueryResult<any>;
    sandbox.stub(db, 'updateLearningObjective').resolves(dbResponse);
    const req: any = {};

    req.params = { id: 20 };
    req.body = { title: 'An updated learning objective' };

    const res: any = {};
    res.json = sandbox.stub().returns(res);
    res.sendStatus = sandbox.stub().returns(res);

    await learningObjectivesController.updateLearningObjective(req, res);


    // sandbox.stub(db, 'updateLearningObjective').calledWithExactly()
    sandbox.assert.calledWith(res.sendStatus, 204);
    // sandbox.assert.calledWith(res.json, )  need to add a fixture?
  });

  // if it wasn't written by user, create new lo in db

  context('when the learning objective is not written by the user', () => {
    it('creates a new learning objective', async () => {
      const userId = '1234';
      const title = 'Write a story';
      const req = {}; //({} as any) as Request;
      const res = {};

      await learningObjectivesController.updateLearningObjective(req, res)

      // TODO
    });
  });

  // it('updateLearningObjective returns a 404 if made to a non-existing learning objective', async () => {
  //   sandbox.stub(db, 'updateLearningObjective').resolves();
  //   const req: any = {};
  //   req.params = {id: 1.5}
  //   req.body = {title : 'A non-existing learning objective'}

  //   const res: any = {};
  //   res.json = sandbox.stub().returns(res);
  //   res.sendStatus = sandbox.stub().returns(res);

  //   await learningObjectivesController.updateLearningObjective(req.params.id, req.body.title);

  //   sandbox.assert.calledWith(res.sendStatus(404));
  // })
});
