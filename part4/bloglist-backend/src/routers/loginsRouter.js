const loginsRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');

loginsRouter.post('/', async (req, res) => {
  const {username, password} = req.body;

  const {_id, name, password: hashedPassword} = await User.findOne({username});
  const isCorrectPassword = await bcrypt.compare(password, hashedPassword);

  if (!isCorrectPassword) {
    return res.status(401).json({
      error: 'wrong username or password',
    });
  }

  const payload = {id: _id};
  const token = jwt.sign(payload, config.ACCESS_TOKEN_KEY);

  return res.status(200).json({
    token,
    username,
    name,
  });
});

module.exports = loginsRouter;
