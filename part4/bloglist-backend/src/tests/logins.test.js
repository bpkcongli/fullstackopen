const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);


const env = {
  username: 'superuser',
  name: 'Administrator',
  password: 'walpurgis',
};


beforeAll(async () => {
  const hashedPassword = await bcrypt.hash(env.password, config.SALT_OR_ROUNDS);
  const user = new User({
    username: env.username,
    name: env.name,
    password: hashedPassword,
  });
  await user.save();
});


describe('login using valid credentials', () => {
  test(`response should have proper status code and content-type, should return
    the access token`, async () => {
    const response = await api
        .post('/api/login')
        .send({
          username: env.username,
          password: env.password,
        })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');

    const {token, username, name} = response.body;
    expect(token).toBeDefined();
    expect(username).toEqual(env.username);
    expect(name).toEqual(env.name);
  });
});

describe('login using invalid credentials', () => {
  test('response should have proper status code and content-type', async () => {
    await api
        .post('/api/login')
        .send({
          username: env.username,
          password: 'blablabla',
        })
        .expect(401)
        .expect('Content-Type', 'application/json; charset=utf-8');
  });
});


afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
