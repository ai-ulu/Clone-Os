import { Page, expect } from '@playwright/test';

/**
 * Test helper utilities for Clone-Os E2E tests
 */

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for component to be ready
   */
  async waitForComponent(selector: string, timeout = 5000) {
    const component = this.page.locator(selector);
    await expect(component).toBeVisible({ timeout });
    return component;
  }

  /**
   * Open window by name
   */
  async openWindow(windowName: string) {
    const button = this.page.getByRole('button', { name: new RegExp(windowName, 'i') });
    await button.click();
    await this.page.waitForTimeout(500); // Animation
  }

  /**
   * Close window
   */
  async closeWindow(windowName: string) {
    const closeButton = this.page.locator(`[data-window="${windowName}"] [data-action="close"]`);
    await closeButton.click();
  }

  /**
   * Take screenshot with timestamp
   */
  async takeScreenshot(name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({
      path: `e2e/screenshots/${name}-${timestamp}.png`,
      fullPage: true
    });
  }

  /**
   * Wait for AI response
   */
  async waitForAIResponse(timeout = 10000) {
    const response = this.page.locator('[data-role="assistant"]').last();
    await expect(response).toBeVisible({ timeout });
    return response;
  }

  /**
   * Check performance metrics
   */
  async checkPerformance() {
    const metrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
      };
    });

    // Assert performance thresholds
    expect(metrics.domContentLoaded).toBeLessThan(1000);
    expect(metrics.firstContentfulPaint).toBeLessThan(1800);
    
    return metrics;
  }

  /**
   * Fill form field
   */
  async fillField(label: string, value: string) {
    const field = this.page.getByLabel(label);
    await field.fill(value);
  }

  /**
   * Click button by text
   */
  async clickButton(text: string) {
    const button = this.page.getByRole('button', { name: new RegExp(text, 'i') });
    await button.click();
  }

  /**
   * Wait for network idle
   */
  async waitForNetworkIdle(timeout = 5000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Check accessibility
   */
  async checkAccessibility() {
    // Check for basic a11y issues
    const issues = await this.page.evaluate(() => {
      const problems: string[] = [];
      
      // Check for images without alt
      const images = document.querySelectorAll('img:not([alt])');
      if (images.length > 0) {
        problems.push(`${images.length} images without alt text`);
      }
      
      // Check for buttons without accessible name
      const buttons = document.querySelectorAll('button:not([aria-label]):not([title])');
      buttons.forEach(btn => {
        if (!btn.textContent?.trim()) {
          problems.push('Button without accessible name');
        }
      });
      
      // Check for form inputs without labels
      const inputs = document.querySelectorAll('input:not([aria-label]):not([id])');
      if (inputs.length > 0) {
        problems.push(`${inputs.length} inputs without labels`);
      }
      
      return problems;
    });

    return issues;
  }

  /**
   * Simulate slow network
   */
  async simulateSlowNetwork() {
    await this.page.route('**/*', route => {
      setTimeout(() => route.continue(), 1000);
    });
  }

  /**
   * Simulate network error
   */
  async simulateNetworkError() {
    await this.page.route('**/*', route => {
      route.abort('failed');
    });
  }

  /**
   * Clear all cookies
   */
  async clearCookies() {
    await this.page.context().clearCookies();
  }

  /**
   * Set viewport size
   */
  async setViewport(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  /**
   * Scroll to element
   */
  async scrollToElement(selector: string) {
    const element = this.page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for animation
   */
  async waitForAnimation(duration = 500) {
    await this.page.waitForTimeout(duration);
  }

  /**
   * Check console errors
   */
  async checkConsoleErrors() {
    const errors: string[] = [];
    
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    return errors;
  }

  /**
   * Mock API response
   */
  async mockAPIResponse(url: string, response: any) {
    await this.page.route(url, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response)
      });
    });
  }

  /**
   * Wait for element to disappear
   */
  async waitForElementToDisappear(selector: string, timeout = 5000) {
    const element = this.page.locator(selector);
    await expect(element).not.toBeVisible({ timeout });
  }

  /**
   * Get element text
   */
  async getElementText(selector: string) {
    const element = this.page.locator(selector);
    return await element.textContent();
  }

  /**
   * Check if element exists
   */
  async elementExists(selector: string) {
    const element = this.page.locator(selector);
    return await element.count() > 0;
  }

  /**
   * Hover over element
   */
  async hoverElement(selector: string) {
    const element = this.page.locator(selector);
    await element.hover();
  }

  /**
   * Double click element
   */
  async doubleClickElement(selector: string) {
    const element = this.page.locator(selector);
    await element.dblclick();
  }

  /**
   * Right click element
   */
  async rightClickElement(selector: string) {
    const element = this.page.locator(selector);
    await element.click({ button: 'right' });
  }

  /**
   * Drag and drop
   */
  async dragAndDrop(sourceSelector: string, targetSelector: string) {
    const source = this.page.locator(sourceSelector);
    const target = this.page.locator(targetSelector);
    await source.dragTo(target);
  }

  /**
   * Upload file
   */
  async uploadFile(inputSelector: string, filePath: string) {
    const input = this.page.locator(inputSelector);
    await input.setInputFiles(filePath);
  }

  /**
   * Download file
   */
  async downloadFile(buttonSelector: string) {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.locator(buttonSelector).click();
    const download = await downloadPromise;
    return download;
  }

  /**
   * Check local storage
   */
  async getLocalStorage(key: string) {
    return await this.page.evaluate((k) => {
      return localStorage.getItem(k);
    }, key);
  }

  /**
   * Set local storage
   */
  async setLocalStorage(key: string, value: string) {
    await this.page.evaluate(({ k, v }) => {
      localStorage.setItem(k, v);
    }, { k: key, v: value });
  }

  /**
   * Clear local storage
   */
  async clearLocalStorage() {
    await this.page.evaluate(() => {
      localStorage.clear();
    });
  }
}

/**
 * Page Object Model base class
 */
export class BasePage {
  protected helpers: TestHelpers;

  constructor(protected page: Page) {
    this.helpers = new TestHelpers(page);
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

/**
 * Custom matchers
 */
export const customMatchers = {
  async toBeAccessible(page: Page) {
    const helpers = new TestHelpers(page);
    const issues = await helpers.checkAccessibility();
    
    return {
      pass: issues.length === 0,
      message: () => `Accessibility issues found: ${issues.join(', ')}`
    };
  },

  async toMeetPerformanceStandards(page: Page) {
    const helpers = new TestHelpers(page);
    const metrics = await helpers.checkPerformance();
    
    const passed = 
      metrics.domContentLoaded < 1000 &&
      metrics.firstContentfulPaint < 1800;
    
    return {
      pass: passed,
      message: () => `Performance standards not met: ${JSON.stringify(metrics)}`
    };
  }
};
