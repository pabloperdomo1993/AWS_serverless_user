const { dynamodb } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');
const { v4: uuidV4 } = require('uuid');

module.exports.companyUserCreate = async (event) => {
    const { name, idDocumentType, documentNumber, idCompanyType } = JSON.parse(event.body);
    const createdDate = new Date();

    try {
        await dynamodb.put({
            TableName: 'companyUsersTable',
            Item: {
                idCompanyUser: uuidV4(),
                name: name,
                idDocumentType: idDocumentType,
                documentNumber: documentNumber,
                createdBy: '',
                createdDate: createdDate.toString(),
                updatedBy: '',
                updatedDate: '',
                idCompanyType: idCompanyType 
            }
        }).promise();
        
        return sendResponse(200, 'Created company user successfully!');
    } catch (error) {
        return sendResponse(400, error);
    }
}