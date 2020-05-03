"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");
const Role = use("App/Models/Role");

const { validate } = use("Validator");

/**
 * Resourceful controller for interacting with users/register
 */
class userController {
  /**
   * Show a list of all users/register.
   * GET users/register
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return view.render("users.registrations.index");
  }

  /**
   * Create/save a new user.
   * POST users/register
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, view, session }) {
    const rules = { password: "required|confirmed" };
    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }

    const data = request.only(["first_name", "last_name", "email", "password"]);
    const name = request.input("role");

    const user = await User.create(data);
    const role = await Role.findBy({ name });

    await role.users().attach([user.id]);

    return response.route("users.register.index");
  }

  /**
   * Delete a user with id.
   * DELETE users/register/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = userController;
