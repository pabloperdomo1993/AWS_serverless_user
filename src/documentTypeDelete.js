const { dynamodb } = require('./const/providers');
const { sendResponse } = require('./utils/sendResponse');

module.exports.documentTypeDelete = async (event) => {
    const { idDocumentType } = JSON.parse(event.body);

    try {
        await dynamodb.delete({
            TableName: 'documentTypesTable',
            Key: {
                idDocumentType: idDocumentType
            }
        }).promise();

        return sendResponse(200, 'Deleted document type successfully!');
    } catch (error) {
        return sendResponse(400, error);
    }
}