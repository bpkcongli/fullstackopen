const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const config = require('../utils/config');
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const {username, password = '', name} = req.body;

  if (password.length < 3) {
    return res.status(400).json({
      error: 'Password must have length at least 3 characters',
    });
  }

  const hashedPassword = await bcrypt.hash(password, config.SALT_OR_ROUNDS);

  const user = new User({
    username,
    password: hashedPassword,
    name,
  });

  const savedUser = await user.save();
  return res.status(201).json(savedUser);
});

usersRouter.get('/', async (_, res) => {
  const users = await User
      .find({})
      .populate('blogs', {title: 1, author: 1, url: 1});
  return res.json(users);
});

module.exports = usersRouter;
