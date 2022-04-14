// PG database client/connection setup
// not sure about this, if not working... check with a mentor
// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);
// const {userObj} = require('./routes/search');
  // const userObj = 2;
// Searches database for items where name or description contain all or part of a search query
const getSearchResults = (name, db, userObj) => {
  // console.log("DOCUMENT", document)

  const queryParams = [`%${name}%`, userObj];
  let getSearchResultsQuery = `
  SELECT *, EXISTS (SELECT * from favourites WHERE listing_id = listings.id and user_id = $2 ) as favourite
  FROM listings
  WHERE description iLIKE $1 OR name iLIKE $1;
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
  const queryParams = [options];
  let getAllListingsQuery = `
  SELECT listings.*, users.name as user_name, EXISTS (SELECT * from favourites WHERE listing_id = listings.id and user_id = $1 ) as favourite
    FROM listings
    JOIN users ON creator_id = users.id
    ORDER BY listings.id
    ;
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
const getAllMessagesForConvo = (conversationId, db) => {
  const queryParams = [conversationId];
  console.log("conversationId", conversationId);
  let getCategoryListingsQuery = `
  SELECT *
    FROM messages
    JOIN conversations ON conversation_id = conversations.id
    WHERE conversation_id = $1
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
  console.log("USERID", userId);
  let getAllConvosQuery = `

select distinct on (conversations.id)
conversations.id as conversation_id,
listings.name as listing_name,
listings.creator_id as creator_id,
messages.sender_id as sender_id,
messages.receiver_id as receiver_id,
a.name as sender_name,
b.name as receiver_name
from conversations
join messages on conversations.id = conversation_id
JOIN users a ON messages.sender_id = a.id
JOIN users b ON messages.receiver_id = b.id
JOIN listings ON listing_id = listings.id
where sender_id = $1 or receiver_id = $1
group by conversations.id, messages.sender_id, messages.receiver_id, a.name, b.name, listings.name, listings.creator_id
ORDER BY conversation_id;



  `;
  return db
    .query(getAllConvosQuery, queryParams)
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

const getUserInfo = (object, db) => {
  const queryParams = [object];
  console.log("OBJECT", object);
  let getUserInfoQuery = `
  SELECT *
    FROM users
    WHERE users.id = $1;
  `;
  return db
    .query(getUserInfoQuery, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUserItems = (userId, db) => {
  const queryParams = [userId];
  console.log("userId", userId);
  let getUserItemsQuery = `
  SELECT * FROM listings
    WHERE creator_id = $1
    ORDER BY id DESC;
  `;
  return db
    .query(getUserItemsQuery, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUserFavourites = (userId, db) => {
  const queryParams = [userId];
  console.log("userId", userId);
  let getUserFavouritesQuery = `
  SELECT *
  FROM favourites
  JOIN listings
  ON listings.id = favourites.listing_id
  WHERE user_id = $1
  `;
  return db
    .query(getUserFavouritesQuery, queryParams)
    .then((result) => {
      return result.rows;
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
  getUserInfo,
  getUserItems,
  getUserFavourites,
  getAllMessagesForConvo,
  pushMessage,
  getAllConvos,
  getMostLikedListings,
};

// SELECT *,
// EXISTS (SELECT * from favourites WHERE listing_id = listings.id and user_id = 1 ) as favourite
//   FROM listings
//   WHERE description 'pancho' OR name iLIKE 'pancho';
