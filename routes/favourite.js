const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    console.log("FAVOURITES REQ BODY", req.body)
    const userId = req.session.userId;
    const listingId = req.body.listingId;
    console.log("INSERT LISTING ID", listingId)
    const sql = `INSERT
    INTO favourites (user_id, listing_id)
    VALUES ($1, $2)
    RETURNING *
    `
    //AVOID DUPLICATES
    db.query(sql, [userId, listingId])
    .then((result) => {
      res.send(result.rows)
      console.log("INSERT RESULT ROWS", result.rows)
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
  });

  router.post("/delete", (req, res) => {
    const userId = req.session.userId;
    const listingId = req.body.listingId;
    console.log("DELETE LISTING ID", listingId, "USER ID", userId)
    const sql = `DELETE
    FROM favourites
    WHERE user_id = $1 AND listing_id = $2
    RETURNING *;
    `
    db.query(sql, [userId, listingId])
    .then((data) => {
      res.send(data.rows);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
  });

  return router;
};


