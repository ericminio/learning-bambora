const { expect } = require('chai')
var { tokenization, payment } = require('../src/bambora')

describe('naive implementation', function() {

    it('requires MERCHANT_ID', ()=>{
        expect(process.env.MERCHANT_ID).not.to.equal(undefined)
    })
    it('requires API_PASSCODE', ()=>{
        expect(process.env.API_PASSCODE).not.to.equal(undefined)
    })

    it('works', (done)=> {
        tokenization({
            cvd: 123,
            expiry_month: 10,
            expiry_year: 22,
            number: 4030000010001234
        }, (token)=>{
            payment(token, (received)=>{
                expect(received.message).to.equal('Approved')
                done()
            })
        })
    })
})
