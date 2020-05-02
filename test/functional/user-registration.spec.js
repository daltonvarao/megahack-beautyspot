"use strict";

const { test, trait } = use("Test/Suite")("Teste");

trait("Test/Browser");

test("visit home page", async ({ browser }) => {
  const page = await browser.visit("/users/register");

  await page.assertHas("Hello Register");
});
