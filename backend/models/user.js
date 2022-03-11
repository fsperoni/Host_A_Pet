"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, BadRequestError, UnauthorizedError,} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {

  /** Authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, phone, postal_code, is_admin }
   *
   * Raises UnauthorizedError if user not found or wrong password.
   **/
  static async authenticate(username, password) {
    const result = await db.query(
          `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  phone,
                  postal_code AS "postalCode",
                  is_admin AS "isAdmin"

           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Create user with data.
   *
   * Returns { username, firstName, lastName, email, phone, postalCode, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({ username, password, firstName, lastName, email, phone, postalCode, isAdmin }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Username already in use: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            phone,
            postal_code,
            is_admin)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, phone, 
            postal_code AS "postalCode", is_admin AS "isAdmin"`,
        [
          username,
          hashedPassword,
          firstName,
          lastName,
          email,
          phone, 
          postalCode,
          isAdmin
        ]
    );

    return result.rows[0];
  }

  
  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, email, phone, postal_code, is_admin}
   *
   * Throws NotFoundError if user not found.
   **/
  
  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
      first_name AS "firstName",
      last_name AS "lastName",
      email,
      phone, 
      postal_code AS "postalCode",
      is_admin AS "isAdmin"
      FROM users
      WHERE username = $1`,
      [username]
    );
      
    const user = userRes.rows[0];
    if (!user) throw new NotFoundError(`User not found: ${username}`);
    
    return user;
  }


  /** Get user id from username. */

  static async getUserId(username) {
    const result = await db.query(
      `SELECT id 
        FROM users
        WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];
    if (!user) throw new NotFoundError(`User not found: ${username}`);
    
    return user.id;
  }


  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`User not found: ${username}`);
  }


  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, phone, postalCode }
   *
   * Returns { username, firstName, lastName, email, phone, postalCode, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password.
   * Callers of this function must be certain they have validated inputs to this
   * or there can be serious security risks.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          firstName: "first_name",
          lastName: "last_name",
          postalCode: "postal_code",
          isAdmin: "is_admin"
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                phone, 
                                postal_code AS "postalCode",
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

}

module.exports = User;
