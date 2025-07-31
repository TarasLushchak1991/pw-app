import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class NavigationPage {
    readonly formLayoutsMenuItem: Locator
    readonly datepickerMenuItem: Locator;
    readonly toasterMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly tooltipMenuItem: Locator;
    
    // Reference to the Playwright Page object
    private readonly page: Page;

    // Initialize locators in the constructor
    constructor(page: Page) {
        this.page = page;

        this.formLayoutsMenuItem = page.getByText('Form Layouts');
        this.datepickerMenuItem = page.getByText('Datepicker');
        this.toasterMenuItem = page.getByText('Toastr');
        this.smartTableMenuItem = page.getByText('Smart Table');
        this.tooltipMenuItem = page.getByText('Tooltip');
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenuItem.click()  
        //await this.waitForNumberOfSeconds(2)
    }

    async datepickerPage() {
        await this.selectGroupMenuItem('Forms')
        //await this.page.waitForTimeout(1000) // wait for the menu to expand
        await this.datepickerMenuItem.click()
    }

    async toasterPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toasterMenuItem.click()
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
       const groupMenuItem = this.page.getByTitle(groupItemTitle)
       const expandedState = await groupMenuItem.getAttribute('aria-expanded')
       if (expandedState == 'false') {
           await groupMenuItem.click()
       }
    }
    
}