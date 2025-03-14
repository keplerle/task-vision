const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
    assignedTo: String,
    dueDate: Date
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
