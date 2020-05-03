"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validate } = use("Validator");

class SessionController {
  /**
   * Show a list of all sessions.
   * GET sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ view }) {
    return view.render("users/sessions/index");
  }

  /**
   * Create/save a new session.
   * POST sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Response} ctx.response
   */
  async store({ request, response, auth, session }) {
    const { email, password } = request.only(["email", "password"]);

    try {
      await auth.attempt(email, password);

      return response.route("users.dashboard.index");
    } catch (error) {
      session.flash({ error: "Email ou senha incorretos" });

      return response.redirect("back");
    }
  }

  /**
   * Delete a session with id.
   * DELETE sessions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async logout({ params, request, response, auth }) {
    try {
      await auth.logout();

      return response.route("sessions.index");
    } catch (error) {
      console.warn(error);
    }
  }
}

module.exports = SessionController;
