const axios = require('axios'); // Para peticiones a APIs externas.
const {
    baseUrl,
    clientId,
    clientSecret,
    storeId,
    userAgent
} = require('../../config/modoConfig');

const modoInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
    },
});

const crearToken = async () => {
    try {
        const response = await modoInstance.post('/middleman/token', {
            username: clientId,
            password: clientSecret,
        });
        return response.data.accessToken;
    } catch (error) {
        //Intenta obtner el mensaje de error de la respuesta de la api de modo o el mensaje de error por defecto de axios
        console.error(error.response?.data);  // 
        throw new Error('Error creando el token: ' + (error.response?.data?.message || error.message));
    }
};

const crearIntencionPago = async (data) => {
    try {
        const token = await crearToken();
        const response = await modoInstance.post(
            '/ecommerce/payment-intention',
            // Body de la petición, se le agrega el storeId al body
            // ya que la API de Modo no permite agregarlo en los headers
            // y es necesario para crear la intención de pago
            {
                //...data es spread syntax. Significa:
                //"copiá todas las propiedades que vengan dentro del objeto data y ponelas acá".
                ...data,
                storeId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error creando intención de pago: ' + (error.response?.data?.message || error.message));
    }
};

const obtenerInfoPago = async (paymentId) => {
    try {
        const token = await crearToken();
        const response = await modoInstance.get(
            `/ecommerce/payment-intention/${paymentId}/data`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error obteniendo información del pago: ' + (error.response?.data?.message || error.message));
    }
};

const realizarDevolucion = async (paymentId, data) => {
    try {
        const token = await crearToken();
        const response = await modoInstance.post(
            `/ecommerce/payment-intention/${paymentId}/refund`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error realizando el devolucion: ' + (error.response?.data?.message || error.message));
    }
};

module.exports = {
    crearToken,
    crearIntencionPago,
    obtenerInfoPago,
    realizarDevolucion,
};