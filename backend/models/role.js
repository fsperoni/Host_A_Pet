"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");


/** Related functions for roles. */

class Role {

  /** Get role by id.
   *
   * Returns { id, name }
   *
   * Throws NotFoundError if role not found.
   **/
  static async get(id) {
    const roleRes = await db.query(
      `SELECT id, name
        FROM roles
        WHERE id = $1`,
      [id]
    );

    const role = roleRes.rows[0];
    if (!role) throw new NotFoundError("Role not found!");

    return role;
  }

  /** Get all roles.
   *
   * Returns [{ id, name }] - list of all roles.
   *
   * Throws NotFoundError if no roles found.
   **/

  static async getAll() {
    const result = await db.query(
      `SELECT id, name FROM roles`
    );

    const roles = result.rows;
    if (!roles) throw new NotFoundError("No roles found!");

    return roles;
  }

  /** Create role with data.
 *
 * Returns { id, name }
 *
 * Throws BadRequestError if role name already exists.
 **/

  static async add({ name }) {
    const duplicateCheck = await db.query(
      `SELECT name
             FROM roles
             WHERE name = $1`,
      [name],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Role already exists: ${name}.`);
    }
    const result = await db.query(
      `INSERT INTO roles
             (name)
             VALUES ($1)
             RETURNING id, name`,
      [name]
    );

    return result.rows[0];
  }


  /** Delete given role from database; returns undefined. */

  static async remove(id) {
    const result = await db.query(
      `DELETE
            FROM roles
            WHERE id = $1
            RETURNING name`,
      [id],
    );
    const role = result.rows[0];

    if (!role) throw new NotFoundError("Role not Found!");
  }

  /** Update role name.
   *
   * Returns { id, name }
   *
   * Throws NotFoundError if role not found.
   */

  static async update(id, { name }) {

    const duplicateCheck = await db.query(
      `SELECT name
        FROM roles
        WHERE name = $1`,
      [name],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Role already exists: ${name}.`);
    }

    const result = await db.query(
      `UPDATE roles 
        SET name = $1
        WHERE id = $2
       RETURNING id, name`,
      [name, id]
    );
    const role = result.rows[0];
    if (!role) throw new NotFoundError("Role not found!");
    return role;
  }
}

module.exports = Role;