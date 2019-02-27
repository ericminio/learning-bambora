var request = require('request')
var base64 = require('base-64')
var utf8 = require('utf8')

var payment = function(req, response) {
    var body = ''
    req.on('data', (chunk) => {
        body += chunk;
    })
    req.on('end', () => {
        var message = JSON.parse(body)
        var data = JSON.stringify({
            amount: 10.00,
            language: 'en',
            term_url: 'http://0.0.0.0:5000/payment/card/callback',
            comments: '',
            payment_method: 'token',
            token: {
                'code': message.token,
                'name': message.name
            }
        })
        var passcode = process.env.MERCHANT_ID + ':' + process.env.API_PASSCODE
        passcode = base64.encode(utf8.encode(passcode))
        var options = {
            url: 'https://api.na.bambora.com/v1/payments',
            headers: {
                'Authorization': 'Passcode ' + passcode,
                'Content-Type': 'application/json'
            },
            body: data
        }
        request.post(options, function(err, resp, body) {
            response.write(body)
            response.end();
        })
    })

}

module.exports = {
    payment: payment
}
