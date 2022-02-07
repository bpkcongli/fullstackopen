const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);


const env = {
  initialUser: {
    username: 'superuser',
    name: 'Administrator',
    password: 'walpurgis',
  },
  newUser: {
    username: 'bpkcongli',
    name: 'Andrian',
    password: 'walpurgis',
  },
  wrongUsers: [
    {
      username: 'bp',
      name: 'Andrian',
      password: 'walpurgis',
    },
    {
      name: 'Andrian',
      password: 'walpurgis',
    },
    {
      username: 'bpkcongli',
      name: 'Andrian',
      password: 'wa',
    },
    {
      username: 'bpkcongli',
      name: 'Andrian',
    },
  ],
};


beforeAll(async () => {
  const hashedPassword = await bcrypt
      .hash(env.initialUser.password, config.SALT_OR_ROUNDS);

  const user = new User({
    ...env.initialUser,
    password: hashedPassword,
  });

  await user.save();
});


describe('getting all users', () => {
  let response;

  test(`response should have proper status code and content-type, and should 
    return users array with total amount that match the initial`, async () => {
    response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body).toHaveLength(1);
  });

  test(`the users from response should have property id and should not have 
    property password`, () => {
    const users = response.body;
    users.forEach(({id, _id, password}) => {
      expect(id).toBeDefined();
      expect(_id).toBeUndefined();
      expect(password).toBeUndefined();
    });
  });
});


describe('adding a new user with invalid payload', () => {
  test(`response should have proper status code and content-type`, async () => {
    const tests = env.wrongUsers.map(async (wrongUser) => {
      const response = await api
          .post('/api/users')
          .send({
            ...wrongUser,
          })
          .expect(400)
          .expect('Content-Type', 'application/json; charset=utf-8');

      return response.body;
    });
    const testResults = await Promise.all(tests);
    testResults.forEach((testResult) => {
      expect(testResult.error).toBeDefined();
    });
  });
});


describe('adding a new user with the username that already exists', () => {
  test(`response should have proper status code and content-type`, async () => {
    await api
        .post('/api/users')
        .send({
          ...env.initialUser,
        })
        .expect(400)
        .expect('Content-Type', 'application/json; charset=utf-8');
  });
});


describe('adding a new user', () => {
  test(`response should have proper status code and content-type, should 
    return the user that has been added`, async () => {
    const response = await api
        .post('/api/users')
        .send({
          ...env.newUser,
        })
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8');

    const {id, username, name, password, blogs} = response.body;
    expect(id).toBeDefined();
    expect(username).toEqual(env.newUser.username);
    expect(name).toEqual(env.newUser.name);
    expect(password).toBeUndefined();
    expect(blogs).toHaveLength(0);
  });

  test(`the total users on the server should increases by one`, async () => {
    const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body).toHaveLength(2);
  });
});


afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
