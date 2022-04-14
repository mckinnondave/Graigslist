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
    const { dataId } = req.body;
    console.log("DELETE LISTING ID", dataId)
    const sql = `DELETE
    FROM listings
    WHERE id = ${dataId}
    `
    db.query(sql)
    .then(() => {
      res.send("Ok")
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
  });

  return router;
};


