const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");
app.use(express.json());
const port = 3000;

//TODO: Create your GET Request Route Below:

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});

app.get("/restaurants", async (req, res) => {
  const allRestaurants = await Restaurant.findAll();
  console.log(JSON.stringify(allRestaurants, null, 2));
  res.json(allRestaurants);
  //   res.send(allRestaurants);
});
