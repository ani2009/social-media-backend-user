var express = require('express');
var userRouter = express.Router();
const userController= require('../Controller/userController')
const authentiationUtils = require('../Utils/authentiationUtils')

/* GET users listing. */

function authenticateUser(req, res, next){
    authentiationUtils.authenticateUser(req, res, next);
}

function getAllUser(req, res){
    userController.getAllUser(req, res);
}

function createUser(req, res){
    userController.createUser(req, res)
}

function getSingleUser(req, res){
    userController.getSingleUser(req, res)
}

function searchHistory(req, res){
    userController.searchHistory(req, res)
}

function updateSingleUserName(req, res){
    userController.updateSingleUserName(req, res)
}

function deleteSingleUser(req, res){
    userController.deleteSingleUser(req, res)
}

function userLogin(req, res){
    userController.userLogin(req, res)
}

function userLogout(req, res){
    userController.userLogout(req, res)
}


function createFollower(req, res){
    userController.createFollower(req, res)
}

function getFollowers(req, res){
    userController.getFollowers(req, res)
}

function getFollowing(req, res){
    userController.getFollowing(req, res)
}

function getUserFeed(req, res){
    userController.getUserFeed(req, res)
}


function errorHandler(req, res){
    userController.errorHandler(req, res)
}

userRouter.get('/all', authenticateUser, getAllUser)
userRouter.post('/create', authenticateUser, createUser)
userRouter.get('/:email', authenticateUser, getSingleUser)
userRouter.put('/update/:email',authenticateUser, updateSingleUserName)
userRouter.delete('/delete/:email', authenticateUser, deleteSingleUser)

userRouter.post('/login', userLogin)
userRouter.get('/logout', authenticateUser, userLogout)

userRouter.get('/searchHistory/:email', authenticateUser, searchHistory)

userRouter.post('/create/follower/:email',authenticateUser, createFollower)  
userRouter.get('/followrs/:email', getFollowers)
userRouter.get('/following/:email', getFollowing)





userRouter.use(errorHandler)

module.exports = userRouter;
