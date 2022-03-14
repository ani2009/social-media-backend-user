const userService = require('../Service/userService')
const authentication = require('../Utils/authentiationUtils')


function getAllUser(req, res){
    userService.getAllUser().then((result)=>{
        res.send(result)
    })
}

function createUser(req, res){

    var props = ["name", "email","password","phoneNo","isAdmin"];
    var hasAll = props.every(prop => req.body.hasOwnProperty(prop));

    if(hasAll){
        userService.createUser(req.body, req.headers).then((result)=>{
            if(result.status=='success'){
                res.status(201).json(result)
            }else{
                res.status(400).json(result)
            }
        })
    }else{
        res.status(400).json({
            status: 'failure',
            message: 'missing the requied field '
        })
    }
}

function getSingleUser(req, res){
        
        userService.getSingleUser(req.params.email, req.headers).then((result)=>{
            if(result){
                res.send(result)
            }else{  
                res.send({})
            }
        })
} 

function searchHistory(req, res){
        
        userService.searchHistory(req.params.email).then((result)=>{
            if(result){
                res.send(result)
            }else{  
                res.send({})
            }
        })
} 

function updateSingleUserName(req, res){
    if(req.body.name){
        userService.updateSingleUserName(req.params.email, req.body, req.headers).then((result)=>{
            if(result.status == 'success'){
                res.send(result)
            }else{
                res.status(400).send(result)
            }
        })
    }else{
        res.status(400).send({
            status:'failure',
            message:'missing the name field for user'
        })
    }
} 

function deleteSingleUser(req, res){
    userService.deleteSingleUser(req.params.email, req.headers).then((result)=>{
        if(result.status == 'success'){
            res.send(result)
            
        }else{
            res.status(400).send(result)
        }
    })
} 

// login

function userLogin(req, res){
    if(req.body.email && req.body.password){
        userService.userLogin(req.body).then((result)=>{
            if(result.status == 'success'){
                res.status(200).send(result)
            }else{
                res.status(400).send(result)
            }
        })
    }else{
            res.status(400).send({
                status:'failure',
                message:'Incorrect email or password'
            })
    }
} 

function userLogout(req, res){
    req.logout()
    res.redirect("/");
} 



function createFollower(req, res){
    userService.createFollower(req.params.email, req.headers).then((result)=>{
        res.send(result)
    })
}

function getFollowers(req, res){
    userService.getFollowers(req.params.email).then((result)=>{
        res.send(result)
    })
}

function getFollowing(req, res){
    userService.getFollowing(req.params.email).then((result)=>{
        res.send(result)
    })
}



function errorHandler(req, res){
    userService.deleteSingleUser(req.params.email).then((result)=>{
        res.status(404).send({
            status: 'failure',
            message: 'field missing'
        })
    })
} 


module.exports = {getAllUser, createUser, getSingleUser, updateSingleUserName, deleteSingleUser, errorHandler, userLogin, userLogout, searchHistory, getFollowers, createFollower, getFollowing};