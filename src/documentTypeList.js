const { dynamodb } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');

module.exports.documentTypeList = async (event) => {
    const result = await dynamodb.scan({
        TableName: 'documentTypesTable'
    }).promise();

    return sendResponse(200, result.Items);
}