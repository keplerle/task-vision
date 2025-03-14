const mongoose = require('mongoose');

const dotenv = require('dotenv');
const express = require('express');
const taskRoutes = require('./routes/TasksRoute');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

dotenv.config();

app.use(express.json()); // Middleware pour lire le JSON dans les requêtes
app.use('/api', taskRoutes); // Utiliser les routes de tâches sous le chemin '/api'
const uri = process.env.MONGO_URI;

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');
  socket.on('taskUpdated', (updatedTask) => {
      console.log('Tâche mise à jour:', updatedTask);
      socket.broadcast.emit('updateTask', updatedTask);
  });

  socket.on('disconnect', () => {
      console.log('Un utilisateur est déconnecté');
  });
});

mongoose.connect(uri).then(() => {
    console.log('Connexion réussie à MongoDB!');
    server.listen(3000, () => {
      console.log('Serveur en cours d\'exécution sur le port 3000 avec Socket.io');
  });
}).catch((err) => {
    console.error('Erreur lors de la connexion à MongoDB :', err);
});







