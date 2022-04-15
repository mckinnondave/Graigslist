const express = require("express");
const router = express.Router();

module.exports = (db, dbHelpers) => {
  //
  // TO DO: Beef this up, with error and catch etc. Make sure user is logged in
  //
  router.get("/", (req, res) => {
    if (!req.session.userId) {
      res.redirect("/");
    }
    const messagesParams = req.session.userId;
    dbHelpers.getAllConvos(messagesParams, db).then((results) => {
      const templateVars = { results: results, userId: req.session.userId };
      res.render("messages", templateVars);
    });
  });

  router.get("/list", (req, res) => {
    if (!req.session.userId) {
      res.redirect("/login");
    }
    const messagesParams = req.session.userId;
    dbHelpers.getAllConvos(messagesParams, db).then((results) => {
      // console.log("HELLOTHERE", req.session.userId);
      // console.log("RESULTS", results);
      res.send({ results, userId: req.session.userId });
    });
  });

  router.get("/convo/:conversation_id", (req, res) => {
    if (!req.session.userId) {
      res.redirect("/login");
    }
    // const messagesParams = req.session.userId;
    // console.log("messagesPARAMS", messagesParams);
    const conversationId = req.params.conversation_id;
    dbHelpers.getAllMessagesForConvo(conversationId, db).then((results) => {
      console.log("RESULTS", results);
      // const templateVars = { results: results };
      res.send({ results });
    });
  });

  router.post("/:id", function (req, res) {
    // console.log("REQBODY", req.body.listing_id);
    const message = {
      body: req.body.text,
      sender_id: req.session.userId,
      receiver_id: req.body.receiver_id,
      listing_id: req.body.listing_id,
    };
    console.log("MESSAGE", message);
    dbHelpers
      .makeAnOfferPush(message, db)
      .then((results) => {
        res.send(200);
      })
      .catch((err) => {
        // error message
      });
  });

  router.post("/", function (req, res) {
    const message = {
      body: req.body.text,
      sender_id: req.session.userId,
      receiver_id: req.body.receiver_id,
      conversation_id: req.body.conversation_id,
    };
    console.log("MESSAGE", message);
    dbHelpers
      .pushMessage(message, db)
      .then((results) => {
        res.send(200);
      })
      .catch((err) => {
        // error message
      });
  });

  return router;
};
