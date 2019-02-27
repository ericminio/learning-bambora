const { expect } = require('chai')
var request = require('request')
var base64 = require('base-64')
var utf8 = require('utf8')

describe('naive implementation', function() {

    it('requires MERCHANT_ID', ()=>{
        expect(process.env.MERCHANT_ID).not.to.equal(undefined)
    })
    it('requires API_PASSCODE', ()=>{
        expect(process.env.API_PASSCODE).not.to.equal(undefined)
    })

    it('works', (done)=> {
        var tokenization = {
            url: 'https://www.beanstream.com/scripts/tokenization/tokens',
            body: JSON.stringify({
                cvd: 123,
                expiry_month: 10,
                expiry_year: 22,
                number: 4030000010001234
            })
        }
        request.post(tokenization, function(err, resp, body) {
            expect(err).to.equal(null)

            var message = JSON.parse(body)
            expect(message.token).not.to.equal(undefined)

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
                        'code': message.token,
                        'name': 'Jane Doe'
                    }
                })
            }
            request.post(payment, function(err, resp, body) {
                expect(err).to.equal(null)
                var received = JSON.parse(body)

                expect(received.message).to.equal('Approved')
                done()
            })
        })
    })
})
