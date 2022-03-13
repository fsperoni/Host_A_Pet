"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, BadRequestError } = require("../expressError");


/** Related functions for pets. */

class Pet {
  
  /** Given a pet id, return data about the pet.
   *
   * Returns { id, name, type, photo, owner }
   *  where owner is { username, first_name, last_name, email, phone, postal_code }
   *
   * Throws NotFoundError if pet not found.
   **/
  
  static async getById(id) {
    const petRes = await db.query(
      `SELECT id,
      owner_id AS "ownerId",
      name,
      type,
      photo 
      FROM pets
      WHERE id = $1`,
      [id]
    );
      
    const pet = petRes.rows[0];
    if (!pet) throw new NotFoundError("Pet not found!");
    
    // Get pet owner data
    const petOwner = await db.query(
      `SELECT username, 
      first_name AS "firstName",
      last_name AS "lastName",
      email,
      phone, 
      postal_code AS "postalCode",
      FROM users
      WHERE id = $1`,
      [pet.ownerId]
    );

    pet.owner = petOwner;

    return pet;
  }

  /** Given a username, returns all pets owned.
   *
   * Returns list of pets in format { ownerId, name, type, photo }
   *
   * Throws NotFoundError if pet not found.
   **/
  
  static async getByUserId(id) {
    
    const petRes = await db.query(
      `SELECT id,
      owner_id AS "ownerId",
      name,
      type,
      photo 
      FROM pets
      WHERE owner_id = $1`,
      [id]
    );
      
    const pets = petRes.rows;
    if (!pets) throw new NotFoundError("No pets found!");
    
    return pets;
  }


  /** Create pet with data.
   *
   * Returns { id, ownerId, name, type, photo }
   *
   * Throws BadRequestError if pet name already exists for user.
   **/

  static async add({ ownerId, name, type, photo }) {
    const duplicateCheck = await db.query(
          `SELECT name
           FROM pets
           WHERE owner_id = $1 AND name = $2`,
        [ownerId, name],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`You already have a pet named ${name}.`);
    }
    const result = await db.query(
          `INSERT INTO pets
           (owner_id,
            name,
            type,
            photo)
           VALUES ($1, $2, $3, $4)
           RETURNING id, owner_id AS "ownerId", name, type, photo`,
        [
          ownerId,
          name,
          type,
          photo 
        ]
    );

    return result.rows[0];
  }

  


  /** Delete given pet from database; returns undefined. */

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM pets
           WHERE id = $1
           RETURNING name`,
        [id],
    );
    const pet = result.rows[0];

    if (!pet) throw new NotFoundError("Pet not Found!");
  }


  /** Update pet data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { name, type, photo }
   *
   * Returns { id, name, type, photo }
   *
   * Throws NotFoundError if not found.
   *
   */

  static async update(id, data) {

    const duplicateCheck = await db.query(
      `SELECT name
       FROM pets
       WHERE owner_id = $1 
        AND name = $2
        AND id != $3`,
    [data.ownerId, data.name, id],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`You already have a pet named ${data.name}.`);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          ownerId: "owner_id"
        });
    const petVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE pets 
                      SET ${setCols} 
                      WHERE id = ${petVarIdx} 
                      RETURNING id,
                                name,
                                type,
                                photo`; 
    const result = await db.query(querySql, [...values, id]);
    const pet = result.rows[0];

    if (!pet) throw new NotFoundError("Pet not found!");

    return pet;
  }

}

module.exports = Pet;
