var axios = require('axios')
const userDao = require('../Dao/userDao')
const authentication = require('../Utils/authentiationUtils')



async function getAllUserPost() {

    let userPost;
    await axios.get('http://localhost:8000/post/all')
        .then(function (response) {
            userPost = response.data
        })
        .catch(function (error) {
            userPost = {
                status: "failure",
                message: "unable to get posts"
            }
        })
    return (userPost)
}

async function getUserPost(userEmail) {

    let userPost;
    await axios.get('http://localhost:8000/post/postedBy/' + userEmail)
        .then(function (response) {
            userPost = response.data
        })
        .catch(function (error) {
            userPost = {
                status: "failure",
                message: "incorrect email id"
            }
        })
    return userPost
}


async function createUserPost(userEmail, postDetail, reqHeader) {


    let jwt = authentication.getJWT(reqHeader)
    let isAdmin = await userDao.verifyAdmin(jwt.user_email)

    if (isAdmin) {
        let postResponse;
        await axios.post('http://localhost:8000/post/create', {
            "postedBy": userEmail,
            "text": postDetail.text
        })
            .then(() => {
                postResponse = {
                    status: "success",
                    message: "post added"
                }
            })
            .catch(() => {
                postResponse = {
                    status: "failure",
                    message: "unable to add post"
                }
            })
        return postResponse
    } else {
        return ({
            status: "failure",
            message: "Unauthorized request"
        })
    }
}

async function updateUserPost(userEmail, postDetail, reqHeader) {

    let jwt = authentication.getJWT(reqHeader)
    let isAdmin = await userDao.verifyAdmin(jwt.user_email)

    if (isAdmin) {
        let postResponse;
        await axios.put('http://localhost:8000/post/update/' + userEmail, {
            "text": postDetail.text
        })
            .then(() => {
                postResponse = {
                    status: "success",
                    message: "post updated"
                }
            })
            .catch(() => {
                postResponse = {
                    status: "failure",
                    message: "update fail due to wrong username"
                }
            })
        return (postResponse)
    } else {
        return ({
            status: "failure",
            message: "Unauthorized request"
        })
    }
}

async function deleteUserPostWithId(userEmail, post_id, reqHeader) {

    let jwt = authentication.getJWT(reqHeader)
    let isAdmin = await userDao.verifyAdmin(jwt.user_email)

    if (isAdmin) {
        let postResponse;
        await axios.delete('http://localhost:8000/post/delete/' + userEmail + '/' + post_id)
            .then(() => {
                postResponse = {
                    status: "success",
                    message: "post deleted"
                }
            })
            .catch(() => {
                postResponse = {
                    status: "failure",
                    message: "unable to delete"
                }
            })
        return (postResponse)
    } else {
        return ({
            status: "failure",
            message: "Unauthorized request"
        })
    }
}


async function getUserFeed(pageLimit, reqHeader) {

    let jwt = authentication.getJWT(reqHeader)
    let result = await userDao.getFollowers(jwt.user_email) 
    let allFollowings = []
    result.forEach(function(item,index) { 
        allFollowings.push(item.following);
      });

    let userPost;
    await axios.post('http://localhost:8000/post/feed/', {pageLimit, allFollowings})
        .then(function (response) {
            userPost = response.data
        })
        .catch(function (error) {
            userPost = {
                status: "failure",
                message: "unable to get posts"
            }
        })
    return (userPost)
 
}




module.exports = {getUserPost, createUserPost, updateUserPost, deleteUserPostWithId, getAllUserPost, getUserFeed};