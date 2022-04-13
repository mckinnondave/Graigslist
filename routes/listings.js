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
  router.get("/:id", (req, res) => {
    const listingParams = req.params;
    dbHelpers.getSingleListing(listingParams, db).then((results) => {
      // console.log("results", results);
      // console.log("listingParams", listingParams);
      // res.send(results);
      const templateVars = { results: results[0] };
      res.render("listing", templateVars);
    });
  });

  // get a single listing route, need to modify from lightbnb
  router.get("/categories/:category_slug", (req, res) => {
    const categoryParams = req.params;
    dbHelpers.getCategoryListings(categoryParams, db).then((results) => {
      // console.log("results", results);
      // console.log("listingParams", listingParams);
      // res.send(results);
      const templateVars = { results: results };
      res.render("listings", templateVars);
    });
  });

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

  router.post("/delete")
  
  return router;
};
