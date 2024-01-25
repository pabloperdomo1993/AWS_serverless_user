const { cognito } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');

module.exports.userSavePassword = async (event) => {
    const { email, password, confirmationCode } = JSON.parse(event.body);
    const clientId = '78hdot016p0se05g9i523rtmjo';

    try {
        await cognito.confirmForgotPassword({
            ClientId: clientId,
            ConfirmationCode: confirmationCode,
            Password: password,
            Username: email
        }).promise();

        return sendResponse(200, { message: 'Contraseña actualizada correctamente'});
    } catch (error) {
        return sendResponse(400, { Error: error });   
    }
}