const {Builder, By, until, promise} = require("selenium-webdriver");
const assert = require("assert");


async function checkOrders(){

    let driver = await new Builder().forBrowser('chrome').build();

    try{

        //log in
        await driver.get("https://vfitest.voyagerww.com/login/");

        await driver.findElement(By.id("ember362")).sendKeys("elliot.carr@voyagerww.com");

        await driver.findElement(By.id("ember363")).sendKeys("PatrykJekal2022");

        await driver.findElement(By.xpath("//*[@id=\"login\"]/button/span")).click();


        //confirm user is directed to main page
        const pageTitle = await driver.getTitle();
        assert.equal(pageTitle, "VFI");
        
        
        await driver.manage().setTimeouts({ implicit: 15000 });


        //find and click drop down fleet selection
        let dropdown = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[1]/div[1]/div[1]"));
        await dropdown.click();


        //find and click
        let ADNATCO = await driver.findElement(By.xpath("/html/body/div[2]/div/ul/li[13]"));
        await ADNATCO.click();

        
        await driver.manage().setTimeouts({ implicit: 30000 });


        //find and confirm a vessel from the ADNATCO fleet is displayed 
        let vessel = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div[5]/div[1]"));
        
        assert.equal(await vessel.isEnabled(), true);

        
        //find and click account icon from side menu
        let accountIcon = await driver.findElement(By.xpath("//*[@id=\"main-menu\"]/div/div[1]/div[6]/div[1]/div[1]"));
        await accountIcon.click();

        
       // 
       await driver.manage().setTimeouts({ implicit: 15000 });
       

        //find and click review orders sub option from then nav menu
        let reviewOrder = await driver.findElement(By.xpath("//*[@id=\"main-menu\"]/div/div[1]/div[6]/div[2]/div[1]/div[2]"));
        await reviewOrder.click();

       
        
        

        //confirm the orders module opens by asserting the correct class text

        
        let modulePanelText =  await driver.findElement(By.xpath("//*[@id=\"content-shell\"]")).getAttribute("class").then(value =>  {return value});
        
        assert.equal(modulePanelText, "secondNavShowing-width-35 menuExpanded");


        //confirm Awaiting Customer Approval option in module is displayed
        let awaitingCustomer = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[2]/div[2]/div[2]/div/div[1]/p/i"));
        assert.equal(await awaitingCustomer.isDisplayed(), true);
        

        //click on review orders sub option again to close it
        reviewOrder = await driver.findElement(By.xpath("//*[@id=\"main-menu\"]/div/div[1]/div[6]/div[2]/div[1]/div[2]"));
        await reviewOrder.click();


        //confirm the Awaiting Customer Approval option is no longer displayed
        awaitingCustomer = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[2]/div[2]/div[2]/div/div[1]/p/i"));
        assert.equal(await awaitingCustomer.isDisplayed(), false);


        //refresh the page
        await driver.navigate().refresh();

        
        await driver.manage().setTimeouts({ implicit: 25000 });


        //confirm the a from the correct fleet is displayed
        //vessel = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[3]/div[1]/div[1]/div[5]/div[1]"));
        //assert.equal(await vessel.isEnabled(), true);


        let chevronsExpand = await driver.findElement(By.xpath("//*[@id=\"menu-toggle\"]/div[1]"));
        await chevronsExpand.click();

        await driver.manage().setTimeouts({ implicit: 2000 });
        modulePanelText =  await driver.findElement(By.xpath("//*[@id=\"content-shell\"]")).getAttribute("class").then(value =>  {return value});
        assert.equal(modulePanelText, "secondNavShowing-width-35 menuExpanded");

        let accountsHeader = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[6]/div[1]/div[2]"));
        await accountsHeader.click();

        modulePanelText =  await driver.findElement(By.xpath("//*[@id=\"content-shell\"]")).getAttribute("class").then(value =>  {return value});
        assert.equal(modulePanelText, "menuExpanded");

        accountsHeader = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[6]/div[1]/div[2]"));
        await accountsHeader.click();

        modulePanelText =  await driver.findElement(By.xpath("//*[@id=\"content-shell\"]")).getAttribute("class").then(value =>  {return value});
        assert.equal(modulePanelText, "secondNavShowing-width-35 menuExpanded");


    }
    finally{

    }

   
}

checkOrders();