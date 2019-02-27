const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
require('../src/server')

describe('web interface', function() {

    var server
    var driver

    before((done)=> {
        driver = new Builder().forBrowser('firefox').build()
        done()
    })

    after(async ()=> {
        await driver.quit()
    })

    it('works', async ()=> {
        await driver.get('http://localhost:5000')
        let panel = await driver.findElement(By.css('#panel-card div form div label'))
        await panel.click()

        let cardFrame = await driver.findElement(By.name('bambora-card-number-iframe'))
        await driver.switchTo().frame(cardFrame)
        let card = await driver.findElement(By.id('bambora-card-number'))
        await card.clear()
        await card.sendKeys('4030 0000 1000 1234')
        await driver.switchTo().defaultContent()

        let expiryFrame = await driver.findElement(By.name('bambora-expiry-iframe'))
        await driver.switchTo().frame(expiryFrame)
        let expiry = await driver.findElement(By.id('bambora-expiry'))
        await expiry.clear()
        await expiry.sendKeys('10/22')
        await driver.switchTo().defaultContent()

        let cvvFrame = await driver.findElement(By.name('bambora-cvv-iframe'))
        await driver.switchTo().frame(cvvFrame)
        let cvv = await driver.findElement(By.id('bambora-cvv'))
        await cvv.clear()
        await cvv.sendKeys('123')
        await driver.switchTo().defaultContent()

        let submit = await driver.findElement(By.id('card-payment-btn'))
        await submit.click()
        await driver.sleep(3000)

        let feedback = await driver.findElement(By.css('h3'))
        let text = await feedback.getText()

        expect(text).to.equal('Payment approved - hooray!')
    })
})
