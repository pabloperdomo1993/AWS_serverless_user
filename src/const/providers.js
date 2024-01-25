const AWS = require('aws-sdk');

const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = {
    cognito,
    dynamodb
}