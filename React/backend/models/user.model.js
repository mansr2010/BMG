const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
//const { Schema } = require("mongoose/lib");

const userSchema = new Schema({
    username: { type:String, 
        required: [true , 'Please enter username'], 
        unirue: [true , 'Username is already in use'], 
        trim: true, minlength: [6 , 'Username must be more than 6 character'],
        index: {unique: true, dropDups: true}
    },
    fullname: {type:String,
        required: [true , 'Please enter your name'] 
    },
    birthdate: {type:Date, 
        required: [true , 'Please enter your birthday']
    },
    email:     {type:String, 
        required: [true , 'Please enter password'],
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
          }
    },
    password:  {type:String,
        required: [true , 'Please enter password']
    },
    pimage:    {type:String},
}, {
    timestamps: true,
});

const User = mongoose.model('User' , userSchema);

module.exports = User;