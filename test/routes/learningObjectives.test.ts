// TODO - update test below / check it is right / use routing test similar to kent c doods in hack-day/testing-workshop...

import express from 'express';

import request from 'supertest';

const app = express();
describe('GET / : returns all learning objectives and steps to success', () => {
  it('responds with json', async () => {
    await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  })
})