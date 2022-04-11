const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // get all listings route, need to modify from lightbnb
  router.get("/", (req, res) => {
    db.getAllProperties(req.query, 20)
      .then((properties) => res.send({ properties }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // get a single listing route, need to modify from lightbnb
  router.get("/:id", (req, res) => {
    db.getAllProperties(req.query, 20)
      .then((properties) => res.send({ properties }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  //create new listing route, need to modify from lightbnb
  router.post("/", (req, res) => {
    const userId = req.session.userId;
    db.addProperty({ ...req.body, owner_id: userId })
      .then((property) => {
        res.send(property);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};
