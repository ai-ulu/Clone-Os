import { test, expect } from '@playwright/test';

test.describe('AgentTerminal Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render terminal window', async ({ page }) => {
    // Terminal window açılmalı
    const terminalButton = page.getByRole('button', { name: /terminal/i });
    await terminalButton.click();
    
    // Terminal görünür olmalı
    const terminal = page.locator('[data-component="agent-terminal"]');
    await expect(terminal).toBeVisible();
  });

  test('should display welcome message', async ({ page }) => {
    const terminalButton = page.getByRole('button', { name: /terminal/i });
    await terminalButton.click();
    
    // Welcome message görünmeli
    const output = page.locator('.terminal-output');
    await expect(output).toContainText('Welcome');
  });

  test('should execute simple command', async ({ page }) => {
    const terminalButton = page.getByRole('button', { name: /terminal/i });
    await terminalButton.click();
    
    // Komut yaz
    const input = page.locator('.terminal-input');
    await input.fill('echo "Hello World"');
    await input.press('Enter');
    
    // Output görünmeli
    const output = page.locator('.terminal-output');
    await expect(output).toContainText('Hello World');
  });

  test('should handle command history', async ({ page }) => {
    const terminalButton = page.getByRole('button', { name: /terminal/i });
    await terminalButton.click();
    
    const input = page.locator('.terminal-input');
    
    // İlk komut
    await input.fill('ls');
    await input.press('Enter');
    
    // İkinci komut
    await input.fill('pwd');
    await input.press('Enter');
    
    // Arrow up ile history
    await input.press('ArrowUp');
    await expect(input).toHaveValue('pwd');
    
    await input.press('ArrowUp');
    await expect(input).toHaveValue('ls');
  });

  test('should clear terminal', async ({ page }) => {
    const terminalButton = page.getByRole('button', { name: /terminal/i });
    await terminalButton.click();
    
    // Komut çalıştır
    const input = page.locator('.terminal-input');
    await input.fill('echo "test"');
    await input.press('Enter');
    
    // Clear komutu
    await input.fill('clear');
    await input.press('Enter');
    
    // Output temiz olmalı
    const output = page.locator('.terminal-output');
    await expect(output).toBeEmpty();
  });

  test('should take screenshot', async ({ page }) => {
    const terminalButton = page.getByRole('button', { name: /terminal/i });
    await terminalButton.click();
    
    // Screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/terminal.png',
      fullPage: true 
    });
  });

  test('should pass visual regression', async ({ page }) => {
    const terminalButton = page.getByRole('button', { name: /terminal/i });
    await terminalButton.click();
    
    // Visual regression
    await expect(page).toHaveScreenshot('terminal-baseline.png');
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }
    
    const terminalButton = page.getByRole('button', { name: /terminal/i });
    await terminalButton.click();
    
    // Mobile'da görünür olmalı
    const terminal = page.locator('[data-component="agent-terminal"]');
    await expect(terminal).toBeVisible();
    
    // Touch interaction
    await terminal.tap();
  });

  test('should meet performance standards', async ({ page }) => {
    // Performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
      };
    });
    
    // Performance thresholds
    expect(metrics.domContentLoaded).toBeLessThan(1000); // < 1s
    expect(metrics.firstContentfulPaint).toBeLessThan(1800); // < 1.8s
  });
});
