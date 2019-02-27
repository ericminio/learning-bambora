var request = require('request')
var base64 = require('base-64')
var utf8 = require('utf8')
var payment = require('./bambora/payment')

var endpoint = function(request, response) {
    var body = ''
    request.on('data', (chunk) => {
        body += chunk;
    })
    request.on('end', () => {
        var token = JSON.parse(body).token
        payment(token, (received)=>{
            response.write(received)
            response.end();
        })
    })

}

module.exports = {
    payment: endpoint
}
