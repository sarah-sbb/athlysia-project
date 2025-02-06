const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING;
console.log(connectionString)
if (!connectionString) {
    console.log("The connection string is not defined")
}

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))
 .catch (error => console.error(error));