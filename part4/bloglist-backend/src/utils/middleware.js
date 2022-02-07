const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const errorHandler = (err, _, res, next) => {
  const {name: errName} = err;

  if (errName === 'ValidationError') {
    res.status(400).json({error: err.message});
  } else if (errName === 'JsonWebTokenError') {
    res.status(400).json({error: 'malformatted access token'});
  }

  next();
};

const tokenExtractor = (req, _, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }

  next();
};

const userExtractor = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({
      error: 'missing authentication',
    });
  }

  const {id} = jwt.verify(req.token, config.ACCESS_TOKEN_KEY);
  req.user = id;

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
