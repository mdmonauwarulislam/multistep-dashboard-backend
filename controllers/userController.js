
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const httpsStatusCode = require('../constants/httpsStatusCode');
const { getToken } = require('../middleware/authMiddleware');



// Register User
const registerUser = async (req, res) => {
    try {
    const { name, email, password, address, phoneNumber } = req.body;
    const user = await userModel.findOne({ email });
    if (user){ 
        return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false, 
        message: 'User already exists' 
    });
}

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await userModel.create({ 
        name, 
        email, 
        password : hashedPassword, 
        address, 
        phoneNumber 
    });
    if(!newUser){
        return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false, 
        message: 'User not created' 
    });
  }
    return res.status(httpsStatusCode.CREATED).json({
        success: true, 
        message: 'User created successfully',
        data: newUser 
    });
    
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({email});
    if (!user) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    const token = await getToken(user);
    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: 'User logged in successfully',
      data: { user, token }
    });
    } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
    }
}

// Protected Route to Get User
const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: 'User not found'
      });
    }
    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: 'User found',
      data: user
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

// update user details
const updateUser = async (req, res) => {
  try {
      const { name, email, address, phoneNumber } = req.body;
      const userId = req.user.user._id;
      const user = await userModel.findById(userId);
      if (!user) {
          return res.status(httpsStatusCode.BAD_REQUEST).json({
              success: false,
              message: "User not found",
          });
      }
      
      // Prepare the updated user data
      const updatedData = {
          name,
          email,
          address,
          phoneNumber,
          profilePicture:req.file?.filename || ''
      };

      // If a new profile picture is uploaded, include it
      // if (req.file) {
      //     updatedData.profilePicture = req.file.filename;
      // }

      const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
      
      if (!updatedUser) {
          return res.status(httpsStatusCode.BAD_REQUEST).json({
              success: false,
              message: "User not updated",
          });
      }
      
      return res.status(httpsStatusCode.OK).json({
          success: true,
          message: "User updated successfully",
          data: updatedUser,
      });
  } catch (error) {
      return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal server error",
          error: error.message,
      });
  }
};


module.exports = { registerUser, loginUser, getUser, updateUser };
