const express = require('express');
const taskModel = require('../model/tasks.model');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

// POST /api/tasks
router.post('/tasks', authMiddleware.authuser, tasksController.createTask);

router.get('/tasks', authMiddleware.authuser, tasksController.getTasks);

router.put('/tasks/:id', authMiddleware.authuser, tasksController.updateTask);

router.delete('/tasks/:id', authMiddleware.authuser, tasksController.deleteTask);


module.exports = router;