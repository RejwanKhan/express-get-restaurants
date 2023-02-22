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

app.get("/restaurants/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  console.log(id);
  const restaurants = await Restaurant.findByPk(id);
  const allRestaurants = await Restaurant.findAll();
  if (restaurants) {
    res.send(restaurants);
  } else {
    res.send(allRestaurants);
  }
});

//Activity 3
app.post("/restaurants", async (req, res) => {
  const { name, location, cuisine } = req.body;
  if ((name, location, cuisine)) {
    await Restaurant.create({
      name: name,
      location: location,
      cuisine: cuisine,
    });
  }
  res.send(201);
});

app.put("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  const { name, location, cuisine } = req.body;
  const originalRestaurant = await Restaurant.findByPk(Number(id));
  // if ((name, location, cuisine)) {
  //   await originalRestaurant.update({
  //     name: name,
  //     location: location,
  //     cuisine: cuisine,
  //   });
  // }
  if (name) {
    await originalRestaurant.update({ name: name });
  }
  if (location) {
    await originalRestaurant.update({ location: location });
  }
  if (cuisine) {
    await originalRestaurant.update({ cuisine: cuisine });
  }
  res.send(201);
});

app.delete("/restaurants/:idNumber", async (req, res) => {
  const { idNumber } = req.params;
  const restaurant = await Restaurant.findByPk(Number(idNumber));
  const { id } = restaurant;
  await Restaurant.destroy({ where: { id: id } });
  res.send("Restaurant has been deleted");
});
