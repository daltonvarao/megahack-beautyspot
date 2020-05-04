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
    // creates an user with admin role
    const role0 = await Factory.model("App/Models/Role").create({
      name: "admin",
      description: "Has all accesses in app",
    });
    const user0 = await Factory.model("App/Models/User").create({
      first_name: "Dalton Felipe",
      last_name: "Silva Varão",
      email: "daltonphellipe@gmail.com",
      password: "123456",
    });
    await role0.users().attach([user0.id]);

    // creates an user with professional role
    const role1 = await Factory.model("App/Models/Role").create({
      name: "professional",
      description: "Can search for spaces and offer services",
    });
    const user1 = await Factory.model("App/Models/User").create({
      password: "123456",
    });
    await role1.users().attach([user1.id]);

    // creates an user with owner role
    const role2 = await Factory.model("App/Models/Role").create({
      name: "owner",
      description: "Can register spaces",
    });
    const user2 = await Factory.model("App/Models/User").create({
      password: "123456",
    });
    await role2.users().attach([user2.id]);

    // creates an user with client role
    const role3 = await Factory.model("App/Models/Role").create({
      name: "client",
      description: "Can search for services",
    });
    const user3 = await Factory.model("App/Models/User").create({
      password: "123456",
    });
    await role3.users().attach([user3.id]);
  }
}

module.exports = RoleSeeder;
