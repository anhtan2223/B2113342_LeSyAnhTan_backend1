class API_Error extends Error {
    constructor(statusCode , message)
    {
        super()
        this.status = statusCode 
        this.message = message
    }
}
module.exports = API_Error