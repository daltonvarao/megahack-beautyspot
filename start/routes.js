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

Route.resource("register", "UserRegistrationController").only([
  "index",
  "store",
]);

Route.post("sessions/logout", "SessionController.logout").as("sessions.logout");
Route.resource("sessions", "SessionController").only(["index", "store"]);

Route.group("users", () => {
  Route.resource("dashboard", "DashboardController").only(["index"]);
  Route.resource("profile", "ProfileController");
})
  .namespace("users")
  .middleware(["auth"]);
