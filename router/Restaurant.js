const { Router } = require("express");
const router = Router();
const { Restaurant } = require("../models/Restaurant");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const allRestaurants = await Restaurant.findAll();
  console.log(JSON.stringify(allRestaurants, null, 2));
  res.json(allRestaurants);
  //   res.send(allRestaurants);
});

router.get("/:id", async (req, res) => {
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
// router.post("/", async (req, res) => {
//   const { name, location, cuisine } = req.body;
//   if ((name, location, cuisine)) {
//     await Restaurant.create({
//       name: name,
//       location: location,
//       cuisine: cuisine,
//     });
//   }
//   res.send(201);
// });

router.post(
  "/",
  [
    check("name").trim().not().isEmpty().isLength({ min: 10, max: 30 }),
    check("location").trim().not().isEmpty(),
    check("cuisine").trim().not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({ errors: errors.array() });
    } else {
      await Restaurant.create(req.body);
      res.send("Restaurant Created");
    }
  }
);

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, location, cuisine } = req.body;
  const originalRestaurant = await Restaurant.findByPk(Number(id));

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

router.delete("/:idNumber", async (req, res) => {
  const { idNumber } = req.params;
  const restaurant = await Restaurant.findByPk(Number(idNumber));
  const { id } = restaurant;
  await Restaurant.destroy({ where: { id: id } });
  res.send("Restaurant has been deleted");
});

module.exports = router;
