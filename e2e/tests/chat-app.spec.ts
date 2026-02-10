import { test, expect } from '@playwright/test';

test.describe('ChatApp Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Chat app'i aç
    const chatButton = page.getByRole('button', { name: /chat/i });
    await chatButton.click();
  });

  test('should render chat interface', async ({ page }) => {
    // Chat container görünür olmalı
    const chat = page.locator('[data-component="chat-app"]');
    await expect(chat).toBeVisible();
    
    // Message input görünür olmalı
    const input = page.locator('[data-testid="chat-input"]');
    await expect(input).toBeVisible();
    
    // Send button görünür olmalı
    const sendButton = page.getByRole('button', { name: /send/i });
    await expect(sendButton).toBeVisible();
  });

  test('should send message', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    const sendButton = page.getByRole('button', { name: /send/i });
    
    // Mesaj yaz
    await input.fill('Hello, AI assistant!');
    await sendButton.click();
    
    // Mesaj görünmeli
    const messages = page.locator('[data-testid="chat-messages"]');
    await expect(messages).toContainText('Hello, AI assistant!');
  });

  test('should receive AI response', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    const sendButton = page.getByRole('button', { name: /send/i });
    
    // Mesaj gönder
    await input.fill('What is TypeScript?');
    await sendButton.click();
    
    // AI response bekle (max 10s)
    const aiResponse = page.locator('[data-role="assistant"]').last();
    await expect(aiResponse).toBeVisible({ timeout: 10000 });
    await expect(aiResponse).toContainText(/TypeScript/i);
  });

  test('should handle keyboard shortcuts', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    
    // Enter ile gönder
    await input.fill('Test message');
    await input.press('Enter');
    
    // Mesaj gönderilmeli
    const messages = page.locator('[data-testid="chat-messages"]');
    await expect(messages).toContainText('Test message');
    
    // Input temizlenmeli
    await expect(input).toBeEmpty();
  });

  test('should display message timestamp', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    await input.fill('Timestamp test');
    await input.press('Enter');
    
    // Timestamp görünmeli
    const timestamp = page.locator('[data-testid="message-timestamp"]').last();
    await expect(timestamp).toBeVisible();
    
    // Format: HH:MM veya relative time
    const timestampText = await timestamp.textContent();
    expect(timestampText).toMatch(/\d{1,2}:\d{2}|just now|\d+ (second|minute|hour)s? ago/);
  });

  test('should scroll to bottom on new message', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    const messagesContainer = page.locator('[data-testid="chat-messages"]');
    
    // Birkaç mesaj gönder
    for (let i = 0; i < 5; i++) {
      await input.fill(`Message ${i + 1}`);
      await input.press('Enter');
      await page.waitForTimeout(500);
    }
    
    // En son mesaj görünür olmalı
    const lastMessage = page.locator('[data-testid="chat-message"]').last();
    await expect(lastMessage).toBeInViewport();
  });

  test('should support markdown formatting', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    
    // Markdown mesaj gönder
    await input.fill('**Bold** and *italic* and `code`');
    await input.press('Enter');
    
    // Markdown render edilmeli
    const message = page.locator('[data-testid="chat-message"]').last();
    await expect(message.locator('strong')).toContainText('Bold');
    await expect(message.locator('em')).toContainText('italic');
    await expect(message.locator('code')).toContainText('code');
  });

  test('should support code blocks', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    
    // Code block gönder
    await input.fill('```typescript\nconst x = 42;\n```');
    await input.press('Enter');
    
    // Code block render edilmeli
    const codeBlock = page.locator('pre code');
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toContainText('const x = 42');
  });

  test('should copy code to clipboard', async ({ page, context }) => {
    // Clipboard permission
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    
    const input = page.locator('[data-testid="chat-input"]');
    
    // Code block gönder
    await input.fill('```typescript\nconst hello = "world";\n```');
    await input.press('Enter');
    
    // Copy button'a tıkla
    const copyButton = page.locator('[data-testid="copy-code"]').last();
    await copyButton.click();
    
    // Clipboard'da olmalı
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('const hello = "world"');
  });

  test('should clear chat history', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    
    // Birkaç mesaj gönder
    await input.fill('Message 1');
    await input.press('Enter');
    await input.fill('Message 2');
    await input.press('Enter');
    
    // Clear button
    const clearButton = page.getByRole('button', { name: /clear/i });
    await clearButton.click();
    
    // Confirm dialog
    await page.getByRole('button', { name: /confirm/i }).click();
    
    // Mesajlar temizlenmeli
    const messages = page.locator('[data-testid="chat-message"]');
    await expect(messages).toHaveCount(0);
  });

  test('should save chat to file', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    
    // Mesaj gönder
    await input.fill('Save test message');
    await input.press('Enter');
    
    // Download başlat
    const downloadPromise = page.waitForEvent('download');
    const saveButton = page.getByRole('button', { name: /save|export/i });
    await saveButton.click();
    
    // Download tamamlanmalı
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/chat.*\.(txt|json|md)/);
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Network offline
    await page.context().setOffline(true);
    
    const input = page.locator('[data-testid="chat-input"]');
    await input.fill('This will fail');
    await input.press('Enter');
    
    // Error message görünmeli
    const errorMessage = page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/network|connection|offline/i);
    
    // Network online
    await page.context().setOffline(false);
  });

  test('should show typing indicator', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    
    // Mesaj gönder
    await input.fill('Show typing indicator');
    await input.press('Enter');
    
    // Typing indicator görünmeli
    const typingIndicator = page.locator('[data-testid="typing-indicator"]');
    await expect(typingIndicator).toBeVisible({ timeout: 2000 });
    
    // Response gelince kaybolmalı
    await expect(typingIndicator).not.toBeVisible({ timeout: 10000 });
  });

  test('should take screenshot', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    
    // Birkaç mesaj gönder
    await input.fill('Screenshot test 1');
    await input.press('Enter');
    await page.waitForTimeout(1000);
    
    await input.fill('Screenshot test 2');
    await input.press('Enter');
    await page.waitForTimeout(1000);
    
    // Screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/chat-app.png',
      fullPage: true 
    });
  });

  test('should pass visual regression', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    
    // Consistent state için mesaj gönder
    await input.fill('Visual regression test');
    await input.press('Enter');
    await page.waitForTimeout(2000);
    
    // Visual regression
    await expect(page).toHaveScreenshot('chat-app-baseline.png');
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }
    
    // Mobile'da görünür olmalı
    const chat = page.locator('[data-component="chat-app"]');
    await expect(chat).toBeVisible();
    
    // Input mobile-friendly olmalı
    const input = page.locator('[data-testid="chat-input"]');
    await input.tap();
    await input.fill('Mobile test');
    
    // Virtual keyboard açılmalı
    await expect(input).toBeFocused();
  });

  test('should meet performance standards', async ({ page }) => {
    // Performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        largestContentfulPaint: 0 // LCP hesaplanacak
      };
    });
    
    // Performance thresholds
    expect(metrics.domContentLoaded).toBeLessThan(1000); // < 1s
    expect(metrics.firstContentfulPaint).toBeLessThan(1800); // < 1.8s
  });

  test('should handle long messages', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    
    // Uzun mesaj
    const longMessage = 'Lorem ipsum '.repeat(100);
    await input.fill(longMessage);
    await input.press('Enter');
    
    // Mesaj görünmeli ve scroll edilebilir olmalı
    const message = page.locator('[data-testid="chat-message"]').last();
    await expect(message).toBeVisible();
    await expect(message).toContainText('Lorem ipsum');
  });

  test('should support emoji', async ({ page }) => {
    const input = page.locator('[data-testid="chat-input"]');
    
    // Emoji gönder
    await input.fill('Hello 👋 World 🌍');
    await input.press('Enter');
    
    // Emoji görünmeli
    const message = page.locator('[data-testid="chat-message"]').last();
    await expect(message).toContainText('👋');
    await expect(message).toContainText('🌍');
  });
});
