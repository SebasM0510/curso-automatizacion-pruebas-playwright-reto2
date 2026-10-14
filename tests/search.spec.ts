import { test, expect, Page } from '@playwright/test';

const searchButton = (page: Page) => page.getByRole('button', { name: /Search/ });
const searchBox = (page: Page) => page.getByPlaceholder('Search docs');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await searchButton(page).click();

  await searchBox(page).fill('hascontent');

  await expect(page.locator('.DocSearch-Title')).toHaveText('No results found for "hascontent"');

})

test('Limpiar el input de busqueda', async ({ page }) => {
  await searchButton(page).click();

  await searchBox(page).fill('somerandomtext');

  await page.getByRole('button', { name: 'Clear the query' }).click();

  await expect(searchBox(page)).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {

  

  await searchButton(page).click();

  await searchBox(page).fill('havetext');

  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  
  await expect(numberOfResults).toBeGreaterThan(0);

});