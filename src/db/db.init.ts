const credentials = require("../../credentials.json");
let { learningObjectives, stepsToSuccess } = require("./seedData.ts");
// import {learningObjectivesSeedConfig} from './seedData';

const { Client } = require("pg");
let { connectionString } = credentials.postgres;  //  COMMENTED OUT OTHERWISE GETTING error TS2451: Cannot redeclare block-scoped variable 'connectionString'
const client = new Client({ connectionString });


const createScript = `
CREATE TABLE IF NOT EXISTS teachers (
  teacher_id INT GENERATED ALWAYS AS IDENTITY,
  teacher_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(teacher_id)
);

CREATE TABLE IF NOT EXISTS students (
  student_id INT GENERATED ALWAYS AS IDENTITY,
  student_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(student_id)
);

CREATE TABLE IF NOT EXISTS learning_objectives (
  learning_objective_id SERIAL PRIMARY KEY,
  title varchar(200),
  achieved boolean,
  teacher_id INT,
  student_id INT
  );

CREATE TABLE IF NOT EXISTS steps_to_success (
  step_to_success_id SERIAL PRIMARY KEY,
  step_to_success varchar(200),
  achieved boolean,
  teacher_id INT,
  student_id INT
);

CREATE TABLE IF NOT EXISTS learning_steps (
  learning_objective_id INT,
  step_to_success_id INT
);
  `;

//removed from line 28 as not working..
// FOREIGN KEY(teacher_id)
// REFERENCES teachers(teacher_id),
// FOREIGN KEY(student_id)
// REFERENCES students(student_id)

// removed from line 36..
// CONSTRAINT fk_teacher
// FOREIGN KEY(teacher_id)
//   REFERENCES teachers(teacher_id),
// CONSTRAINT fk_student
// FOREIGN KEY(student_id)
//   REFERENCES students(student_id)

// TODO
// Have got learning_objectives table filled here: https://api.elephantsql.com/console/9bbbb9e2-8d57-4dd6-91e5-c11cc2b95ffd/browser?#
// but need to change teacher_id and student_id in it - maybe all lOs should have same id?
// Need to update steps_to_success id

const getTeachersCount = async (client: { query: (arg0: string) => PromiseLike<{ rows: any; }> | { rows: any; }; }) => {
  const { rows } = await client.query(`SELECT COUNT(*) FROM teachers`);
  return Number(rows[0].count);
};

const seedTeachers = async (client: { query: (arg0: string, arg1: string[]) => any; }) => {
  const sql = `
    INSERT INTO teachers(
      teacher_name
    ) VALUES ($1)
    `;
  await client.query(sql, ["Simon"]);
  await client.query(sql, ["Nik"]);
  await client.query(sql, ["Andrew"]);
  await client.query(sql, ["Jason"]);
  await client.query(sql, ["Rachel"]);
};

const seedStudents = async (client: { query: (arg0: string, arg1: string[]) => any; }) => {
  const sql = `
    INSERT INTO students(
      student_name
    ) VALUES ($1)
    `;
  await client.query(sql, ["Tanner"]);
  await client.query(sql, ["Rahmel"]);
  await client.query(sql, ["Blaney"]);
  await client.query(sql, ["Luong"]);
  await client.query(sql, ["Averill"]);
};

// pass in loId, title, achieved for each LO to client.query
// need to restructure what i am importing...
// const getSeedData = (data: learningObjectivesSeedConfig[]) => {

const seedLearningObjectives = async (client: { query: (arg0: string, arg1: any[]) => any; }) => {
  const sql = `
  INSERT INTO learning_objectives(
    title,
    achieved,
    teacher_id,
    student_id
  ) VALUES ($1, $2, $3, $4)
  `;

  for (const [i, learningObjective] of learningObjectives.entries()) {
    await client.query(sql, [
      learningObjective.title,
      learningObjective.achieved,
      1,
      null,
    ]);
  }
};

const seedStepsToSuccess = async () => {
  const sql = `
  INSERT INTO steps_to_success(
    step_to_success,
    achieved,
    teacher_id,
    student_id
  ) VALUES ($1, $2, $3, $4)
  `;
  for (const stepToSuccess of stepsToSuccess) {
    await client.query(sql, [
      stepToSuccess.stepToSuccess,
      stepToSuccess.achieved,
      1,
      null,
    ]);
  }
};

const seedLearningSteps = async () => {
  const sql = `
  INSERT INTO learning_steps(
    learning_objective_id,
    step_to_success_id
  ) VALUES ($1, $2)
  `;

  for (const lO of learningObjectives) {
    for (const stepId of lO.stepsToSuccess) {
      await client.query(sql, [lO.id, stepId]);
    }
  }
};

client.connect().then(async () => {
  try {
    console.log("creating database schema");
    await client.query(createScript);
    // const teachersCount = await getTeachersCount(client);
    // if (teachersCount === 0) {
    console.log("seeding learning objectives");
    // await seedTeachers(client);
    // await seedStudents(client);
    // await seedStepsToSuccess(client);
    // await seedLearningSteps(client);
    // await seedLearningObjectives(client);
    // }
    // }
  } catch (err) {
    console.log("Error: could not initialise database");
    console.log(err.message);
  } finally {
    client.end();
  }
});
