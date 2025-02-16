const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: [3, "Title must be at least 3 characters"]
    },
    description: {
        type: String,
        minlength: [5, "Description must be at least 5 characters"]
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

taskSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;
