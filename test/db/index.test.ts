import { assert } from 'chai';
import { updateLearningObjective, dbClient } from './../../src/db/db';
import * as db from '../../src/db/db';
import * as transform from '../../src/models/index';

describe('getAllTransformedLearningObjectives', () => {
  it('returns all the transformed learning objectives', async () => {
    const learningObjectives = transform.getAllTransformedLearningObjectives(

      // do i need to use dependency injection?
      // has the change to the DB interface broken the db in db.ts?
      // do i need to use the interface in this test file which narrows the type?

    )
  })
})


// it('updateLearningObjective updates the selected learning objective', async() => {
//   const loId = 321;
//   const learningObjectiveTitle = 'Try harder';
//   const userId = 123;

//   const dbClient = {
//     query(sql: string, values) {
//       return []
//     }
//   }


//   const updatedLearningObjective = dbClient.query({
//     query(sql: string, values)
//   })

//   await db.updateLearningObjective(loId, learningObjectiveTitle, userId);

//   assert.equal(dbClient.query).
// })


// test('getAuthors', () => {
//   const authors = getAuthors({
//     runQuery(sql: string) {
//       return [['Toni', 'Morrison'], ['Maya', 'Angelou']];
//     }
//   });
//   expect(authors).toEqual([
//     {first: 'Toni', last: 'Morrison'},
//     {first: 'Maya', last: 'Angelou'}
//   ]);
// });