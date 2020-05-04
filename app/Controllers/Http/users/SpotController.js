"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with spots
 */

const Spot = use("App/Models/Spot");

class SpotController {
  /**
   * Show a list of all spots.
   * GET spots
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ view, auth }) {
    const user = await auth.getUser();
    let roles = await user.roles().fetch();

    const createdSpots = await user.createdSpots().fetch();
    const spots = await user.spots().fetch();

    return view.render("users.spots.index", {
      roles: roles.toJSON().map((r) => r.name),
      spots: spots.toJSON(),
      createdSpots: createdSpots.toJSON(),
    });
  }

  async search({ view, auth }) {
    const spots = await Spot.all();

    return view.render("users.spots.search", {
      spots: spots.toJSON(),
    });
  }

  /**
   * Render a form to be used for creating a new spot.
   * GET spots/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ view }) {
    return view.render("users.spots.create");
  }

  /**
   * Create/save a new spot.
   * POST spots
   *

   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth, session }) {
    const user = await auth.getUser();
    const hasPermission = await user.hasPermission("owner");
    const spot = request.only(["name", "price", "address"]);

    if (hasPermission) {
      await user.createdSpots().create(spot);
      session.flash({ notification: "Salão cadastrado com sucesso!" });
    } else {
      session.flash({ error: "Usuário não tem permissão para este recurso!" });
    }

    response.route("users.saloes.index");
    return;
  }

  /**
   * Display a single spot.
   * GET spots/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ view, request, auth }) {
    const { id } = request.params;
    const spot = await Spot.find(id);
    const user = await auth.getUser();

    const ids = await user.spots().ids();

    let roles = await user.roles().fetch();

    return view.render("users.spots.show", {
      spot,
      roles: roles.toJSON().map((r) => r.name),
      ids,
    });
  }

  /**
   * Render a form to update an existing spot.
   * GET spots/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update spot details.
   * PUT or PATCH spots/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a spot with id.
   * DELETE spots/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = SpotController;
