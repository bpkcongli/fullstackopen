require('dotenv').config();

const MONGO_URL = process.env.NODE_ENV === 'test' ?
  process.env.MONGO_URL_TEST :
  process.env.MONGO_URL;
const SALT_OR_ROUNDS = parseInt(process.env.SALT_OR_ROUNDS);
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

module.exports = {
  MONGO_URL,
  SALT_OR_ROUNDS,
  ACCESS_TOKEN_KEY,
};
