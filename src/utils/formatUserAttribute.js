const formatUseAttributes = (attributes) => {
    return attributes.reduce((acc, { Name, Value}) => {
        return { ...acc, [Name]: Value};
    }, {});
}

module.exports = {
    formatUseAttributes
}