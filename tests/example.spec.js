// @ts-check
import { test, expect } from '@playwright/test';
import { config } from '../utils/loginDetails.js';
import { readCsv } from '../utils/csv.js'; 

// Uncomment the below line to test with fully valid ✅ data in the CSV file
 const TabDetails = readCsv('data/TabDetails.csv');

// Uncomment the below line to test with some valid ✅ and some invalid ❌ data
// const TabDetails = readCsv('data/TabDetails-WrongData.csv');

test.describe('Verify Page Details (data-driven)', () => {

    TabDetails.forEach((row, index) => {

    test(`Run test #${index + 1} for ${row.navigateButton}`, async ({ page }) => {

        await page.goto(config.loginUrl);
        await page.getByLabel(/username/i).fill(config.userName);
        await page.getByLabel(/password/i).fill(config.Password);

        await page.getByRole('button', { name: /sign in/i }).click();

        const navProject = page.locator('h2', { hasText: row.navigateButton });
        const goToColumn = page.locator('h2', { hasText: row.columnToCheck });
        const columnText = page.locator('h3', { hasText: row.verifyText });

        let multipleOccurances;
        let VerifiedTags = "";
     
        const result = await navProject.isVisible();
        if (result) {
            await navProject.click();
            const result1 = await goToColumn.isVisible();
            if (result1) {
                const result2 = await columnText.isVisible();
                if (result2) {
                   const Tags = row.confirmTags; 
                   const tagList = Tags.split(';');  

                   for (let i = 0; i < tagList.length; i++) {
               
                       multipleOccurances = false;
                       const authCard = page.locator(`div:has(> h3:has-text("${row.verifyText}"))`);
                       const featureSpan = authCard.locator(`span:has-text("${tagList[i]}")`);
                       const count = await featureSpan.count();
                       await expect(featureSpan).toBeVisible();
                       if (count == 1) {
                           multipleOccurances = true; 
                           if (i < (tagList.length - 1)) {
                               VerifiedTags += "{" + tagList[i] +"}" + " and ";
                           }
                           else {
                               VerifiedTags +=  "{" + tagList[i] +"}";
                           }
                       }
                   }
                   if (multipleOccurances) {
                       console.log(`\n Successfully verified Tag(s):"${VerifiedTags}": and Text:"${row.verifyText}":  under the Column:"${row.columnToCheck}": in the Project :"${row.navigateButton}": \n" `);
                   }
                } else {
                    throw new Error(`❌ Text :"${row.verifyText}": is Not present under the Column :"${row.columnToCheck}": in the Project :"${row.navigateButton}":" ` );
                }
            } else {
                  throw new Error(`❌ Column :"${row.columnToCheck}": is Not present in the Project :"${row.navigateButton}":" ` );
            }
        } else { 
              throw new Error(`❌ Project Name :"${row.navigateButton}": is Not present in the Home Page` );
        }

        await page.getByRole('button', { name: /logout/i }).click();
    });
  });
});
