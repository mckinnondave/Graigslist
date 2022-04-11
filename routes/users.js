/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({ message: "not logged in" });
      return;
    }
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.render("user");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

// router.get("/", (req, res) => {
//     const userId = req.session.userId;
//     if (!userId) {
//       res.send({ message: "not logged in" });
//       return;
//     }

//     database
//       .getUserWithId(userId)
//       .then((user) => {
//         if (!user) {
//           res.send({ error: "no user with that id" });
//           return;
//         }

//         res.send({ user: { name: user.name, email: user.email, id: userId } });
//       })
//       .catch((e) => res.send(e));
//   });

