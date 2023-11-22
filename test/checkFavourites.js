const {Builder, By, until, promise, Actions} = require("selenium-webdriver");
const assert = require("assert");



async function checkFavourites(){

    let driver = await new Builder().forBrowser('chrome').build();

    try{

        //log in
        await driver.get("https://vfitest.voyagerww.com/login/");

        await driver.findElement(By.id("ember362")).sendKeys("elliot.carr@voyagerww.com");

        await driver.findElement(By.id("ember363")).sendKeys("PatrykJekal2022");

        await driver.findElement(By.xpath("//*[@id=\"login\"]/button/span")).click();

        await driver.manage().setTimeouts({ implicit: 15000 });

        //confirm user is directed to main page
        const pageTitle = await driver.getTitle();
        assert.equal(pageTitle, "VFI");

        //find and click Compliance icon
        let complianceIcon = await driver.findElement(By.xpath("//*[@id=\"main-menu\"]/div/div[1]/div[3]/div[1]/div[1]"));
        await complianceIcon.click();

        let complianceUpdates =  await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[2]/div[2]"));
                                                                    
        let compliUpdatesFave = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[2]/div[2]/div/div[2]/i"));
        await driver.actions().move({origin : complianceUpdates}).perform();

        await compliUpdatesFave.click();         
                                 

       let favouritesHead = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[1]/div[1]/div[2]"));
       await favouritesHead.click();

       let compliUpdatesInFavs= await driver.findElements(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[1]/div[2]/div/div[2]/div"));
       assert.equal(compliUpdatesInFavs.length, 1);
        
       
        
        let complianceHead =  await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[1]/div[2]"));
        await complianceHead.click();

       complianceUpdates =  await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[2]/div[2]"));
       
       await driver.actions().move({origin : complianceUpdates}).perform();
       compliUpdatesFave = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[2]/div[2]/div/div[1]/i"));
       await compliUpdatesFave.click();    


       favouritesHead = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[1]/div[1]/div[2]"));
       await favouritesHead.click();

       compliUpdatesInFavs= await driver.findElements(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[1]/div[2]/div/div[2]/div"));
       assert.equal(compliUpdatesInFavs.length, 0);



    }
    finally{
        await driver.close();

    }

}
checkFavourites();