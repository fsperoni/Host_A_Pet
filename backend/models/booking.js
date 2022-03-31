"use strict";

const db = require("../db");
const User = require("../models/user");
const { NotFoundError, BadRequestError, ServerError } = require("../expressError");
const Availability = require("./availability");


/** Related functions for bookings. */

class Booking {

  /** Get booking by id.
   *
   * Returns { id, startDate, endDate, hostId, ownerId }.
   *
   * Throws NotFoundError if booking not found.
   **/
  static async get(id) {
    const availRes = await db.query(
      `SELECT id, 
        start_date AS "startDate", 
        end_date AS "endDate", 
        host_id AS "hostId", 
        owner_id AS "ownerId"
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
   * Returns { id, startDate, endDate, hostId, ownerId }
   *
   * Throws BadRequestError if booking partially or fully within 
   * another booking for the same host or owner.
   **/
  static async add({ startDate, endDate, hostId, ownerId, availabilityId }) {
    if (startDate > endDate) throw new BadRequestError("End date must be greater than start date!");
    const duplicateCheck = await db.query(
      `SELECT id
               FROM hostings
               WHERE ((host_id = $1 OR owner_id = $2)
                AND (
                  ($3 >= start_date AND $3 <= end_date)
                  OR 
                  ($4 >= start_date AND $4 <= end_date)
                  OR
                  ($3 <= start_date AND $4 >= end_date)
                )
               )`,
      [hostId, ownerId, startDate, endDate],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Dates match another booking.");
    }

    //Breakdown availability, if needed.
    const isSplit = await Availability.split(availabilityId, startDate, endDate);

    if (!isSplit) throw new ServerError("Unable to update availability!");

    const result = await db.query(
      `INSERT INTO hostings
          (start_date, 
          end_date, 
          host_id, 
          owner_id)
         VALUES ($1, $2, $3, $4)
         RETURNING id, start_date AS "startDate", end_date AS "endDate", 
          host_id AS "hostId", owner_id AS "ownerId"`,
      [startDate, endDate, hostId, ownerId]
    );
    return result.rows[0];
  }


  /** Get all USER bookings.
 *
 * Returns { id, startDate, endDate, hostId, ownerId } - list of all bookings.
 *
 * Throws NotFoundError if no availability found.
 **/

  static async getUserAll(username) {
    const userId = await User.getUserId(username);
    const result = await db.query(
      `SELECT id, 
          start_date AS "startDate", 
          end_date AS "endDate", 
          host_id AS "hostId", 
          owner_id AS "ownerId"
          FROM hostings
          WHERE owner_id = $1 OR host_id = $1`,
      [userId]
    );

    let bookings = result.rows;
    if (!bookings) throw new NotFoundError("No bookings found!");
    // return bookings;
    await Promise.all(bookings.map(async (b) => {
      if (b.hostId === userId) { // user is a host
        b.role1 = "Host";
        b.role2 = "Pet Owner";
        const user = await Promise.resolve(User.getById(b.ownerId));
        b.user = {username: user.username, rating: 0}
      } else if (b.ownerId === userId) { //user is pet owner
        b.role1 = "Pet Owner";
        b.role2 = "Host";
        const user = await Promise.resolve(User.getById(b.hostId));
        b.user = {username: user.username, rating: 0}
      } else {
        throw new BadRequestError("Unable to fetch booking");
      }
      b.startDate = new Date(b.startDate).toISOString().substring(0, 10);
      b.endDate = new Date(b.endDate).toISOString().substring(0, 10);
    }));

    return bookings;


  }

  /** Get all bookings for date range and role.
   *
   * Returns { id, startDate, endDate, hostId, ownerId } - list of all bookings.
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

    const bookings = result.rows;
    if (!bookings) throw new NotFoundError("No bookings found!");

    return bookings;
  }


}

module.exports = Booking;