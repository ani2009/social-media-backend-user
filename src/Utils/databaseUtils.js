const { MongoClient } = require('mongodb');
class DatabaseUtils{

    static instance

    static async getDBConnection() {
        if(DatabaseUtils.instance){
            return DatabaseUtils.instance
        }

        let client
        client=await MongoClient.connect(process.env.DB_URL,{ useUnifiedTopology:true})
        DatabaseUtils.instance= await client.db(process.env.DATABASE)


        return DatabaseUtils.instance
    }

}

module.exports=DatabaseUtils