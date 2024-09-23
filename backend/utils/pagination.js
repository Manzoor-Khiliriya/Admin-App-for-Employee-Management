function getPaginationParams(query,defaultLimit=5){
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || defaultLimit;
    const offset = (page-1) * limit;
    return {
        page,
        limit,
        offset
    }
}

module.exports = {
    getPaginationParams
}