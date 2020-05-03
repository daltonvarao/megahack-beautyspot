"use strict";

const Factory = use("Factory");
const { test, trait } = use("Test/Suite")("User registration");

trait("Test/Browser");
trait("DatabaseTransactions");

test("should be able to register a new user", async ({ browser, assert }) => {
  const page = await browser.visit("/register");

  const role = await Factory.model("App/Models/Role").create({
    name: "owner",
    description: "Can register spots",
  });

  await page
    .type('[name="first_name"]', "Dalton Felipe")
    .type('[name="last_name"]', "Silva Varão")
    .type('[name="email"]', "daltonphellipe@gmail.com")
    .type('[name="password"]', "123456")
    .type('[name="password_confirmation"]', "123456")
    .radio('[name="role"]', "owner")
    .submitForm("form")
    .waitForNavigation();

  await page.assertPath("/dashboard");
  const user = await role.users().first();

  assert.equal(user.first_name, "Dalton Felipe");
}).timeout(0);
