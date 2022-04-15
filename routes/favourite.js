const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    console.log("FAVOURITES REQ BODY", req.body)
    const userId = req.session.userId;
    const listingId = req.body.listingId;
    console.log("INSERT LISTING ID", listingId)
    const checkData = `SELECT *
    FROM favourites
    WHERE user_id = $1
    AND listing_id = $2
    `
    const sql = `INSERT
    INTO favourites (user_id, listing_id)
    VALUES ($1, $2)
    RETURNING *
    `
    db.query(checkData, [userId, listingId])
    .then((result) => {
      console.log("FAVOURITED RESULT", result.rows.length)
      if(result.rows.length === 0) {
        db.query(sql, [userId, listingId])
        .then((result) => {
          res.send(result.rows)
          console.log("INSERT RESULT ROWS", result.rows)
        })
        .catch((e) => {
          console.error(e);
          res.send(e);
        });
      } else {
        console.log("this has already been favourited")
      }
    })
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


