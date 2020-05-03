"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SpotSchema extends Schema {
  up() {
    this.create("spots", (table) => {
      table.increments();
      table.string("name");
      table.string("address");
      table.decimal("price");
      table.integer("user_id").unsigned().references("id").inTable("users");

      table.timestamps();
    });
  }

  down() {
    this.drop("spots");
  }
}

module.exports = SpotSchema;
