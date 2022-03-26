// make the package available for use
const mongodb = require('mongodb');

// to establish a connection
const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
    // this line connects to the database server
    const client = await MongoClient.connect('mongodb://localhost:27017');
    // this line connects to the specific database
    database = client.db('blog');
}

// url for the database (mongodb is a special protocol for connecting)
// MongoClient.connect('mongodb://localhost:27017'); // uses promises 

function getDb() {
    // this is to make sure we have the database connection before we try to use it in our code
    if (!database) {
        throw {message: 'Database connection not established.'};
    }
    return database;
}

module.exports = {
    /* 
        point to the functions in this file but not executing them (i.e. no ()) they then become available for use in other
        files that import them
    */
    connectToDatabase: connect,
    getDb: getDb
}

// this is a util file