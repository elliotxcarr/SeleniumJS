const {Builder, By, until, promise} = require("selenium-webdriver");
const assert = require("assert");


//The program contains lots of repeated code, due to elements needing to be located again after an action is performed
//If this isnt done, program throws "Stale element" error
//Still looking for a way around this

//Program currently checks that the legend text is appropriate to the option selected (where there is a legend) and that the previous option is deselected
//Will need to be developed with a method of testing MapboxGL 

//let originalXpath = "/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div[5]/canvas";
//let changedXpath = "/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[2]/div[6]/canvas";

async function checkWeatherOptions(){
    
    let driver = await new Builder().forBrowser('chrome').build();

    try{

        //log in
        await driver.get("https://vfitest.voyagerww.com/login/");

        await driver.findElement(By.id("ember362")).sendKeys("auto.test@voyagerww.com");

        await driver.findElement(By.id("ember363")).sendKeys("74AD20648061");

        await driver.findElement(By.xpath("//*[@id=\"login\"]/button/span")).click();


        const pageTitle = await driver.getTitle();
        assert.equal(pageTitle, "VFI");
        await driver.manage().setTimeouts({ implicit: 10000 });
        let mapLayers = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div"));
        await mapLayers.click();

        //Assign variable for weather header and click
        let weather = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]"));                                                 
        await weather.click();


        //Assign and click wind stream option
        let windStream = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[1]/span"))
        await windStream.click();
                       
        //create legend text variable
        let legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});

        
        //click wind barb 
        let windBarb = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[2]/span"));
        await windBarb.click();

        //update legend layer
        legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});
       
        //check legend layer text has changed
        assert.equal(legendLayerText, "wind-barb");

        //re-define windstream
        windStream = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[1]/span"));

        //check wind stream is no longer selected
        assert.equal(await windStream.isSelected(), false);



        let gust = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[3]/span"));
        await gust.click();

        legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});

        assert.equal(legendLayerText, "gust");

        windBarb = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[2]/span"));

        assert.equal(await windBarb.isSelected(), false);




        let surfacePressure = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[4]/span"));
        await surfacePressure.click();

        gust = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[3]/span"));
        assert.equal(await gust.isSelected(), false);




        let airTemp = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[5]/span"));
        await airTemp.click();

        surfacePressure = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[4]/span"));
        assert.equal(await surfacePressure.isSelected(), false);


        let precipMMH = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[6]/span"));
        await precipMMH.click();
        airTemp = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[5]/span"));
        assert.equal(await airTemp.isSelected(), false);

        


        let precipShade = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[7]/span"));
        await precipShade.click();

        legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});
        
        assert.equal(legendLayerText, "precipitation-shaded");
        
        precipMMH = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[6]/span"))
        
        assert.equal(await precipMMH.isSelected(), false);




        let sigWaveHeight = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[8]/span"))
        await sigWaveHeight.click();

        precipShade = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[7]/span"))
        assert.equal(await precipShade.isSelected(), false);




        let primaryWaveHeight = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[9]/span"));
        await primaryWaveHeight.click();
  
        legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});
        assert.equal(legendLayerText, "primary-wave-height-direction");

        sigWaveHeight = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[8]/span"));
        assert.equal(await sigWaveHeight.isSelected(), false);


        
        let primaryWavePeriod = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[10]/span"));
        await primaryWavePeriod.click();

        legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});
        assert.equal(legendLayerText, "primary-wave-period");

        primaryWaveHeight = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[8]/span"));
        assert.equal(await primaryWaveHeight.isSelected(), false);



        let swellDirect = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[11]/span"));
        await swellDirect.click();

        legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});
        assert.equal(legendLayerText, "swell-height-direction");

        primaryWavePeriod = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[10]/span"));
        assert.equal(await primaryWavePeriod.isSelected(), false);



        let swellPeriod = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[12]/span"));
        await swellPeriod.click();

        legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});
        assert.equal(legendLayerText, "swell-period");

        swellDirect = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[11]/span"));
        assert.equal(await swellDirect.isSelected(), false);



        let surfaceCurrent = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[13]/span"));
        await surfaceCurrent.click();

        legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});
        assert.equal(legendLayerText, "sea-surface-current");

        swellPeriod = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[12]/span"));
        assert.equal(await swellPeriod.isSelected(), false);



        let surfaceTemp = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[14]/span"));
        await surfaceTemp.click();

        surfaceCurrent = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[13]/span"));
        assert.equal(await surfaceCurrent.isSelected(), false);



        let iceCoverage = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[15]/span"));
        await iceCoverage.click();

        legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});
        assert.equal(legendLayerText, "sea-ice-coverage");

        surfaceTemp = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[14]/span"));
        assert.equal(await surfaceTemp.isSelected(), false);


        //checking that legend is still displayed when weather header is minimised
        weather = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/div/h3"));
        await weather.click();

        legendLayerText = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div")).getAttribute("class").then(value =>  {return value});
        assert.equal(legendLayerText, "sea-ice-coverage");

        await weather.click();

        let iceThick = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[16]/span"));
        await iceThick.click();

        iceCoverage = await driver.findElement(By.xpath("//*[@id=\"map-b\"]/div[1]/div[2]/div[2]/section[3]/ul/li[15]/span"));
        assert.equal(await iceCoverage.isSelected(), false);


    }


    finally{

       await driver.quit();

    }
}

checkWeatherOptions();