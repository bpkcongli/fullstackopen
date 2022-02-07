const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('express-async-errors');
const config = require('./utils/config');
const blogsRouter = require('./routers/blogsRouter');
const usersRouter = require('./routers/usersRouter');
const loginsRouter = require('./routers/loginsRouter');
const middleware = require('./utils/middleware');
const app = express();

mongoose.connect(config.MONGO_URL);

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginsRouter);
app.use(middleware.errorHandler);

module.exports = app;
