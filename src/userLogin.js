const { cognito } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');
const { formatUseAttributes } = require('./utils/formatUserAttribute');

module.exports.userLogin = async (event) => {
    const { email, password } = JSON.parse(event.body);
    const userPoolId = 'us-east-2_ko60oueqs';
    const clientId = '78hdot016p0se05g9i523rtmjo';

    try {
        const result = await cognito.adminInitiateAuth({
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            UserPoolId: userPoolId,
            ClientId: clientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        }).promise();
        
        console.log('- adminInitiateAuth', result);

        const dataUser = await cognito.getUser({
            AccessToken: result.AuthenticationResult.AccessToken
        }).promise();
        
        return sendResponse(200, {
            ...formatUseAttributes(dataUser.UserAttributes),
            ...result.AuthenticationResult
        });
    } catch (error) {
        return sendResponse(400, error);
    }
}