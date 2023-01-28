const express = require("express");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

//this routes will be searched when /admin is requested, we used a filtering option in app.js ln:41
router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProduct);

module.exports = router;
