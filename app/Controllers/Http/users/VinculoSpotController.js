"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Spot = use("App/Models/Spot");

class VinculoSpotController {
  /**
   * Show a list of all spots.
   * GET spots
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store({ view, auth, response, request, session }) {
    const { id } = request.params;
    const user = await auth.getUser();

    await user.spots().attach([id]);

    return response.route("users.saloes.index");
  }
}

module.exports = VinculoSpotController;
