"use strict";

const Factory = use("Factory");
const { test, trait } = use("Test/Suite")("User sessions");

trait("Test/Browser");
trait("Auth/Client");
trait("DatabaseTransactions");

test("should be able to login a new session", async ({ browser }) => {
  await Factory.model("App/Models/User").create();
  const page = await browser.visit("/sessions");

  await page
    .type('[name="email"]', "daltonphellipe@gmail.com")
    .type('[name="password"]', "123456")
    .submitForm("form")
    .waitForNavigation();

  await page.assertPath("/dashboard");
}).timeout(0);

test("should not permit login without correct credentials", async ({
  browser,
}) => {
  await Factory.model("App/Models/User").create();
  const page = await browser.visit("/sessions");

  await page
    .type('[name="email"]', "test@email.com")
    .type('[name="password"]', "test")
    .submitForm("form")
    .waitForNavigation();

  await page.assertPath("/sessions");
}).timeout(0);
