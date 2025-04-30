const app = require('./src/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Rutas para probar en postman:
// GET http://localhost:3000/modo/token
// POST http://localhost:3000/modo/pago
// GET http://localhost:3000/modo/pago/<paymentId>
// POST http://localhost:3000/modo/pago/<paymentId>/devolucion
