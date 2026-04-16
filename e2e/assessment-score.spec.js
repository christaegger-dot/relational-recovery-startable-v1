import { test, expect } from '@playwright/test';

// Assessment items: crisis(2), backup(3), shame(2), role(3) → max 10
const ITEMS = [
  { label: 'Ungeplanter Eintritt / Krise', val: 2 },
  { label: 'Backup-System bereits stark gefordert', val: 3 },
  { label: 'Schambesetzte elterliche Sorgen', val: 2 },
  { label: 'Rollenumkehr im System', val: 3 },
];

function checkboxFor(page, label) {
  return page.locator('label').filter({ hasText: label }).locator('input[type="checkbox"]');
}

test.describe('Assessment Score', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
    await page.goto('/#toolbox');
    await page.waitForSelector('fieldset.ui-toolbox-checklist');
  });

  test('starts at zero with supportive risk band', async ({ page }) => {
    const liveRegion = page.locator('#assessment-score-status');
    await expect(liveRegion).toContainText('Aktueller Assessment-Score: 0');
    await expect(liveRegion).toContainText('Hinweis auf tragende Ressourcen');
  });

  test('checking a single item updates the score', async ({ page }) => {
    await checkboxFor(page, ITEMS[0].label).check({ force: true });

    await expect(page.locator('.ui-toolbox-score')).toHaveText(String(ITEMS[0].val));
    await expect(page.locator('#assessment-score-status')).toContainText(`Aktueller Assessment-Score: ${ITEMS[0].val}`);
  });

  test('unchecking an item decreases the score', async ({ page }) => {
    await checkboxFor(page, ITEMS[0].label).check({ force: true });
    await expect(page.locator('.ui-toolbox-score')).toHaveText(String(ITEMS[0].val));

    await checkboxFor(page, ITEMS[0].label).uncheck({ force: true });
    await expect(page.locator('#assessment-score-status')).toContainText('Aktueller Assessment-Score: 0');
  });

  test('risk band transitions: supportive → caution → danger', async ({ page }) => {
    const liveRegion = page.locator('#assessment-score-status');

    // Score 0 → supportive
    await expect(liveRegion).toContainText('Hinweis auf tragende Ressourcen');

    // Check crisis(2) → score 2, still supportive
    await checkboxFor(page, ITEMS[0].label).check({ force: true });
    await expect(page.locator('.ui-toolbox-score')).toHaveText('2');
    await expect(liveRegion).toContainText('Hinweis auf tragende Ressourcen');

    // Check backup(3) → score 5, caution
    await checkboxFor(page, ITEMS[1].label).check({ force: true });
    await expect(page.locator('.ui-toolbox-score')).toHaveText('5');
    await expect(liveRegion).toContainText('Hinweis auf vertiefte Begleitung');

    // Check shame(2) → score 7, danger
    await checkboxFor(page, ITEMS[2].label).check({ force: true });
    await expect(page.locator('.ui-toolbox-score')).toHaveText('7');
    await expect(liveRegion).toContainText('Hinweis auf Schutzabklärung');
  });

  test('checking all items gives maximum score of 10', async ({ page }) => {
    for (const item of ITEMS) {
      await checkboxFor(page, item.label).check({ force: true });
    }

    await expect(page.locator('.ui-toolbox-score')).toHaveText('10');
    await expect(page.locator('#assessment-score-status')).toContainText('Hinweis auf Schutzabklärung');
  });

  test('reset button clears score and unchecks all items', async ({ page }) => {
    for (const item of ITEMS.slice(0, 2)) {
      await checkboxFor(page, item.label).check({ force: true });
    }
    await expect(page.locator('.ui-toolbox-score')).toHaveText('5');

    await page.locator('button', { hasText: 'Assessment zurücksetzen' }).click();

    await expect(page.locator('#assessment-score-status')).toContainText('Aktueller Assessment-Score: 0');

    const checkboxes = page.locator('fieldset.ui-toolbox-checklist input[type="checkbox"]');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).not.toBeChecked();
    }
  });

  test('aria-live region updates with score changes', async ({ page }) => {
    const liveRegion = page.locator('#assessment-score-status');
    await expect(liveRegion).toContainText('Aktueller Assessment-Score: 0');

    // Label-Click statt force:true, um React-State-Updates sicherzustellen.
    await page.locator('label').filter({ hasText: ITEMS[1].label }).click();
    await expect(checkboxFor(page, ITEMS[1].label)).toBeChecked();

    await expect(liveRegion).toContainText('Aktueller Assessment-Score: 3');
    await expect(liveRegion).toContainText('Hinweis auf vertiefte Begleitung');
  });

  test('score persists across tab navigation', async ({ page }) => {
    for (const item of ITEMS.slice(0, 2)) {
      await checkboxFor(page, item.label).check({ force: true });
    }
    await expect(page.locator('.ui-toolbox-score')).toHaveText('5');

    // Navigate away and back using hash (reliable, layout-independent)
    await page.evaluate(() => {
      window.location.hash = '#start';
    });
    await expect(page.locator('#page-heading-start')).toBeVisible();

    await page.evaluate(() => {
      window.location.hash = '#toolbox';
    });
    await page.waitForSelector('fieldset.ui-toolbox-checklist');

    await expect(page.locator('.ui-toolbox-score')).toHaveText('5');
  });
});

test.describe('Assessment Score Persistence', () => {
  test('score persists across page reload', async ({ page }) => {
    // Clear storage once, then load
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/#toolbox');
    await page.waitForSelector('fieldset.ui-toolbox-checklist');

    // Check items (score = 5)
    for (const item of ITEMS.slice(0, 2)) {
      await checkboxFor(page, item.label).check({ force: true });
    }
    await expect(page.locator('.ui-toolbox-score')).toHaveText('5');

    // Reload — localStorage is NOT cleared this time
    await page.reload();
    await page.waitForSelector('fieldset.ui-toolbox-checklist');

    await expect(page.locator('.ui-toolbox-score')).toHaveText('5');
    for (const item of ITEMS.slice(0, 2)) {
      await expect(checkboxFor(page, item.label)).toBeChecked();
    }
  });
});
