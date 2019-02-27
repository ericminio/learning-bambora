const { createServer, get } = require('http')
const { payment } = require('./payment')
const port = 5000
const read = (file)=>{
    var fs = require('fs')
    var path = require('path')
    var data = fs.readFileSync(path.join(__dirname, file)).toString()

    return data
}
const readraw = (file)=>{
    var fs = require('fs')
    var path = require('path')
    var data = fs.readFileSync(path.join(__dirname, file))

    return data
}
const server = {
    start: function(done) {
        this.internal = createServer((request, response)=>{
            if (request.url == '/payment/card') {
                payment(request, response)
            }
            else {
                if (request.url.indexOf('/static/scripts') == 0) {
                    response.setHeader('content-type', 'application/javascript')
                    response.write(read(request.url))
                }
                if (request.url.indexOf('/static/css') == 0) {
                    response.setHeader('content-type', 'text/css')
                    response.write(read(request.url))
                }
                if (request.url.indexOf('/static/images') == 0) {
                    if (request.url.indexOf('.ico') !=-1 ) {
                        response.setHeader('content-type', 'image/x-icon')
                        response.write(readraw(request.url))
                    }
                    if (request.url.indexOf('.svg') !=-1 ) {
                        response.setHeader('content-type', 'image/svg+xml')
                        response.write(readraw(request.url))
                    }
                    if (request.url.indexOf('.png') !=-1 ) {
                        response.setHeader('content-type', 'image/png')
                        response.write(readraw(request.url))
                    }
                }
                if (request.url == '/') {
                    response.setHeader('content-type', 'text/html')
                    response.write(read('checkout.html'))
                }
                response.end();
            }
        })
        this.internal.listen(port, done);
    }
}

server.start(()=>{
    console.log('listening on port', port)
})
