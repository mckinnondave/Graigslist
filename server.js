// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const dbHelpers = require("./helpers");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// setup cookie session
app.use(
  cookieSession({
    name: "session",
    keys: [
      "C&F)J@Nc",
      "9y$B&E)H",
      "s6v9y/B?",
      "Xp2s5v8y",
      "fUjXn2r5",
      "McQfTjWn",
      "(H+MbQeT",
      "A?D(G+Kb",
      "8x!A%D*G",
      "r4u7w!z%",
    ],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const searchRoutes = require("./routes/search");
const listingsRoutes = require("./routes/listings");
const messagesRoutes = require("./routes/messages");
const favouriteRoutes = require("./routes/favourite");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/user", usersRoutes(db, dbHelpers));
app.use("/login", loginRoutes(db, dbHelpers));
app.use("/logout", logoutRoutes());
app.use("/search", searchRoutes(db, dbHelpers));
app.use("/listings", listingsRoutes(db, dbHelpers));
app.use("/messages", messagesRoutes(db, dbHelpers));
app.use("/favourite", favouriteRoutes(db, dbHelpers));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const listingParams = req.params;
  dbHelpers.getMostLikedListings(listingParams, db).then((results) => {
    const userObj = req.session.userId
    // console.log("result", results);
    // res.send(results);
    const templateVars = { results: results, userObj };
    res.render("index", templateVars);
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
