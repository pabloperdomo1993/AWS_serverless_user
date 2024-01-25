const { cognito } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');

module.exports.userForgotPassword = async (event) => {

    const { email } = JSON.parse(event.body);
    const clientId = '78hdot016p0se05g9i523rtmjo';

    try {
        const result = await cognito.forgotPassword({
            ClientId: clientId,
            Username: email
        }).promise();

        return sendResponse(200, { message: 'Se ha enviado link de recuperación de contraseña', data: result});
    } catch (error) {
        return sendResponse(400, { message: 'Usuario no existe'});
    }
}