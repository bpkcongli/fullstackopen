const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');
const Blog = require('../models/blog');
const app = require('../app');
const api = supertest(app);


const env = {
  initialUser: {
    username: 'superuser',
    name: 'Administrator',
    password: 'walpurgis',
  },
  userId: null,
  accessToken: null,
  initialBlog: {
    title: 'THE RESUME THAT GOT ME INTO FAANG !!',
    author: 'Riddhi Dutta',
    url: 'https://rite2riddhi.medium.com/the-resume-that-got-me-into-faang-ca168ac15df2',
    likes: 768,
  },
  blogId: null,
  newBlog: {
    title: 'The Ultimate Engineer’s Guide to Code Refactoring',
    author: 'Alex Omeyer',
    url: 'https://medium.com/swlh/the-ultimate-engineers-guide-to-code-refactoring-c38372632906',
    likes: 2415,
  },
  otherUser: {
    username: 'other',
    name: 'Other',
    password: 'walpurgis',
  },
  otherUserId: null,
  otherAccessToken: null,
};


beforeAll(async () => {
  let hashedPassword = await bcrypt
      .hash(env.initialUser.password, config.SALT_OR_ROUNDS);
  let user = new User({
    username: env.initialUser.username,
    name: env.initialUser.name,
    password: hashedPassword,
  });
  env.userId = (await user.save()).toJSON().id;

  hashedPassword = await bcrypt
      .hash(env.otherUser.password, config.SALT_OR_ROUNDS);
  user = new User({
    username: env.otherUser.username,
    name: env.otherUser.name,
    password: hashedPassword,
  });
  env.otherUserId = (await user.save()).toJSON().id;

  const blog = new Blog({
    ...env.initialBlog,
    user: env.userId,
  });
  await blog.save();

  let payload = {id: env.userId};
  env.accessToken = jwt.sign(payload, config.ACCESS_TOKEN_KEY);

  payload = {id: env.otherUserId};
  env.otherAccessToken = jwt.sign(payload, config.ACCESS_TOKEN_KEY);
});


describe('getting all blogs', () => {
  let response;

  test(`response should have proper status code, content-type, and should 
    return blogs array with total amount that match the initial`, async () => {
    response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body).toHaveLength(1);
  });

  test(`the blogs from response should have property id`, () => {
    const blogs = response.body;
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    });
  });

  test(`the blogs from response should have property user that must be 
    an object`, () => {
    const blogs = response.body;
    blogs.forEach(({user}) => {
      const {username, name, id} = user;
      expect(username).toEqual(env.initialUser.username);
      expect(name).toEqual(env.initialUser.name);
      expect(id).toEqual(env.userId);
    });
  });
});


describe('adding a new blog without authentication', () => {
  test(`response should have proper status code and content-type`, async () => {
    const response = await api
        .post('/api/blogs')
        .send({...env.newBlog})
        .expect(401)
        .expect('Content-Type', 'application/json; charset=utf-8');

    const {error} = response.body;
    expect(error).toEqual('missing authentication');
  });
});


describe('adding a new blog with malformatted token', () => {
  test(`response should have proper status code and content-type`, async () => {
    const response = await api
        .post('/api/blogs')
        .set('authorization', `Bearer a${env.accessToken}`)
        .send({...env.newBlog})
        .expect(400)
        .expect('Content-Type', 'application/json; charset=utf-8');

    const {error} = response.body;
    expect(error).toEqual('malformatted access token');
  });
});


describe('adding a new blog with proper authentication', () => {
  test(`response should have proper status code, content-type, and should 
    return the blog that has been added`, async () => {
    const response = await api
        .post('/api/blogs')
        .set('authorization', `Bearer ${env.accessToken}`)
        .send({...env.newBlog})
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8');

    const {id, title, author, url, likes, user} = response.body;
    expect(id).toBeDefined();
    expect(title).toEqual(env.newBlog.title);
    expect(author).toEqual(env.newBlog.author);
    expect(url).toEqual(env.newBlog.url);
    expect(likes).toEqual(env.newBlog.likes);
    expect(user).toEqual(env.userId);

    env.blogId = id;
  });

  test(`the total blogs on the server should increases by one`, async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body).toHaveLength(2);
  });
});


describe('adding a new blog without likes', () => {
  let blogId;

  test(`response should have proper status code, content-type, and should 
    return the blog with total likes equal to zero`, async () => {
    const response = await api
        .post('/api/blogs')
        .set('authorization', `Bearer ${env.accessToken}`)
        .send({
          title: env.newBlog.title,
          author: env.newBlog.author,
          url: env.newBlog.url,
        })
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8');

    const {id, likes} = response.body;
    expect(id).toBeDefined();
    expect(likes).toEqual(0);

    blogId = id;
  });

  afterAll(async () => {
    await Blog.findByIdAndDelete(blogId);
  });
});


describe('adding a new blog without title and url', () => {
  test(`response should have proper status code and content-type`, async () => {
    await api
        .post('/api/blogs')
        .set('authorization', `Bearer ${env.accessToken}`)
        .send({
          author: env.newBlog.author,
          likes: env.newBlog.likes,
        })
        .expect(400)
        .expect('Content-Type', 'application/json; charset=utf-8');
  });
});


describe('updating a single blog', () => {
  test(`response should have proper status code and content-type`, async () => {
    const response = await api
        .put(`/api/blogs/${env.blogId}`)
        .send({
          ...env.newBlog,
          likes: env.newBlog.likes + 1,
        })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');

    const {title, author, url, likes} = response.body;
    expect(title).toEqual(env.newBlog.title);
    expect(author).toEqual(env.newBlog.author);
    expect(url).toEqual(env.newBlog.url);
    expect(likes).toEqual(env.newBlog.likes + 1);
  });
});


describe('deleting a single blog without authentication', () => {
  test(`response should have proper status code and total blogs on the server
    should decreases by one`, async () => {
    const response = await api
        .delete(`/api/blogs/${env.blogId}`)
        .expect(401);

    const {error} = response.body;
    expect(error).toEqual('missing authentication');
  });
});


describe('deleting a single blog by another user', () => {
  test(`response should have proper status code and total blogs on the server
    should decreases by one`, async () => {
    const response = await api
        .delete(`/api/blogs/${env.blogId}`)
        .set('authorization', `Bearer ${env.otherAccessToken}`)
        .expect(403);

    const {error} = response.body;
    expect(error).toEqual('you are not authorized to access this resource');
  });
});


describe('deleting a single blog with proper authentication', () => {
  test(`response should have proper status code and total blogs on the server
    should decreases by one`, async () => {
    await api
        .delete(`/api/blogs/${env.blogId}`)
        .set('authorization', `Bearer ${env.accessToken}`)
        .expect(204);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(1);
  });
});


afterAll(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

