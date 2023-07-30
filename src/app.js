const express = require('express');
const app = express();
const router = require('./router/index')(); // Invocar la función para obtener el router

// Middleware para procesar JSON 
app.use(express.json());

// Enlace del router
app.use('/api', router);

module.exports = app;
