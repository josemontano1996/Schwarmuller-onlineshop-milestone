const path = require("path"); // for constructing path that will be recognised in all operating systems

const express = require("express");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //constructing an absolute path to views folder

app.use(authRoutes);

app.listen(3000);
