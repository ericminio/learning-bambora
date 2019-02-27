const extractBody = (request, callback) => {
    var body = ''
    request.on('data', (chunk) => {
        body += chunk;
    })
    request.on('end', () => {
        callback(JSON.parse(body))
    })
}
module.exports = extractBody
