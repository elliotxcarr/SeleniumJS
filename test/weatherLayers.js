const {Builder, By, until, promise} = require("selenium-webdriver");
var should = require("chai").should();

//The program contains lots of repeated code, due to elements needing to be located again after an action is performed
//If this isnt done, program throws "Stale element" error
//Still looking for a way around this

//Program currently checks that the legend text is appropriate to the option selected (where there is a legend) and that the previous option is deselected
//Havent found any element in the browser that represents the map change other than the XPath

let driver;

describe("login to VFI", function(){
    it("enters test user login details", async function() {
        driver = await new Builder().forBrowser('chrome').build()
        await driver
            .get("https://vfitest.voyagerww.com/login/")
        await driver
            .findElement(By.id("ember362"))
            .sendKeys("auto.test@voyagerww.com")
        await driver
            .findElement(By.id("ember363"))
            .sendKeys("74AD20648061")
    })
    it("successfully logs in", async function() {
        await driver
            .findElement(By.xpath("//*[@id=\"login\"]/button/span"))
            .click()
        const pageTitle = await driver.getTitle()
        pageTitle.should.equal("VFI")
        await driver.manage().setTimeouts({ implicit: 10000 })
    })
})

describe("open map layers panel", function() {
    it("opens map layers panel", async function() {
        let mapLayers = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div"));
        await mapLayers.click();
    })
    it("opens weather header in map layers panel", async function() {
        let weather = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]"));                                                 
        await weather.click();
    })
})

describe("toggle weather layers", function() {

    let weather, legendLayer, windStream, windBarb, gust, 
        surfacePressure, airTemp, precipMMH, 
        precipShade, sigWaveHeight, primaryWaveHeight, 
        primaryWavePeriod, swellDirect, swellPeriod, 
        surfaceCurrent, surfaceTemp, iceCoverage, iceThick


    it("toggles wind stream weather layer", async function() {
        windStream = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[1]/span"))
        await windStream.click()
        windStream.isSelected().then(value => value.should.equal(true))
    })
    checkLegendIsUpdated("wind-stream")

    it("toggles wind barb weather layer on, wind stream layer off", async function() {
        windBarb = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[2]/span"))
        await windBarb.click()
        windBarb.isSelected().then(value => value.should.equal(true))

        windStream = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[1]/span"))
        windStream.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsUpdated("wind-barb")

    it("toggles gust layer on, wind barb layer off", async function() {
        gust = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[3]/span"))
        await gust.click()
        gust.isSelected().then(value => value.should.equal(true))

        windBarb = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[2]/span"))
        windBarb.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsUpdated("gust")

    it("toggles surface pressure layer on, gust layer off", async function() {
        surfacePressure = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[4]/span"));
        await surfacePressure.click();
        surfacePressure.isSelected().then(value => value.should.equal(true))

        gust = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[3]/span"));
        gust.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsHidden()

    it("toggles air temperature layer on, surface pressure layer off", async function() {
        airTemp = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[5]/span"))
        await airTemp.click()
        airTemp.isSelected().then(value => value.should.equal(true))

        surfacePressure = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[4]/span"))
        surfacePressure.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsHidden()

    it("toggles precipitation MMH layer on, air temperature layer off", async function() {
        precipMMH = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[6]/span"))
        await precipMMH.click()
        precipMMH.isSelected().then(value => value.should.equal(true))

        airTemp = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[5]/span"))
        airTemp.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsHidden()

    it("toggles layer on, layer off", async function() {
        precipShade = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[7]/span"))
        await precipShade.click()
        precipShade.isSelected().then(value => value.should.equal(true))
        
        precipMMH = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[6]/span"))
        precipMMH.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsUpdated("precipitation-shaded")

    it("toggles significant wave height layer on, precipitation shaded layer off", async function() {
        sigWaveHeight = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[8]/span"))
        await sigWaveHeight.click()
        sigWaveHeight.isSelected().then(value => value.should.equal(true))

        precipShade = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[7]/span"))
        precipShade.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsHidden()

    it("toggles primary wave height direction layer on, significant wave height layer off", async function() {
        primaryWaveHeight = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[9]/span"))
        await primaryWaveHeight.click()
        primaryWaveHeight.isSelected().then(value => value.should.equal(true))

        sigWaveHeight = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[8]/span"))
        sigWaveHeight.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsUpdated("primary-wave-height-direction")

    it("toggles primary wave period layer on, primary wave height direction layer off", async function() {
        primaryWavePeriod = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[10]/span"))
        await primaryWavePeriod.click()
        primaryWavePeriod.isSelected().then(value => value.should.equal(true))

        primaryWaveHeight = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[8]/span"))
        primaryWaveHeight.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsUpdated("primary-wave-period")

    it("toggles swell height direction layer on, primary wave period layer off", async function() {
        swellDirect = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[11]/span"));
        await swellDirect.click()
        swellDirect.isSelected().then(value => value.should.equal(true))

        primaryWavePeriod = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[10]/span"))
        primaryWavePeriod.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsUpdated("swell-height-direction")

    it("toggles swell period layer on, swell height direction layer off", async function() {
        swellPeriod = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[12]/span"))
        await swellPeriod.click()
        swellPeriod.isSelected().then(value => value.should.equal(true))

        swellDirect = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[11]/span"))
        swellDirect.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsUpdated("swell-period")

    it("toggles sea surface current layer on, swell period layer off", async function() {
        surfaceCurrent = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[13]/span"))
        await surfaceCurrent.click()
        surfaceCurrent.isSelected().then(value => value.should.equal(true))

        swellPeriod = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[12]/span"))
        swellPeriod.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsUpdated("sea-surface-current")

    it("toggles sea surface temperature layer on, sea surface current layer off", async function() {
        surfaceTemp = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[14]/span"))
        await surfaceTemp.click()
        surfaceTemp.isSelected().then(value => value.should.equal(true))

        surfaceCurrent = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[13]/span"))
        surfaceCurrent.isSelected().then(value => value.should.equal(false))
    })
    checkLegendIsHidden()

    it("toggles sea ice coverage layer on, sea surface temperature layer off", async function() {
        iceCoverage = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[15]/span"))
        await iceCoverage.click()
        iceCoverage.isSelected().then(value => value.should.equal(true))

        surfaceTemp = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[14]/span"))
        surfaceTemp.isSelected().then(value => value.should.equal(false))

    })
    checkLegendIsUpdated("sea-ice-coverage")

    it("continues to display legend when weather layer options are closed", async function() {
        weather = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/div/h3"));
        await weather.click();

        legendLayer = await driver
            .findElement(By.id("weather-key"))
            .isDisplayed()
        legendLayer.should.equal(true)

        await weather.click();
    })

    it("toggles sea ice thickness layer on, sea ice coverage layer off", async function() {
        iceThick = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[16]/span"))
        await iceThick.click()
        iceThick.isSelected().then(value => value.should.equal(true))

        iceCoverage = await driver
            .findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[15]/span"))
        iceCoverage.isSelected().then(value => value.should.equal(false))

    })
    checkLegendIsHidden()
})

function checkLegendIsHidden(){
    it("hides legend", async function() {
        await driver.manage().setTimeouts({ implicit: 10 })
        legendLayer = await driver
            .findElements(By.id("weather-key"))
        legendLayer.length.should.equal(0)
        await driver.manage().setTimeouts({ implicit: 1000 })
    })
}

function checkLegendIsUpdated(layerText){
    it("updates legend to '" + layerText + "'", async function() {
        let legendLayer = await driver
            .findElement(By.id("weather-key"))
            .isDisplayed()
        legendLayer.should.equal(true)

        let legendLayerText = await driver
            .findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div"))
            .getAttribute("class")
            .then(value => {return value})
        legendLayerText.should.equal(layerText)
    })
}