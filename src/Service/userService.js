var axios = require('axios')
const userDao = require('../Dao/userDao')
const authentication = require('../Utils/authentiationUtils')
const bcrypt = require('bcrypt');

async function getAllUser() {
    let result = await userDao.getAllUser()
    console.log("result of getAllUser" + JSON.stringify(result))
    return result
}

async function createUser(userDetails, reqHeader) {

    let jwt = authentication.getJWT(reqHeader)
    let isAdmin = await userDao.verifyAdmin(jwt.user_email)
    if (isAdmin) {
        //Check if user already exsist
        let exsistedUser = await userDao.getSingleUser(userDetails.email)
        //retuns null if exsist
        if (!exsistedUser) {
            return new Promise((resolve, reject)=>{
                bcrypt.hash(userDetails.password, 9,async function (err, hash) {
                    userDetails.password = hash
                    console.log("create user", userDetails )
                    let result = await userDao.createUser(userDetails)

                    if (result.acknowledged && result.insertedId) {
                        resolve({
                            status: 'success',
                            message: 'user added successfully with email id ' + userDetails.email
                        })
                    } else {
                        resolve({
                            status: 'failure',
                            message: 'user not addded'
                        })
                    }
                })
            })
        } else {
            return {
                status: 'failure',
                message: 'user already exsist'
            }
        }
    } else {
        return {
            status: 'failure',
            message: 'Unauthorized request'
        }
    }


}

async function getSingleUser(userEmail, reqHeader) {
    let jwt = authentication.getJWT(reqHeader)
    let result = await userDao.getSingleUser(userEmail)
    let reqsedUser = await userDao.getSingleUser(jwt.user_email)
    await userDao.addSearchHistory(userEmail, jwt.user_email, reqsedUser.searchHistory)
    console.log("user detail with id" + userEmail + ": " + JSON.stringify(result))
    return result
}

async function searchHistory(userEmail) {
    let result = await userDao.searchHistory(userEmail)
    console.log("seach history of " + userEmail + ": " + result.searchHistory)
    return result.searchHistory.reverse()
}

async function updateSingleUserName(userEmail, newData, reqHeader) {

    let jwt = authentication.getJWT(reqHeader)
    let isAdmin = await userDao.verifyAdmin(jwt.user_email)

    if (isAdmin) {
        let result = await userDao.updateSingleUserName(userEmail, newData)
        console.log("user detail with id" + userEmail + ": " + JSON.stringify(result))
        if (result.lastErrorObject.updatedExisting && result.value) {
            return {
                status: 'success',
                message: 'User name updated'
            }
        } else {
            return {
                status: 'failure',
                message: 'user not found'
            }
        }
    } else {
        return {
            status: 'failure',
            message: 'Unauthorized request'
        }
    }

}

async function deleteSingleUser(userEmail, reqHeader) {

    let jwt = authentication.getJWT(reqHeader)
    let isAdmin = await userDao.verifyAdmin(jwt.user_email)

    if (isAdmin) {
        let result = await userDao.deleteSingleUser(userEmail)
        console.log("user detail with id" + userEmail + "is deleted")

        if (result.lastErrorObject.n && result.value) {

            return {
                status: 'success',
                message: 'User deleted'
            }
        } else {
            return {
                status: 'failure',
                message: 'user not found'
            }
        }
    } else {
        return {
            status: 'failure',
            message: 'Unauthorized request'
        }
    }

}

async function userLogin(userDetails) {
    let exsistedUser = await userDao.getSingleUser(userDetails.email)
    
    return new Promise((resolve, reject)=>{
        bcrypt.compare(userDetails.password, exsistedUser.password, function(err, result) {
            if (result) {
                jwt = authentication.genrateJWT(userDetails.email)
                //encrytiom
                console.log(jwt)
                resolve({
                    status: 'success',
                    Token: jwt
                })
            } else {
                resolve({
                    status: 'failure',
                    message: 'Incorrect email or password'
                })
            }
        })
    })

}

// *******************************POST*********************************************
async function getAllUserPost(userEmail) {

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


async function createFollower(user, reqHeader) {
    let jwt = authentication.getJWT(reqHeader)
    followData = {
        "email": jwt.user_email,
        "following": user
    }
    console.log("follodata" + followData)
    let result = await userDao.createFollower(followData)
    console.log("result of create" + JSON.stringify(result))
    return result
}

async function getFollowers(user) {
    let result = await userDao.getFollowers(user)
    console.log("result of getAll followes" + JSON.stringify(result))
    return result
}

async function getFollowing(user) {
    let result = await userDao.getFollowing(user)
    console.log("result of getAll following" + JSON.stringify(result))
    return result
}



module.exports = { getAllUser, createUser, getSingleUser, updateSingleUserName, deleteSingleUser, userLogin, getUserPost, createUserPost, updateUserPost, deleteUserPostWithId, getAllUserPost, searchHistory, getFollowers, createFollower, getFollowing };