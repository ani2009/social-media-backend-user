var express = require('express');
var postRouter = express.Router();
const postController= require('../Controller/postController')
const authentiationUtils = require('../Utils/authentiationUtils')

/* GET users listing. */

function authenticateUser(req, res, next){
    authentiationUtils.authenticateUser(req, res, next);
}

function getUserPost(req, res){
    postController.getUserPost(req, res)
}


function getAllUserPost(req, res){
    postController.getAllUserPost(req, res)
}

function createUserPost(req, res){
    postController.createUserPost(req, res)
}

function updateUserPost(req, res){
    postController.updateUserPost(req, res)
}

function deleteUserPostWithId(req, res){
    postController.deleteUserPostWithId(req, res)
}


function getUserFeed(req, res){
    postController.getUserFeed(req, res)
}


function errorHandler(req, res){
    postController.errorHandler(req, res)
}

postRouter.get('/all/', authenticateUser, getAllUserPost)
postRouter.get('/all/:email', authenticateUser, getUserPost)
postRouter.post('/create/:email', authenticateUser, createUserPost)
postRouter.put('/update/:email', authenticateUser, updateUserPost)
postRouter.delete('/delete/:email/:post_id', authenticateUser, deleteUserPostWithId)

postRouter.post('/feed', authenticateUser, getUserFeed)

postRouter.use(errorHandler)

module.exports = postRouter;
