const { dynamodb } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');
const { v4: uuidV4 } = require('uuid');

module.exports.personUserCreate = async (event) => {
    const { names, lastNames, idDocumentType, documentNumber, phoneNumber, idUserType, email } = JSON.parse(event.body);
    const createdDate = new Date();

    try {
        await dynamodb.put({
            TableName: 'personUsersTable',
            Item: {
                idUser: uuidV4(),
                names: names,
                lastNames: lastNames,
                idDocumentType: idDocumentType,
                documentNumber: documentNumber,
                email: email,
                phoneNumber: phoneNumber,
                idUserType: idUserType,
                createdBy: '',
                createdDate: createdDate.toString(),
                updatedBy: '',
                updatedDate: '',
            }
        }).promise();
        
        return sendResponse(200, 'Created person user successfully!');
    } catch (error) {
        return sendResponse(400, error);
    }
}