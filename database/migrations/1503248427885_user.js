"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("first_name", 120).notNullable();
      table.string("last_name", 120).notNullable();
      table.string("address");
      table.string("city");
      table.string("uf");
      table.string("address_number");
      table.string("phone");
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
