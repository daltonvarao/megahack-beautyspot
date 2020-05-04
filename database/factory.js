"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/Role", async (faker, i, data) => {
  return {
    name: "admin",
    description: "Has all accesses in app",
    ...data,
  };
});

Factory.blueprint("App/Models/User", async (faker, i, data) => {
  return {
    first_name: faker.first(),
    last_name: faker.last(),
    address: faker.address(),
    city: faker.city(),
    uf: faker.state(),
    address_number: faker.natural(),
    phone: faker.phone(),
    email: faker.email(),
    password: faker.string(),
    ...data,
  };
});
