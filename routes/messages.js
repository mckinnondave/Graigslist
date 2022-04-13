const express = require("express");
const router = express.Router();

module.exports = (db, dbHelpers) => {
  //
  // TO DO: Beef this up, with error and catch etc. Make sure user is logged in
  //
  router.get("/", (req, res) => {
    if (!req.session.userId) {
      res.redirect("/login");
    }
    const messagesParams = req.params;

    dbHelpers.getAllConvos(messagesParams, db).then((results) => {
      const templateVars = { results: results };
      res.render("messages", templateVars);
    });
  });

  router.get("/list", (req, res) => {
    if (!req.session.userId) {
      res.redirect("/login");
    }
    const messagesParams = req.session.userId;
    console.log("messagesPARAMS", messagesParams);
    dbHelpers.getAllConvos(messagesParams, db).then((results) => {
      console.log("RESULTS", results);
      const templateVars = { results: results };
      res.send({ results });
    });
  });

  // router.get("/", function (req, res) {
  //   DataHelpers.getTweets((err, tweets) => {
  //     if (err) {
  //       res.status(500).json({ error: err.message });
  //     } else {
  //       res.json(tweets);
  //     }
  //   });
  // });

  router.post("/", function (req, res) {
    // if (!req.session.userId) {
    //   res.redirect("/login");
    // }
    // console.log("REQ", req.session);
    // return;

    // if (!req.body.text) {
    //   res.status(400).json({ error: "invalid request: no data in POST body" });
    //   return;
    // }

    const message = {
      body: req.body.text,
      sender_id: req.session.userId,
      receiver_id: req.body.receiver_id,
      conversation_id: req.body.conversation_id,
      //if i want any further stuff like this, it comes from the hidden input field...id,conversation_id,body,sender_id,receiver_id
    };
    console.log("MESSAGE", message);
    dbHelpers
      .pushMessage(message, db)
      .then((results) => {
        res.send(200);
        // const templateVars = { results: results };
        // res.render("messages", templateVars);
      })
      .catch((err) => {
        // error message
      });

    // write to database
    // DataHelpers.saveTweet(tweet, (err) => {
    //   if (err) {
    //     res.status(500).json({ error: err.message });
    //   } else {
    //     res.status(201).send();
    //   }
    // });
  });

  return router;
};
