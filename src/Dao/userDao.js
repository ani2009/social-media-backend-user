    const MongoUtils = require('../Utils/databaseUtils')

async function getAllUser(){
    let db = await MongoUtils.getDBConnection()
    let result = await db.collection('user').find().toArray();
    return result
}


async function createUser(userData){
    let db = await MongoUtils.getDBConnection()
    let result = await db.collection('user').insertOne(userData)
    return result
}

async function getSingleUser(userEmail){
    let db = await MongoUtils.getDBConnection()

    let result = await db.collection('user').findOne({email: userEmail})
   

    //  let result = await db.collection('user').find({email: userEmail}).toArray()
    return result;
}

async function addSearchHistory(userEmail, loginEmial, searchHistory){
    let db = await MongoUtils.getDBConnection()
    console.log(searchHistory)
    var isExist = searchHistory.includes(userEmail);
    if(isExist){
        db.collection('user').findOneAndUpdate( 
            {email: loginEmial},
            { $pull: { searchHistory: userEmail } }
         )
    }
    await db.collection('user').findOneAndUpdate(
    {email: loginEmial},
    { $push: {
        searchHistory: {
            $each: [userEmail],
            $slice: -4
        }
    } }
    )
}

async function searchHistory(userEmail, loginEmial){
    let db = await MongoUtils.getDBConnection()
    let result = await db.collection('user').findOne({email: userEmail})
    return result;
}

async function updateSingleUserName(userEmail, newData){
    let db = await MongoUtils.getDBConnection()
    let result = await db.collection('user').findOneAndUpdate(
        { email : userEmail },
        { $set : { name : newData.name } }
        )
    return result;
}

async function deleteSingleUser(userEmail){
    let db = await MongoUtils.getDBConnection()
    // let result = await db.collection('user').remove({ email : userEmail})
    let result = await db.collection('user').findOneAndDelete({ email : userEmail})
    return result;
}

async function userLogin(userDetails){
    let db = await MongoUtils.getDBConnection()
    let result = await db.collection('user').findOne(userDetails)
    return result;
}

async function verifyAdmin(userEmail){
    let db = await MongoUtils.getDBConnection()
    let result = await db.collection('user').findOne({ email : userEmail})
    return(result.isAdmin)
}



async function createFollower(userData){
    let db = await MongoUtils.getDBConnection()
    let result = await db.collection('followers').insertOne(userData)
    return result
}

async function getFollowers(user){
    let db = await MongoUtils.getDBConnection()
    let result =  await db.collection('followers').find({email: user}).project({following:1, _id:0}).toArray()
    return result
}

async function getFollowing(user){
    let db = await MongoUtils.getDBConnection()
    let result =  await db.collection('followers').find({following: user}).project({email:1, _id:0}).toArray()
    return result
}



async function getAllPostByUser(userName){
    let db = await MongoUtils.getDBConnection()
    console.log("-----------------")
    console.log(userName)
    let result = await db.collection('posts').find({postedBy: {$in: userName}}).toArray()
    console.log(result)
    return result
}




module.exports = {getAllUser, createUser, getSingleUser, updateSingleUserName, deleteSingleUser, userLogin, verifyAdmin, searchHistory, addSearchHistory, createFollower, getFollowers, getFollowing, getAllPostByUser};

