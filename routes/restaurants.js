"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // see all restaurants
  router.get("/", (req, res) => {
    let templateVars = {};
    knex
      .select("*")
      .from("restaurants")
      .then((results) => {
        templateVars.data = results;
    });
    res.render("restaurants", templateVars);
  });

  // see menus for specified restaurant
  // render with templatVars(cart data)
  router.get("/:id/menus", (req, res) => {
    let templateVars = {};
    knex
      .select("*")
      .from("dishes") // 'menus' will be better name?
      .then((results) => {
        templateVars.data = results;
      });
    res.render("menus", templateVars);
  });

  // when +,- clicked, update database cart and response with updated cart data
  // use append to add and remove from cart view (in app.js)
  // for restful design, I changed it to cart/update
  // if we going to keep history of all carts, then "/:id/carts/:id/update"
  router.post("/:id/cart/update", (req, res) => {
    // something like this
    // db.carts.update(req.body.menuItemId, newCartData =>
    //   res.json(newCartData)
    // )
  });

  // see checkout page with updated cart
  // render checkout with templatVars(cart data)
  router.get("/:id/checkout", (req, res) => {
    let templateVars = {};
    // knex
    //   .select("*")
    //   .from("cart")
    //   .then((results) => {
    //     templateVars.data = results;
    // });
    res.render("checkout");
  });

  // update payment method in database cart
  // communicate with the restaurant using twillo api (send updated cart as an order)
  // render with templateVars (w/e info we got from api)
  router.post("/:id/checkout", (req, res) => {









    res.render("confirmation");
  });

  // see confirmation page
  // maybe not needed, need to see twillo api
  router.get("/:id/confirmation", (req, res) => {
    res.render("confirmation");
  });

  return router;
}
