const express = require('express');
const cors  = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conection to local mongo DB
const uri = process.env.Mongo_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true  }
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection esatblished suchessfully");
}).catch(err => {
    console.log('error connecting to the database');
    process.exit();
});

// connecting the backend API
const usersRouter = require('./routes/users')
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is runnng on port: ${port}`);
});

