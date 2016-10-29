"use strict";

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();

module.exports = (knex) => {
  router.get("/login", (req, res) => {
    res.render("login", { message: req.flash('loginMsg')});
  });

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    knex.select('*')
    .from('users')
    .where('email', email)
    .then((result) => {
      if (result.length == 0) {
        req.flash('loginMsg', "you don't have an account. Please sign up");
        return res.redirect('login');
      }
      else if (!bcrypt.compareSync(password, result[0].password)){
        req.flash('loginMsg', "Incorrect password. Please try again");
        return res.redirect('login');
      }
      else{
        req.session.user = result[0];
        res.redirect('/users/restaurants/');
      }
    })
  });

  // see register page
  router.get("/register", (req, res) => {
    res.render("register", { message: req.flash('registerMsg')});
  });

  // send register form
  router.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;

    knex.select('*')
    .from('users')
    .where('email', email)
    .then((results) => {
      if(results.length == 0) {
        const hashedPassword = bcrypt.hashSync(password);
        const newUser = {
          email: email,
          password: hasshedPassword,
          name: name,
          phone_number: phone
        };
        knex('users')
        .insert(newUser)
        .then(() => {
          req.session.user = newUser;
          res.redirect('/users/restaurants');
        });
      }
      else {
        req.flash('registerMsg', 'You already have an account. Please Sign In');
        res.redirect('register');
      }
    })
  });

  // logout
  router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      console.log('cannot destroy session');
    })
    res.redirect('/');
  });

  return router;
}
