"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", ({ response }) => {
  return response.route("users.dashboard.index");
});

Route.resource("register", "UserRegistrationController").only([
  "index",
  "store",
]);

Route.post("sessions/logout", "SessionController.logout").as("sessions.logout");
Route.resource("sessions", "SessionController").only(["index", "store"]);

Route.group("users", () => {
  Route.resource("dashboard", "DashboardController").only(["index"]);
  Route.resource("profile", "ProfileController");
  Route.get("saloes/search", "SpotController.search").as("users.saloes.search");
  Route.get("saloes/vincular/:id", "VinculoSpotController.store").as(
    "users.saloes.vincular"
  );
  Route.resource("saloes", "SpotController");
})
  .namespace("users")
  .middleware(["auth"]);

Route.on("500").render("errors.500");
Route.on("404").render("errors.404");
