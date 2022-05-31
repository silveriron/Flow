const MongodbClient = require('mongodb').MongoClient

let database

async function connect() {
    const client = await MongodbClient.connect('mongodb://localhost:27017')
    database = await client.db('Flow')
}

const getDb = () => {
    if (!database) {
        throw { message: "database is wrong"}
    }
    return database
}

module.exports = {
    connectToMongodb: connect,
    getDb: getDb
}