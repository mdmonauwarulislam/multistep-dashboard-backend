// userRoutes.js
const express = require('express');
const Router = express.Router();
const { registerUser, loginUser, getUser, updateUser } = require('../controllers/userController');
const upload = require('../middleware/multerMiddleware');
const { verifyToken } = require('../middleware/authMiddleware'); 
Router.post('/register', registerUser);
Router.post('/login', loginUser);
Router.get('/user/:id', getUser);
Router.post("/upload-profile", upload.single("profilePicture"));
Router.put('/user/:id', verifyToken,upload.single('profilePicture'), updateUser); 

module.exports = Router;
