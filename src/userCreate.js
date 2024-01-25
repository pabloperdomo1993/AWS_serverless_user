const { cognito } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');

module.exports.userCreate = async (event) => {
  const { email, name, password } = JSON.parse(event.body);
  const userPoolId = 'us-east-2_ko60oueqs';

  try {
    const result = await cognito.adminCreateUser({
      UserPoolId: userPoolId,
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'name',
          Value: name
        },
        {
          Name: 'email_verified',
          Value: 'true'
        }
      ],
      MessageAction: 'SUPPRESS'
    }).promise();
  
    if (result.User) {
      await cognito.adminSetUserPassword({
        Password: password,
        UserPoolId: userPoolId,
        Username: email,
        Permanent: true
      }).promise();
    }
    
    return sendResponse(200, 'User created successfully!');
  } catch (error) {
    return sendResponse(400, error);
  }
};
