const { createServer } = require('http')
const { extractBody, file, serveStatic } = require('./support')
const { payment } = require('./bambora')

const port = 5000
const server = {
    start: function(done) {
        this.internal = createServer((request, response)=>{
            if (request.url == '/') {
                response.setHeader('content-type', 'text/html')
                response.write(file('checkout.html', __dirname))
                response.end();
            }
            if (request.url.indexOf('/static/') == 0) {
                serveStatic(__dirname, request, response)
            }
            if (request.url == '/payment/card') {
                extractBody(request, (body)=>{
                    payment(body.token, (message)=>{
                        response.setHeader('content-type', 'application/json')
                        response.write(message)
                        response.end();
                    })
                })
            }
        })
        this.internal.listen(port, done);
    }
}

server.start(()=>{
    console.log('listening on port', port)
})
