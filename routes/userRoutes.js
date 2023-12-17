import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

// Define the route for getting all users
router.get('/getAllUsers', userController.getUsers);

// Define the route for getting a single user by id
router.get('/getUser/:id', userController.getUser);

// Define the route for creating a new user
router.post('/createUser', userController.createUser);

// Define the route for updating a user
router.put('/updateUser/:id', userController.updateUser);

// Define the route for deleting a user
router.delete('/deleteUser/:id', userController.deleteUser);

export default router;
