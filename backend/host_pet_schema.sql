CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  phone TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  photo TEXT NOT NULL,
  owner_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE
);

CREATE TABLE hostings (
  id SERIAL PRIMARY KEY, 
  start_date DATE NOT NULL, 
  end_date DATE NOT NULL, 
  host_id INTEGER NOT NULL 
    REFERENCES users ON DELETE CASCADE, 
  owner_id INTEGER NOT NULL 
    REFERENCES users ON DELETE CASCADE
);

CREATE TABLE reviews (
  rating INTEGER NOT NULL, 
  comments TEXT, 
  reviewer_id INTEGER REFERENCES users ON DELETE CASCADE, 
  reviewee_id INTEGER REFERENCES users ON DELETE CASCADE, 
  PRIMARY KEY (reviewer_id, reviewee_id)
);

CREATE TABLE availabilities (
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  role_id INTEGER NOT NULL
    REFERENCES roles ON DELETE CASCADE
)