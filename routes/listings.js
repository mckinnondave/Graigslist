const express = require("express");
const router = express.Router();

module.exports = (db, dbHelpers) => {

  router.get("/", (req, res) => {
    const listingParams = req.params;
    console.log("INDEX PAGE REQ.PARAMS", req.params)
    dbHelpers.getAllListings(listingParams, db).then((results) => {
      const templateVars = { results: results };
      res.render("listings", templateVars);
    });
  });

  // get a single listing route, need to modify from lightbnb
  router.get("/:id", (req, res) => {
    const listingParams = req.params;
    console.log(req.params);
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
    // console.log(req.body);
    const productName = req.body.productName;
    const category_id = req.body.category;
    const price = (req.body.price)*1000;
    const image_url = req.body.image_url;
    const description = req.body.description;
    const creator_id = req.session.userId;
// console.log("REQSESS", req.session);
    const sql = `
      INSERT INTO listings (name, category_id, price_in_cents, image_url, description, creator_id)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *;
      `;
    db.query(sql, [productName, category_id, price, image_url, description, creator_id])
      .then((result) => {
        // console.log("Results", result.rows)
        // const templateVars =  result.rows[0]
        // res.render("user", templateVars)
        res.send(result.rows)
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/delete", (req,res) => {
    const { dataId } = req.body;
    const itemQuery = `
    DELETE FROM listings
    WHERE id = ${dataId}
    `
    db.query(itemQuery)
    .then(() => {
      res.send("OK");
    })
  })

  return router;
};

