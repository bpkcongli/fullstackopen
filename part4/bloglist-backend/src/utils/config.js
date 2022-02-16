require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;
const MONGO_URL = NODE_ENV === 'test' ?
  process.env.MONGO_URL_TEST :
  process.env.MONGO_URL;
const SALT_OR_ROUNDS = parseInt(process.env.SALT_OR_ROUNDS);
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

module.exports = {
  NODE_ENV,
  MONGO_URL,
  SALT_OR_ROUNDS,
  ACCESS_TOKEN_KEY,
};
