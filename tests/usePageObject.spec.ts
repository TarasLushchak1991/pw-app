import {expect, test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';

test.describe.configure({ mode: 'parallel' });

test.beforeEach (async({page}) => {
    await page.goto('/');        
})

test ('navigate to form page', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().toasterPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().tooltipPage();

});

test('parametrized methods', async ({page}) => {
   const pm = new PageManager(page);
   const randomFullName = faker.person.fullName()
   const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1');
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);
});

test.only('testing with argo ci', async ({page}) => {
   const pm = new PageManager(page);
   //const randomFullName = faker.person.fullName()
   //const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage();
});
