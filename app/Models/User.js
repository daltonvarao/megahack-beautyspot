"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class User extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }

  createdSpots() {
    return this.hasMany("App/Models/Spot");
  }

  roles() {
    return this.belongsToMany("App/Models/Role").pivotTable("user_roles");
  }

  spots() {
    return this.belongsToMany("App/Models/Spot").pivotTable("user_spots");
  }

  async isAdmin() {
    let admin = await this.roles().where("roles.name", "admin").ids();
    if (admin.length > 0) return true;
  }

  async hasPermission(roleName) {
    let role = await this.roles().where("roles.name", roleName).ids();
    if (role.length > 0) return true;
    return false;
  }
}

module.exports = User;
