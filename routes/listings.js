const express = require("express");
const router = express.Router();

module.exports = (db, dbHelpers) => {
  router.get("/", (req, res) => {
    const listingParams = req.params;
    dbHelpers.getAllListings(listingParams, db).then((results) => {
      const templateVars = { results: results };
      res.render("listings", templateVars);
    });
  });

  // get a single listing route, need to modify from lightbnb
  // router.get("/:id", (req, res) => {
  //   const listingParams = req.params;
  //   dbHelpers.getAllListings(listingParams, db).then((results) => {
  //     const templateVars = { results: results };
  //     res.render("listing", templateVars);
  //   });
  // });

  //create new listing route, need to modify from lightbnb
  // router.post("/", (req, res) => {
  //   const userId = req.session.userId;
  //   db.addProperty({ ...req.body, owner_id: userId })
  //     .then((property) => {
  //       res.send(property);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //       res.send(e);
  //     });
  // });
  return router;
};
