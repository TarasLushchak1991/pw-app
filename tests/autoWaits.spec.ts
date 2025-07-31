import {expect} from '@playwright/test'
import {test} from '../test-options';


test.beforeEach (async({page}) => {
    await page.goto(process.env.URL);
    await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto waits', async ({page, globalsQaURL}) => {
    const successButton = page.locator('.bg-success')

    await successButton.click()

    //const text = await successButton.textContent();
    await successButton.waitFor({ state: 'attached' }) // auto-wait logic
    const text = await successButton.textContent() // no auto-wait logic
    expect(text).toBe('Data loaded with AJAX get request.')

   await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
});

test.skip ('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')

    
    //_wait for element
    //await page.waitForSelector('.bg-success', {state: 'attached'})

    // _wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //_wait for network calls to be completed ('NOT RECCOMENDED')
    await page.waitForLoadState('networkidle')
    const text = await successButton.textContent()
    expect(text).toBe('Data loaded with AJAX get request.')
})