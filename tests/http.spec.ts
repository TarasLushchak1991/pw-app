import { test, expect } from '@playwright/test';

test('Basic auth on the-internet.herokuapp.com', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: 'admin',
      password: 'admin',
    },
  });

  const page = await context.newPage();
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Basic Auth');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/basic_auth');
  await expect(page.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();
});