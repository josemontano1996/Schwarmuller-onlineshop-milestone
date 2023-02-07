//for knowing if the user already has a cart or not yet
const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    cart = new Cart(req.session.cart.items);
  }

  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;
