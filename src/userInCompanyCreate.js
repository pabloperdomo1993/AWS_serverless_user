const { dynamodb } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');
const { v4: uuidV4 } = require('uuid');

module.exports.userInCompanyCreate = async (event) => {
    const { name, idDocumentType, documentNumber, idCompanyType } = JSON.parse(event.body);
    const createdDate = new Date();
    
    try {
        await dynamodb.put({
            TableName: 'usersInCompanyTable',
            Item: {
                idUser: uuidV4(),
                name: name,
                idDocumentType: idDocumentType,
                documentNumber: documentNumber,
                idCompanyType: idCompanyType,
                createdBy: '',
                createdDate: createdDate.toString(),
                updatedBy: '',
                updatedDate: '',
            }
        }).promise();
        
        return sendResponse(200, 'Created user in company successfully!');
    } catch (error) {
        return sendResponse(400, error);
    }
}