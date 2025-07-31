import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig<TestOptions>({
  timeout: 20000,
  retries: 1,
  reporter: 'html',

  use: {
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
      : process.env.STAGING == '1' ? 'http://localhost:4201/'
      : 'http://localhost:4200/',
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
  },

  projects: [
      {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/' // change to your DEV server URL
        },
      
    },
    {
      name: 'chromium'
    },
    {
      name: 'firefox',
      use: { 
       browserName: 'firefox'}
    },
    { name: 'pageObjectFullScreen',
      testMatch: 'usePageObject.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    }
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/'
  }
});
