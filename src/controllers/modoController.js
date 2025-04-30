const modoService = require('../services/modoService');

// GET /modo/token
const crearToken = async (req, res) => {
    try {
        const token = await modoService.crearToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /modo/pago
const crearIntencionPago = async (req, res) => {
    try {
        const datosPago = req.body;
        const resultado = await modoService.crearIntencionPago(datosPago);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /modo/pago/:paymentId
const obtenerInfoPago = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const resultado = await modoService.obtenerInfoPago(paymentId);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /modo/pago/:paymentId/devolucion
const realizarDevolucion = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const datosDevolucion = req.body; // { amount: 250.15 }
        const resultado = await modoService.realizarDevolucion(paymentId, datosDevolucion);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearToken,
    crearIntencionPago,
    obtenerInfoPago,
    realizarDevolucion,
};
