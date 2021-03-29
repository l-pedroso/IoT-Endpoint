require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index')


//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(process.env.MONGO_CONN_URL, { useNewUrlParser: true , useCreateIndex: true}).then(() => {
    console.log('MongoDB --  database connection established successfully!');
}).catch(err => {
    console.log('Connection to database error' + err);
});
    
mongoose.connection.on('error', err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

//==== 3 - ROUTES INITIALIZATION
app.use('/api/v1', routes);

//=== 4 - START SERVER
//app.listen(process.env.PORT || 3000, () => console.log('Server running on http://localhost:'+process.env.PORT+'/'));

app.listen(process.env.PORT);
