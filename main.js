const puppeteer = require('puppeteer')

const main = async () => {
        
    const browser = await puppeteer.launch({ 
        headless: 'new',
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    })
    const page = await browser.newPage()

    await page.goto('https://pesquisa.meuoutback.com.br/login')

    await page.waitForSelector('button#onetrust-accept-btn-handler')
    await page.$eval('button#onetrust-accept-btn-handler', button => button.click())
    
    await wait(2000)

    await page.$eval('input[name="email"]', (input, value) => input.value = value, process.env.OUTBACK_EMAIL)
    await page.$eval('input[name="password"]', (input, value) => input.value = value, process.env.OUTBACK_PASSWORD)

    await page.$eval('#send', button => button.click())

    // https://pesquisa.meuoutback.com.br/pesquisa-de-satisfacao

    await page.waitForNavigation()

    await page.$eval('input[name="cnpj"]', input => input.value = '17.261.661/0038-65')
    await page.$eval('input[name="CCO"]', input => input.value = '3TZP7XF87410')
    await page.$eval('input[name="data"]', input => {
        const date = new Date()
        input.value = date.toLocaleDateString('en-GB')
    })
    await page.$eval('input[name="hora"]', input => input.value = '20:00')
    await page.$eval('input[name="aceite"]', input => input.checked = true)
    await page.$eval('input[type="submit"]', input => input.click())

    // https://pesquisa.meuoutback.com.br/pesquisa-de-satisfacao/perguntas
    
    await page.waitForSelector('#answer-form div.input-group')

    for (let i = 0; i < 13; i++) {
        await selectLastAndProceed(page)
    }

    // https://pesquisa.meuoutback.com.br/pesquisa-de-satisfacao/fim/[id-pesquisa]

    await page.waitForSelector('img[src="https://bloomin-crm-statics-files.s3.amazonaws.com/cupons_crm/crm_202107222007213291.jpeg"]')
    await page.$eval(
        'img[src="https://bloomin-crm-statics-files.s3.amazonaws.com/cupons_crm/crm_202107222007213291.jpeg"]', 
        input => input.click()
    )

    await page.$eval('button[type="submit"]', input => input.click())

    await page.waitForSelector('#bt-download')
    const downloadLink = await page.evaluate(() => {
        const element = document.getElementById('bt-download')
        return element ? element.href : null
    })

    console.log(downloadLink)

}

const selectLastAndProceed = async page => {
    await wait(2000)
    const elements = await page.$$('#answer-form div.input-group')
    for (let i = 0; i < elements.length; i++) {
        await elements[i].click()
    }
    await page.evaluate(() => saveAnswer(false))
    console.log('Page successfully answered')
}

const wait = ms => {
    return new Promise(res => setTimeout(res, ms))
}

if (require.main === module) {
    main()
}
