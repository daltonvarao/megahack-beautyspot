"use strict";

const Factory = use("Factory");
const { test, trait } = use("Test/Suite")("Teste");

trait("Test/Browser");

test("Visit signup page", async ({ browser }) => {
  const page = await browser.visit("/users/register", {
    waitUntil: "load",
  });
  await page.assertHas("Signup");
});

test("Register a new user", async ({ browser, assert }) => {
  const page = await browser.visit("/users/register");

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

  await page.assertPath("/users/register");
  const user = await role.users().first();

  assert.equal(user.first_name, "Dalton Felipe");
}).timeout(6000);
