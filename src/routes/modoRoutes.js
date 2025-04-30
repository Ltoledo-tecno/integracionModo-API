const express = require('express');
const router = express.Router();
const modoController = require('../controllers/modoController');

// Obtener un token de Modo
router.get('/token', modoController.crearToken);

// Crear una intencion de pago
router.post('/pago', modoController.crearIntencionPago);

// Obtener informacion del pago por ID
router.get('/pago/:paymentId', modoController.obtenerInfoPago);

// Realizar una devolucion sobre un pago
router.post('/pago/:paymentId/devolucion', modoController.realizarDevolucion);

module.exports = router;