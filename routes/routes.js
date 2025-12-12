const express = require('express');
const router = express.Router();
const Controller = require('../controller/taskController')

router.get('/api/tasks',Controller.getAllTasks);
router.get('/api/tasks/:id',Controller.getTaskById);
router.put('/api/tasks/:id',Controller.updateTask);
router.post('/api/tasks',Controller.createTask);
router.delete('/api/tasks/:id',Controller.deleteTask);
//Bool

module.exports = router;

