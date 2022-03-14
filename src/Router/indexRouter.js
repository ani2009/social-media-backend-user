const express = require('express');
const indexRouter = express.Router();
const userRouter= require('./userRouter')
const postRouter= require('./postRouter')

/* GET home page. */
indexRouter.use('/users', userRouter)
indexRouter.use('/post', postRouter)


module.exports = indexRouter;
