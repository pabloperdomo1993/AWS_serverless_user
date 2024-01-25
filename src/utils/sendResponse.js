const sendResponse = (status, result) => {
    return {
        statusCode: status,
        body: JSON.stringify(
          {
            message: result
          }
        )
    };
};

module.exports = {
    sendResponse
}