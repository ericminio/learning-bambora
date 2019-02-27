var request = require('request')
var base64 = require('base-64')
var utf8 = require('utf8')

var payment = (token, callback)=>{
    var passcode = process.env.MERCHANT_ID + ':' + process.env.API_PASSCODE
    var payment = {
        url: 'https://api.na.bambora.com/v1/payments',
        headers: {
            'Authorization': 'Passcode ' + base64.encode(utf8.encode(passcode)),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: 10.00,
            payment_method: 'token',
            token: {
                'code': token,
                'name': 'Jane Doe'
            }
        })
    }
    request.post(payment, function(err, resp, body) {
        callback(body)
    })
}

module.exports = payment
