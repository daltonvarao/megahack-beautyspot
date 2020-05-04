"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");
const Env = use("Env");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { response }) {
    console.log(error);

    if (error.name === "InvalidSessionException") {
      response.redirect("/sessions");
      return;
    }

    switch (error.status) {
      case 500:
        if (Env.get("NODE_ENV") !== "development") {
          response.route("500");
          return;
        } else {
          response.status(500).send(error);
          return;
        }
      case 404:
        if (Env.get("NODE_ENV") !== "development") {
          response.route("404");
          return;
        } else {
          response.status(404).send(error);
        }
    }
  }
}

module.exports = ExceptionHandler;
