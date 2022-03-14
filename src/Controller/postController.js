const postService = require('../Service/postService')
const authentication = require('../Utils/authentiationUtils')



function getAllUserPost(req, res){
    postService.getAllUserPost().then((result)=>{
        res.send(result)
    })
}

function getUserPost(req, res){
    postService.getUserPost(req.params.email).then((result)=>{
        res.send(result)
    })
}


function createUserPost(req, res){
    postService.createUserPost(req.params.email, req.body, req.headers).then((result)=>{
        res.send(result)
    })
}


function updateUserPost(req, res){
    postService.updateUserPost(req.params.email, req.body, req.headers).then((result)=>{
        res.send(result)
    })
}

function deleteUserPostWithId(req, res){
    postService.deleteUserPostWithId(req.params.email, req.params.post_id, req.headers).then((result)=>{
        res.send(result)
    })
}


function getUserFeed(req, res){
    console.log(req.query)
    postService.getUserFeed(req.query, req.headers).then((result)=>{
        res.send(result)
    })
}

function errorHandler(req, res){
    postService.deleteSingleUser(req.params.email).then((result)=>{
        res.status(404).send({
            status: 'failure',
            message: 'field missing'
        })
    })
} 


module.exports = {errorHandler, getUserPost, createUserPost, updateUserPost, deleteUserPostWithId, getAllUserPost, getUserFeed};