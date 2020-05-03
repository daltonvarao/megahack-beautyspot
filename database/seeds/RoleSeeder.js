"use strict";

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class RoleSeeder {
  async run() {
    await Factory.model("App/Models/Role").create({
      name: "admin",
      description: "Has all accesses in app",
    });
    await Factory.model("App/Models/Role").create({
      name: "professional",
      description: "Can search for spaces and offer services",
    });
    await Factory.model("App/Models/Role").create({
      name: "owner",
      description: "Can register spaces",
    });
    await Factory.model("App/Models/Role").create({
      name: "client",
      description: "Can search for services",
    });
  }
}

module.exports = RoleSeeder;
