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

   // Create New Listing Handler
  router.post("/create", (req, res) => {
    console.log("request created")
    console.log(req.body);
    const { name, price, image } = req.body;
    // const sql = `
    //   INSERT INTO listings (name, description, category_id, price_in_cents, image_url, sold, creator_id)
    //   VALUES ($1,$2,$3,$4,$5,$6,$7)
    //   RETURNING *;
    //   `;
    // db.query(sql, [])
    //   .then((results) => {
    //     // const templateVars = { results }
    //     // res.render("/user", templateVars)
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //     res.send(e);
    //   });
  });
  return router;
};

