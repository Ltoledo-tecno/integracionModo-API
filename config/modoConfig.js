require('dotenv').config();

module.exports = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  storeId: process.env.STORE_ID,
  baseUrl: process.env.MODO_BASE_URL,
  userAgent: 'EmpresaFutura',
};