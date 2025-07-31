import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

    constructor (page: Page) {
        super(page);
    }
     async submitUsingTheGridFormWithCredentialsAndSelectOption(email:string, password: string, option: string) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"});
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email);
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password);
        await usingTheGridForm.getByLabel(option).check({force: true});
        await usingTheGridForm.getByRole('button').click();
    }

    async submitInLineFormWithNameEmailAndCheckbox (name: string, email: string, rememberMe: boolean) {
        const inLineForm = this.page.locator('nb-card', {hasText: "Inline Form"});
        await inLineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name);
        await inLineForm.getByRole('textbox', {name: "Email"}).fill(email);
        if (rememberMe) {
            await inLineForm.getByLabel('Remember me').check({force: true});
        }
        await inLineForm.getByRole('button').click();
    }
      
}
