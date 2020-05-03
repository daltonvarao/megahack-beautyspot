"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Roles extends Model {
  static boot() {
    super.boot();
  }

  users() {
    return this.belongsToMany("App/Models/User").pivotTable("user_roles");
  }
}

module.exports = Roles;
