const express = require('express');
const app = express();
const modoRoutes = require('./routes/modoRoutes');

app.use(express.json()); // Para poder leer JSON en los request
app.use('/modo', modoRoutes); // Todas las rutas empezarán con /modo

module.exports = app;