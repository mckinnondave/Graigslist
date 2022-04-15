# Graigslist

## Overview

Graigslist is an app that allows fictitious users to create items for sale, have those items saved to a database, and then display them on various pages. The items can be searched for and favourited by a user, and an owner for an item can delete or mark their items as sold. As well, a messaging app has been created for the site to allow users and owners to interact with one another.

This app was created as a Lighthouse Labs midterm project whose contributors are:
- Dustin Grof (dustingrof)
- Emily Bozek (feltfan)
- Dave McKinnon (mckinnondave)

## Features

Users can:
- View featured listings on the homepage
- Click on a product's name and be redirected to that product's page
- View items in various categories
- Search for items through a search bar
- Sort items by price (high-to-low or low-to-high)

Account Owners can:
- Do all that a non-account user can plus:
  - Login
  - View their profile
  - Create a new listing
  - "Like" products to save for later viewing
  - Delete items they have posted
  - Mark items as sold (which is shown on all other pages showing the item)
  - Start or join conversations with other account owners

## Screenshots

!["Homepage"](https://github.com/mckinnondave/buy-sell/blob/master/images/screencapture-localhost-8080-2022-04-14-22_29_23.png?raw=true)
!["Category Search"](https://github.com/mckinnondave/buy-sell/blob/master/images/screencapture-localhost-8080-listings-categories-furniture-2022-04-14-22_30_33.png?raw=true)
!["User Page"](https://github.com/mckinnondave/buy-sell/blob/master/images/screencapture-localhost-8080-user-2-2022-04-14-22_31_16.png?raw=true)
!["User Page With New Product Listing Form"](hhttps://github.com/mckinnondave/buy-sell/blob/master/images/screencapture-localhost-8080-user-6-2022-04-14-22_32_37.png?raw=true)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `midterm`

3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

8. Visit `http://localhost:8080/`

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples.
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds.
  - It runs through each of the files, in order, and executes them against the database.
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Chalk ^2.4.2
- Cookie-session ^2.0.0
- Dotenv ^2.0.0
- Ejs ^2.6.2
- Express ^4.17.1
- Morgan ^1.9.1
- Node-sass ^7.0.1
- Sass ^1.35.1

## Dev Dependencies

- Nodemon ^2.0.15


