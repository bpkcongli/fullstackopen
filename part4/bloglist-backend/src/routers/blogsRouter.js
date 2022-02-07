const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (_, res) => {
  const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1});
  return res.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const {title, author, url, likes = 0} = req.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: req.user,
  });

  const savedBlog = await blog.save();
  const {blogs} = await User.findById(req.user);
  await User.findByIdAndUpdate(req.user, {
    blogs: blogs.concat(savedBlog._id),
  });

  return res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const {id: blogId} = req.params;
  const {user} = await Blog.findById(blogId);

  if (user.toString() === req.user) {
    await Blog.findByIdAndDelete(blogId);
    return res.status(204).end();
  } else {
    return res.status(403).json({
      error: 'you are not authorized to access this resource',
    });
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const {id} = req.params;
  const {title, author, url, likes} = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(id, {
    title, author, url, likes,
  }, {new: true});

  return res.json(updatedBlog);
});

module.exports = blogsRouter;
