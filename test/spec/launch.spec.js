const { browser } = require("@wdio/globals")

describe('Laucnh Blazedemo',() =>{
    it('shpuld launch web APP',async() =>{
        await browser.url('/reserve.php')
    })
})