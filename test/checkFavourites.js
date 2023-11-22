const {Builder, By} = require("selenium-webdriver");
const assert = require("assert");



async function checkFavourites(){

    let driver = await new Builder().forBrowser('chrome').build();

    try{

        //log in
        await driver.get("https://vfitest.voyagerww.com/login/");

        await driver.findElement(By.id("ember362")).sendKeys("auto.test@voyagerww.com");

        await driver.findElement(By.id("ember363")).sendKeys("74AD20648061");

        await driver.findElement(By.xpath("//*[@id=\"login\"]/button/span")).click();

        await driver.manage().setTimeouts({ implicit: 15000 });

        //confirm user is directed to main page
        const pageTitle = await driver.getTitle();
        assert.equal(pageTitle, "VFI");

        //find and click Compliance icon
        let complianceIcon = await driver.findElement(By.xpath("//*[@id=\"main-menu\"]/div/div[1]/div[3]/div[1]/div[1]"));
        await complianceIcon.click();

        //find Compliance Updates option in Complicance submenu
        let complianceUpdates =  await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[2]/div[2]"));
                                
        //find the add to favorites star within Compliance Updates button
        let compliUpdatesFave = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[2]/div[2]/div/div[2]/i"));

        //hover over Compliance Updates button to reveal add to favs star
        await driver.actions().move({origin : complianceUpdates}).perform();

        //click add to faves star
        await compliUpdatesFave.click();         
                                 
        //find and click Favourites section header to reveal favourites
        let favouritesHead = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[1]/div[1]/div[2]"));
        await favouritesHead.click();


        //find and confirm the Compliance Updates option has been added to Favourites section
        let compliUpdatesInFavs= await driver.findElements(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[1]/div[2]/div/div[2]/div"));
        assert.equal(compliUpdatesInFavs.length, 1);
        
       
        //find and click the Compliance section header
        let complianceHead =  await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[1]/div[2]"));
        await complianceHead.click();


        //relocate and hover over Compliance Updates button to reveal add to favourites star (which is selected)
        complianceUpdates =  await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[2]/div[2]"));
        await driver.actions().move({origin : complianceUpdates}).perform();

        //find and click add to favourites star again
        compliUpdatesFave = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[3]/div[2]/div[2]/div[2]/div/div[1]/i"));
        await compliUpdatesFave.click();    

        //click Favourites section header
        favouritesHead = await driver.findElement(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[1]/div[1]/div[2]"));
        await favouritesHead.click();

        //Confirm that Compliance Updates option is no longer in the Favourites section
        compliUpdatesInFavs= await driver.findElements(By.xpath("/html/body/div[4]/div[41]/div[2]/div/div[1]/div/div[1]/div/div[1]/div[1]/div[2]/div/div[2]/div"));
        assert.equal(compliUpdatesInFavs.length, 0);



    }
    finally{
        await driver.close();

    }

}
checkFavourites();