// EXTERNAL PACKAGES
const path = require("path"); // for constructing path that will be recognised in all operating systems
const express = require("express");
const csrf = require("csurf"); // currently not manteined any more, have to check for other one
const expressSession = require("express-session");

//INTERNAL PACKAGES
const createSessionConfig = require("./config/session");
const db = require("./database/database");

//MIDDLEWARES
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandleMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const routeProtectionMiddleware = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");

//ROUTES
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //constructing an absolute path to views folder

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false })); //extended:false is for handling just regular form submissions

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(cartMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(routeProtectionMiddleware);
app.use("/admin", adminRoutes);

app.use(errorHandleMiddleware); // error handling middleware

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!");
    console.log(error);
  });
