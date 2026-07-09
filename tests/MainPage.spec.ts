import { test, expect } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  { locator: (page: Page): Locator => page.getByRole('link', { name: 'Playwright logo Playwright' }), 
  name: 'Playwright logo link' ,
  text: 'Playwright',
  attribute: {
    type: 'href',
    value: '/'
  }
},
{ locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
  name: 'Docs link',
  text: 'Docs',
  attribute: {
    type: 'href',
    value: '/docs/intro'
  }
 },
  { locator: (page: Page): Locator => page.getByRole('link', { name: 'MCP', exact: true }), 
  name: 'MCP link',
  text: 'MCP',
  attribute: {
    type: 'href',
    value: '/mcp/introduction'
  }
 },
{ locator: (page: Page): Locator => page.getByRole('link', { name: 'CLI', exact: true }) ,
name: 'CLI link',
text: 'CLI',
attribute: {
    type: 'href',
    value: '/agent-cli/introduction'
  }
},
{ locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }) ,  
  name: 'API link',
  text: 'API',
  attribute: {
    type: 'href',
    value: '/docs/api/class-playwright'
  }
},
{ locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }) ,
  name: 'Node.js button'  ,
  text: 'Node.js',
},
{ locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }) ,
  name: 'GitHub repository link',
  attribute: {
    type: 'href',
    value: 'https://github.com/microsoft/playwright'
  }
},
{ locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }) ,
  name: 'Discord server link',
  attribute: {
    type: 'href',
    value: 'https://aka.ms/playwright/discord'
  }
},
{ locator: (page: Page): Locator => page.getByRole('button', { name: 'Switch between dark and light' }) ,
  name: 'Switch between dark and light button',
},
{ locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Control+k)' }) ,
  name: 'Search button', 
},
{ locator: (page: Page): Locator => page.getByRole('heading', { name: 'Playwright enables reliable' }) ,
  name: 'Title', 
  text: 'Playwright enables reliable web automation for testing, scripting, and AI agents.',
},
{ locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }) ,
  name: 'Get started button',
  text: 'Get started',
  attribute: {
    type: 'href',
    value: '/docs/intro'
  }
},
]

test.describe('Main page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
test('Verification of header navigation element display', async ({ page }) => {
  elements.forEach(({ locator, name }) => {
     test.step(`Verification element visibility ${name}`, async () => {
    await expect.soft(locator(page)).toBeVisible();
  });
  });
 });
test('Verification of header navigation element names', async ({ page }) => {
 elements.forEach(({locator, name, text}) => {
  if (text) {
   test.step(`Verification element text ${name}`, async () => {
    await expect.soft(locator(page)).toContainText(text);
   });
  }
  });
})
 
test('Verification of header navigation element attributes href', async ({ page }) => {
  elements.forEach(({locator, name, attribute}) => {
  if (attribute) {
   test.step(`Verification attribute href ${name}`, async () => {
    await expect.soft(locator(page)).toHaveAttribute(attribute?.type, attribute?.value);
   });
  }
  });

});
test('Light mode switching check', async ({ page }) => {
  
 await page.getByRole('button', { name: 'Switch between dark and light' }).click();
 await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light');
 });
});