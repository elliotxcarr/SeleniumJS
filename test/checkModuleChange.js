const {Builder, By, until, promise} = require("selenium-webdriver");
const assert = require("assert");



async function checkModuleChange(){

    let driver = await new Builder().forBrowser('chrome').build();

    try{

        //log in
        await driver.get("https://vfitest.voyagerww.com/login/");

        await driver.findElement(By.id("ember362")).sendKeys("auto.test@voyagerww.com");

        await driver.findElement(By.id("ember363")).sendKeys("74AD20648061");

        await driver.findElement(By.xpath("//*[@id=\"login\"]/button/span")).click();

        await driver.manage().setTimeouts({ implicit: 10000 });
        //confirm user is directed to main page
        const pageTitle = await driver.getTitle();
        assert.equal(pageTitle, "VFI");

        
        //find and click drop down fleet selection
        let dropdown = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[1]/div[1]/div[1]"));
        await dropdown.click();

        //find and click
        let ALKONOS = await driver.findElement(By.xpath("/html/body/div[2]/div/ul/li[35]"));
        await ALKONOS.click();


        //find and confirm a vessel from the ALKONOS fleet is displayed 
        let vessel = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div[5]/div[2]"));
        assert.equal(await vessel.isEnabled(), true);


        await driver.sleep(3000);

        //find and click Compliance icon
        let complianceIcon = await driver.findElement(By.xpath("//*[@id=\"main-menu\"]/div/div[1]/div[3]/div[1]/div[1]"));
        await complianceIcon.click();


        //confirm that there is no sub option for new editions
        let newEditionsCount = await driver.findElements(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[4]"));
        assert.equal(newEditionsCount.length, 0 );


        //select the compliance header to close the submenu
        let complianceHeader = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[1]/div[2]"));
        await complianceHeader.click();


        //click the chevron arrows to compress nav menu
        let chevronsExpand = await driver.findElement(By.xpath("//*[@id=\"menu-toggle\"]/div[2]"));
        await chevronsExpand.click();



        //click drop down fleet selection again
        dropdown = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[1]/div[1]/div[1]"));
        await dropdown.click();


        //find and selected ADNATCO fleet
        let ADNATCO = await driver.findElement(By.xpath("/html/body/div[2]/div/ul/li[13]"));
        await ADNATCO.click();

        await driver.sleep(3000);
        //find and confirm a vessel from the ADNATCO fleet is displayed 
        let adnatcoVessel = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div[5]/div[1]"));
        assert.equal(await adnatcoVessel.isEnabled(), true);


        //find and click compliance icon again
        complianceIcon = await driver.findElement(By.xpath("//*[@id=\"main-menu\"]/div/div[1]/div[3]/div[1]/div[1]"));
        await complianceIcon.click();


        //confirm that there is an option for New Editions
        newEditionsCount = await driver.findElements(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[4]"));
        assert.equal(newEditionsCount.length, 1);

        let newEditionsOption = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[4]/div[2]"));
        await newEditionsOption.click();

        let newEdiContent = await driver.findElements(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[2]/div[2]/div[2]"));
        assert.equal(newEdiContent.length, 1);
    }
    finally{
        await driver.close();
    }
}

checkModuleChange();