const express = require("express");
const router = express.Router();

// id,user_id,listing_id
module.exports = () => {
  router.post("/", (req, res) => {
    console.log(req.body)
    const userId = req.session.userId;
    const listingId = req.session.listing
    sql = `INSERT
    INTO favourites
    `
  });
  return router;
};
