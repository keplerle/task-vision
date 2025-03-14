const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: 'Tâche non trouvée', error });
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Données invalides', error });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour', error });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la suppression', error });
    }
};
