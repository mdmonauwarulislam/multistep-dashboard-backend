const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true 
    },
    address: { 
        type: 
        String 
    },
    phoneNumber: { 
        type: String 
    },
    profilePicture: { 
        type: String,
        default: 'https://res.cloudinary.com/dxkufsejm/image/upload/v1631182859/ecommerce/placeholder.png'
    }
  });


module.exports =  mongoose.model('User', userSchema);