"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSpotsSchema extends Schema {
  up() {
    this.create("user_spots", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.integer("spot_id").unsigned().references("id").inTable("spots");

      table.timestamps();
    });
  }

  down() {
    this.drop("user_spots");
  }
}

module.exports = UserSpotsSchema;
