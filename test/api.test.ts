
// requirement
// want all lesson objectives and steps to success
// just keep achieved front end for now
// teacher_id as 1 for logged out..

// (logged in) want all lessons objectives for user


// message to login when trying to update / edit / add pops up

// next stage to have login maybe with

// get all - GET /

// add LO - POST /add/learning-objective

// edit LO - POST /edit/learning-objective
// edit LO - POST /edit/step-to-success

// delete LO and step to success - DELETE method? check...

import express from 'express';

import request from 'supertest';

const app = express();
console.log('app::: ', app)
describe('GET / : returns all learning objectives and steps to success', () => {
  it('responds with json', async () => {
    await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  })
})
