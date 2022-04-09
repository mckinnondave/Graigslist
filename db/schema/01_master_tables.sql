-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  street_name VARCHAR(255),
  post_code VARCHAR(255),
  location_latitude VARCHAR(255),
  location_logitude VARCHAR(255),
);

DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  price_in_cents SMALLINT NOT NULL,
  image_url VARCHAR(255),
  sold BOOLEAN NOT NULL DEFAULT false,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category_name VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
);

DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  listing_id INTEGER REFERENCS listings(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS conversations CASCADE;
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  listing_id INTEGER REFERENCS listings(id) ON DELETE CASCADE,
  convo_starter_id INTEGER REFERENCS users(id) ON DELETE CASCADE,
  recipient_id INTEGER REFERENCS users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  conversation_id INTEGER REFERENCS conversations(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  timestamp TIMESTAMPTZ,
  sender_id INTEGER REFERENCS users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCS users(id) ON DELETE CASCADE
);


