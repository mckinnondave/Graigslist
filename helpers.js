// PG database client/connection setup
// not sure about this, if not working... check with a mentor
// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);

// Searches database for items where name or description contain all or part of a search query
const getSearchResults = (name, db) => {
  const queryParams = [`%${name}%`];
  let getSearchResultsQuery = `
  SELECT *
    FROM listings
    WHERE description iLIKE $1 OR name iLIKE $1
  `;
  return db
    .query(getSearchResultsQuery, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
// used to get most favourited items to display on home page
const getMostLikedListings = (options, db) => {
  const queryParams = [];
  let getMostLikedListingsQuery = `
  SELECT listings.id, name, description, category_id, price_in_cents, image_url, sold, count(favourites.listing_id) as like_count
  FROM listings
  JOIN favourites ON listings.id = listing_id
  GROUP BY listings.id
  ORDER BY like_count DESC
  LIMIT 8;
  `;
  return db
    .query(getMostLikedListingsQuery, queryParams)
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// used to get all listings for our /listings page
const getAllListings = (options, db) => {
  const queryParams = [];
  let getAllListingsQuery = `
  SELECT listings.*, users.name as user_name
    FROM listings
    JOIN users ON creator_id = users.id;
  `;
  return db
    .query(getAllListingsQuery, queryParams)
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Searches database for listing matching an id, and returns it. Used for individual product listing.
const getSingleListing = (object, db) => {
  const queryParams = [object.id];
  console.log("OBJECT", object);
  let getSingleListingQuery = `
  SELECT *
    FROM listings
    WHERE id = $1;
  `;
  return db
    .query(getSingleListingQuery, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getCategoryListings = (object, db) => {
  const queryParams = [object.category_slug];
  console.log("OBJECT", object);
  let getCategoryListingsQuery = `
  SELECT *
    FROM listings
    JOIN categories
    ON categories.id = listings.category_id
    WHERE category_slug = $1;
  `;
  return db
    .query(getCategoryListingsQuery, queryParams)
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
const getAllMessagesForConvo = (object, db) => {
  const queryParams = [object.conversation_id];
  console.log("OBJECT", object);
  let getCategoryListingsQuery = `
  SELECT *
    FROM messages
    JOIN conversations ON conversations_id = conversations.id
    WHERE conversations_id = $1
    ORDER BY messages.id DESC;
  `;
  return db
    .query(getCategoryListingsQuery, queryParams)
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllConvos = (userId, db) => {
  const queryParams = [userId];
  console.log("OBJECT", userId);
  let getCategoryListingsQuery = `
  SELECT distinct
    conversations.id as conversation_id,
    users.id as user_id,
    users.name as user_name,
    listings.name as listing_name,
    listings.creator_id as creator_id,
    messages.sender_id as sender_id,
    messages.receiver_id as receiver_id
  FROM conversations
  INNER JOIN messages ON conversations.id = conversation_id
  INNER JOIN users ON messages.receiver_id = users.id
  INNER JOIN listings ON listing_id = listings.id
  WHERE creator_id = '1' AND sender_id = '1' OR receiver_id = '1';
  `;
  return db
    .query(getCategoryListingsQuery)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const pushMessage = (message, db) => {
  // insert here.
  const queryParams = [
    message.conversation_id,
    message.body,
    message.sender_id,
    message.receiver_id,
  ];
  console.log("MESSAGE", message);
  console.log("queryParams", queryParams);
  let pushMessageQuery = `
    INSERT INTO messages
      (conversation_id,body,sender_id,receiver_id)
    VALUES
      ($1, $2, $3, $4);
  `;
  return db
    .query(pushMessageQuery, queryParams)
    .then((result) => {
      console.log("RESULT ROWS", result.rows);
      return;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getSearchResults,
  getAllListings,
  getSingleListing,
  getCategoryListings,
  getAllMessagesForConvo,
  pushMessage,
  getAllConvos,
  getMostLikedListings,
};

//get all properties from light bnb
