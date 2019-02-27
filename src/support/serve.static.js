const file = require('./file.content')

const static = function(dirname, request, response) {
    if (request.url.indexOf('/static/scripts') == 0) {
        response.setHeader('content-type', 'application/javascript')
    }
    if (request.url.indexOf('/static/css') == 0) {
        response.setHeader('content-type', 'text/css')
    }
    if (request.url.indexOf('/static/images') == 0) {
        if (request.url.indexOf('.ico') !=-1 ) {
            response.setHeader('content-type', 'image/x-icon')
        }
        if (request.url.indexOf('.svg') !=-1 ) {
            response.setHeader('content-type', 'image/svg+xml')
        }
        if (request.url.indexOf('.png') !=-1 ) {
            response.setHeader('content-type', 'image/png')
        }
    }
    response.write(file(request.url, dirname))
    response.end();
}

module.exports = static
