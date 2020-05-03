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
    first_name: "Dalton Felipe",
    last_name: "Silva Varão",
    email: "daltonphellipe@gmail.com",
    password: "123456",
    ...data,
  };
});
