const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (_, res) => {
  const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1})
      .populate('comments', {content: 1});
  return res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const {id} = req.params;
  const blog = await Blog
      .findOne({_id: id})
      .populate('user', {username: 1, name: 1})
      .populate('comments', {content: 1});

  return res.json(blog);
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

  const {_id} = await blog.save();
  const {blogs} = await User.findById(req.user);
  await User.findByIdAndUpdate(req.user, {
    blogs: blogs.concat(_id),
  });

  const savedBlog = await Blog
      .findById(_id)
      .populate('user', {username: 1, name: 1})
      .populate('comments', {content: 1});

  return res.status(201).json(savedBlog);
});

blogsRouter.post('/:id/comments', middleware.userExtractor,
    async (req, res) => {
      const {id} = req.params;
      const {content} = req.body;

      const comment = new Comment({
        content,
        blog: id,
      });

      const savedComment = await comment.save();
      const {comments} = await Blog.findById(id);
      const blog = await Blog
          .findByIdAndUpdate(id, {
            comments: comments.concat(savedComment._id),
          }, {new: true})
          .populate('user', {username: 1, name: 1})
          .populate('comments', {content: 1});

      return res.status(201).json(blog);
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

  const updatedBlog = await Blog
      .findByIdAndUpdate(id, {
        title, author, url, likes,
      }, {new: true})
      .populate('user', {username: 1, name: 1})
      .populate('comments', {content: 1});

  return res.json(updatedBlog);
});

module.exports = blogsRouter;
