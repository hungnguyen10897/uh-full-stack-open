const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'John Doe',
        username: 'john',
        password: 'doe'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator1 = page.getByText('Log in to application')
    const locator2 = page.getByText('username')
    const locator3 = page.getByText('password')
    const locator4 = page.getByText('login')

    await expect(locator1).toBeVisible()
    await expect(locator2).toBeVisible()
    await expect(locator3).toBeVisible()
    await expect(locator4).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('john')
      await page.getByLabel('password').fill('doe')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('John Doe logged in', { exact: false })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })
})