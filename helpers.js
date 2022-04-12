// PG database client/connection setup
// not sure about this, if not working... check with a mentor
// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);

const getSearchResults = (name, db) => {
  const queryParams = [`%${name}%`];
  let getSearchResultsQuery = `
  SELECT *
    FROM listings
    WHERE description iLIKE $1 OR name iLIKE $1
  `;

  //WHERE name LIKE %${$1}%

  return db
    .query(getSearchResultsQuery, queryParams)
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllListings = (options, db) => {
  const queryParams = [];
  let getAllListingsQuery = `
  SELECT listings.*, users.name as user_name
    FROM listings
    JOIN users ON creator_id = users.id
    ORDER BY name
    LIMIT 4;
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
      // console.log("LOOK HERE", result.rows[0]);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getSearchResults, getAllListings, getSingleListing };

//get all properties from light bnb
