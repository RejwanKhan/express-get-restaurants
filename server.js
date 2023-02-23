const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const RestaurantRouter = require("./router/Restaurant");

const { sequelize } = require("./db");

app.use(express.json());
app.use("/restaurant", RestaurantRouter);
const port = 3000;

//TODO: Create your GET Request Route Below:

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});
