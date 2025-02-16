const taskModel = require('../model/tasks.model')

module.exports.createTask = async (req, res, next) => {
    try {
        const {title, description, dueDate, priority, isCompleted} = req.body;
        const userId = req.user._id;

        const newTask = new taskModel({
            title,
            description,
            dueDate,
            priority,
            isCompleted,
            userId,
        });

        await newTask.save();
        res.status(201).json({message: 'Task created successfully', task: newTask});
        
    }
    catch(err) {
        res.status(500).json({message: 'Server error', error: err.message})     
    }
};

module.exports.getTasks = async (req, res, next) => {

    try {
        const userId = req.user._id;
        console.log(userId)
        const tasks = await taskModel.find({userId})
        
        res.status(200).json({tasks})
    }
    catch(err) {
        res.status(400).json({message: 'Error', error: err.message})
    }
}

module.exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, isCompleted } = req.body;
        const userId = req.user._id;

        const updatedTask = await taskModel.findOneAndUpdate(
            { _id: id, userId },
            { title, description, dueDate, priority, isCompleted },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const deletedTask = await taskModel.findOneAndDelete({ _id: id, userId });

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};