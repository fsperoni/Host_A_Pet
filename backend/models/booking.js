"use strict";

const db = require("../db");
const User = require("../models/user");
const { NotFoundError, BadRequestError } = require("../expressError");


/** Related functions for bookings. */

class Booking {

  /** Get booking by id.
   *
   * Returns { id, startDate, endDate, hostId, petId }.
   *
   * Throws NotFoundError if booking not found.
   **/
  static async get(id) {
    const availRes = await db.query(
      `SELECT id, 
        start_date AS "startDate", 
        end_date AS "endDate", 
        host_id AS "hostId", 
        pet_id AS "petId"
        FROM hostings
        WHERE id = $1`,
      [id]
    );

    const hosting = availRes.rows[0];
    if (!hosting) throw new NotFoundError("Booking not found!");

    return hosting;
  }


  /** Create booking with data.
   *
   * Returns { id, startDate, endDate, hostId, petId }
   *
   * Throws BadRequestError if booking partially or fully within 
   * another booking for the same host or pet.
   **/
  static async add({ startDate, endDate, hostId, petId }) {
    if (startDate > endDate) throw new BadRequestError("End date must be greater than start date!");
    const duplicateCheck = await db.query(
      `SELECT id
               FROM hostings
               WHERE (host_id = $1 OR pet_id = $2
                AND (
                  ($3 >= start_date AND $3 <= end_date)
                  OR 
                  ($4 >= start_date AND $4 <= end_date)
                  OR
                  ($3 <= start_date AND $4 >= end_date)
                )
                `,
      [hostId, petId, startDate, endDate],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Dates match another booking.");
    }
    const result = await db.query(
      `INSERT INTO hostings
          (start_date, 
          end_date, 
          host_id, 
          pet_id)
         VALUES ($1, $2, $3, $4)
         RETURNING id, start_date AS "startDate", end_date AS "endDate", 
          host_id AS "hostId", pet_id AS "petId"`,
      [startDate, endDate, hostId, petId]
    );

    return result.rows[0];
  }


  /** Get all USER bookings.
 *
 * Returns { id, startDate, endDate, host, pet } - list of all bookings.
 * where host = { id, firstName, lastName, password, email, phone, postalCode } 
 * and pet = { id, name, type, photo, owner }
 * and pet owner = { id, firstName, lastName, password, email, phone, postalCode }
 *
 * Throws NotFoundError if no availability found.
 **/

  static async getUserAll(username) {
    const userId = await User.getUserId(username);
    const result = await db.query(
      `SELECT h.id, 
          h.start_date AS "startDate", 
          h.end_date AS "endDate", 
          h.host_id AS "hostId", 
          h.pet_id AS "petId",
          p.owner_id AS "ownerId",
          FROM hostings AS h
          JOIN pets AS p
          ON h.pet_id = p.id
          WHERE p.owner_id = $1
      UNION
      SELECT h.id, 
          h.start_date AS "startDate", 
          h.end_date AS "endDate", 
          h.host_id AS "hostId", 
          h.pet_id AS "petId",
          p.owner_id AS "ownerId",
          FROM hostings AS h
          JOIN pets AS p
          ON h.pet_id = p.id
          WHERE host_id = $1`,
      [userId]
    );

    const bookings = result.rows;
    if (!bookings) throw new NotFoundError("No bookings found!");

    return bookings;
  }

  /** Get all bookings for date range and role.
   *
   * Returns { id, startDate, endDate, host, pet } - list of all bookings.
   * where host = { id, firstName, lastName, password, email, phone, postalCode } 
   * and pet = { id, name, type, photo, owner }
   * and pet owner = { id, firstName, lastName, password, email, phone, postalCode }
   *
   * Throws NotFoundError if no booking found.
   **/

  static async getAll(username, { start, end, roleId }) {
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
          AND id != $3
          AND role_id = $4`,
      [start, end, userId, roleId]
    );

    const availabilities = result.rows;
    if (!availabilities) throw new NotFoundError("No availabilities found!");

    return availabilities;
  }


}

module.exports = Booking;