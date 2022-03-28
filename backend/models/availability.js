"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const User = require("../models/user");
const Pet = require("../models/pet");
const { NotFoundError, BadRequestError } = require("../expressError");
const Role = require("./role");
const e = require("cors");


/** Related functions for availabilities. */

class Availability {

  /** Get availability by id.
   *
   * Returns { id, startDate, endDate, userId, roleId }
   *
   * Throws NotFoundError if availability not found.
   **/
  static async get(id) {
    const availRes = await db.query(
      `SELECT id, 
        start_date AS "startDate", 
        end_date AS "endDate", 
        user_id AS "userId", 
        role_id AS "roleId"
        FROM availabilities
        WHERE id = $1`,
      [id]
    );

    const availability = availRes.rows[0];
    if (!availability) throw new NotFoundError("Availability not found!");

    return availability;
  }

  /** Get all availabilities for date range.
   *
   * Returns { id, startDate, endDate, userId, roleId } - list of all availabilities.
   *
   * Throws NotFoundError if no availability found.
   **/

  static async getAll(username, { startDate, endDate, roleId }) {
    const userId = await User.getUserId(username);
    const result = await db.query(
      `SELECT id, 
        start_date AS "startDate", 
        end_date AS "endDate", 
        user_id AS "userId", 
        role_id AS "roleId"
        FROM availabilities
        WHERE start_date <= $1 
          AND end_date >= $2 
          AND user_id != $3
          AND role_id = $4`,
      [startDate, endDate, userId, roleId]
    );

    let availabilities = result.rows;
    if (!availabilities) throw new NotFoundError("No availabilities found!");

    const role = await Role.get(roleId);
    // Hosts do not need to necessarily own a pet
    if (role.name === "Host") {
      await Promise.
        all(availabilities.map(async (a) => {
          a.user = await Promise.resolve(User.getById(a.userId));
          a.role = role.name;
        })).
        catch(err => { throw new BadRequestError(err) })
    } else {
      await Promise.
        all(availabilities.map(async (a) => {
          a.user = await Promise.resolve(User.getById(a.userId));
          a.pets = await Promise.resolve(Pet.getByUserId(a.userId));
          a.role = role.name;
        })).
        catch(err => { throw new BadRequestError(err) })
    }

    return availabilities;
  }

  /** Get all USER availabilities.
   *
   * Returns { id, startDate, endDate, roleId } - list of all availabilities.
   *
   * Throws NotFoundError if no availability found.
   **/

  static async getUserAll(username) {
    const userId = await User.getUserId(username);
    const result = await db.query(
      `SELECT id, 
        start_date AS "startDate", 
        end_date AS "endDate", 
        role_id AS "roleId"
        FROM availabilities
        WHERE user_id = $1`,
      [userId]
    );

    const availabilities = result.rows;
    if (!availabilities) throw new NotFoundError("No availabilities found!");

    return availabilities;
  }

  /** Create availability with data.
 *
 * Returns { id, startDate, endDate, userId, roleId }
 *
 * Throws BadRequestError if availability partially or fully within 
 * another availability for the same user.
 **/
  static async add({ startDate, endDate, userId, roleId }) {
    if (startDate > endDate) throw new BadRequestError("End date must be greater than start date!");
    const duplicateCheck = await db.query(
      `SELECT id, start_date, end_date
             FROM availabilities
             WHERE user_id = $1 AND role_id = $2
              AND (
                ($3 >= start_date AND $3 <= end_date)
                OR 
                ($4 >= start_date AND $4 <= end_date)
                OR
                ($3 <= start_date AND $4 >= end_date)
              )
              `,
      [userId, roleId, startDate, endDate],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Dates match another availability.");
    }
    const result = await db.query(
      `INSERT INTO availabilities
        (start_date, 
        end_date, 
        user_id, 
        role_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, start_date AS "startDate", end_date AS "endDate", 
        user_id AS "userId", role_id AS "roleId"`,
      [startDate, endDate, userId, roleId]
    );

    return result.rows[0];
  }


  /** Delete given availability from database; returns undefined. */

  static async remove(id) {
    const result = await db.query(
      `DELETE
            FROM availabilities
            WHERE id = $1
            RETURNING id`,
      [id],
    );
    const availability = result.rows[0];

    if (!availability) throw new NotFoundError("Availability not Found!");
  }

  /** Update availability.
   *
   * Returns { id, startDate, endDate, userId, roleId }
   *
   * Throws NotFoundError if availability not found.
   * Throws BadRequestError if updated availability partially or fully within 
   * another availability for the same user.
   */

  static async update(id, data) {

    if (data.startDate > data.endDate) throw new BadRequestError("End date must be greater than start date!");
    const duplicateCheck = await db.query(
      `SELECT id, start_date, end_date
             FROM availabilities
             WHERE user_id = $1 AND role_id = $2 AND id != $5
              AND (
                ($3 >= start_date AND $3 <= end_date)
                OR 
                ($4 >= start_date AND $4 <= end_date)
                OR
                ($3 <= start_date AND $4 >= end_date)
              )
              `,
      [data.userId, data.roleId, data.startDate, data.endDate, id],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Dates match another availability.");
    }

    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        startDate: "start_date",
        endDate: "end_date",
        userId: "user_id",
        roleId: "role_id",
      });
    const availVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE availabilities 
                    SET ${setCols} 
                    WHERE id = ${availVarIdx} 
                    RETURNING id,
                              start_date AS "startDate",
                              end_date AS "endDate",
                              user_id AS "userId",
                              role_id AS "roleId"`;
    const result = await db.query(querySql, [...values, id]);
    const availability = result.rows[0];

    if (!availability) throw new NotFoundError("Availability not found!");

    return availability;
  }

  /** Split availability.
   *
   * Returns { success }
   *
   * Throws NotFoundError if availability not found.
   * Throws BadRequestError if updated availability partially or fully within 
   * another availability for the same user.
   */

  static async split(id, startDate, endDate) {
    const avail = await this.get(id);
    const availStartDate = new Date(avail.startDate).toISOString().substring(0, 10);
    const availEndDate = new Date(avail.endDate).toISOString().substring(0, 10);
    let start = new Date(startDate);
    start.setDate(start.getDate() - 1);
    start = start.toISOString().substring(0, 10);
    let end = new Date(endDate);
    end.setDate(end.getDate() + 1);
    end = end.toISOString().substring(0, 10);
    try {
      if (startDate === availStartDate && endDate === availEndDate) {
        await this.remove(id);
      } else if (start < availStartDate) {
        await this.update(id, { startDate: end });
      } else if (end > availEndDate) {
        await this.update(id, { endDate: start });
      } else {
        await this.update(id, { endDate: start });
        await this.add({ startDate: end, endDate: avail.endDate, userId: avail.userId, roleId: avail.roleId });
      }
    } catch (err) {
      console.log("Availability catch", err);
      return false;
    }
    return true;
  }
}

module.exports = Availability;