const { dynamodb } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');
const { v4: uuidV4 } = require('uuid');

module.exports.companyTypeCreate = async (event) => {
    const { name } = JSON.parse(event.body);

    try {
        await dynamodb.put({
            TableName: 'companyTypesTable',
            Item: {
                idCompanyType: uuidV4(),
                name: name
            }
        }).promise();
        
        return sendResponse(200, 'Created company type successfully!');
    } catch (error) {
        return sendResponse(400, error);
    }
}