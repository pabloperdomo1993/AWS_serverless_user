const { cognito } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');

module.exports.userDelete = async (event) => {
    const { email } = JSON.parse(event.body);
    const userPoolId = 'us-east-2_ko60oueqs';

    try {
        const result = await cognito.adminDeleteUser({
            UserPoolId: userPoolId,
            Username: email
        }).promise();
        
        return sendResponse(200, 'User deleted successfully!');
    } catch (error) {
        return sendResponse(400, error);
    }
}