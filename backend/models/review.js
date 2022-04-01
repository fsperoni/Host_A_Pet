"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const User = require("../models/user");
const { NotFoundError, BadRequestError } = require("../expressError");
const e = require("cors");


/** Related functions for reviews. */

class Review {

  /** Get review by id.
   *
   * Returns { id, reviewerId, revieweeId, rating, comments }
   *
   * Throws NotFoundError if review not found.
   **/
  static async get(id) {
    const availRes = await db.query(
      `SELECT id,
        reviewer_id AS "reviewerId", 
        reviewee_id AS "revieweeId", 
        rating, 
        comments"
        FROM reviews
        WHERE id = $1`,
      [id]
    );

    const availability = availRes.rows[0];
    if (!availability) throw new NotFoundError("Availability not found!");

    return availability;
  }


  /** Get all USER reviews.
   *
   * Returns { id, reviewerId, revieweeId, rating, comments } - list of all reviews.
   *
   * Throws NotFoundError if no review found.
   **/

  static async getUserAll(username) {
    const userId = await User.getUserId(username);
    const result = await db.query(
      `SELECT id,
        reviewer_id AS "reviewerId", 
        reviewee_id AS "revieweeId", 
        rating, 
        comments
        FROM reviews
        WHERE 
          reviewer_id = $1
          OR
          reviewee_id = $1`,
      [userId]
    );

    const reviews = result.rows;
    if (!reviews) throw new NotFoundError("No reviews found!");

    await Promise.
      all(reviews.map(async (r) => {
        const reviewer = await User.getById(r.reviewerId);
        r.reviewer = reviewer.username;
        const reviewee = await User.getById(r.revieweeId);
        r.reviewee = reviewee.username;
        delete r.reviewerId;
        delete r.revieweeId;
      })).
      catch(err => { throw new BadRequestError(err) })
    return reviews;
  }

  /** Create review with data.
 *
 * Returns { id, reviewerId, revieweeId, rating, comments }
 *
 * Throws BadRequestError if review already exists for reviewer X reviewee
 **/
  static async add({ reviewerId, revieweeId, rating, comments }) {
    if (reviewerId === revieweeId) throw new BadRequestError("Review creator and reviewee can't be the same!");
    const duplicateCheck = await db.query(
      `SELECT rating 
             FROM reviews
             WHERE 
              reviewer_id = $1 
              AND
              reviewee_id = $2`,
      [reviewerId, revieweeId],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Reviewer already wrote a review for this reviewee.");
    }
    const result = await db.query(
      `INSERT INTO reviews
        (reviewer_id, 
        reviewee_id, 
        rating, 
        comments)
       VALUES ($1, $2, $3, $4)
       RETURNING reviewer_id AS "reviewerId", reviewee_id AS "revieweeId", 
        rating, comments`,
      [reviewerId, revieweeId, rating, comments]
    );
    try {
      const reviewer = await User.getById(result.reviewerId);
      result.reviewer = reviewer.username;
      const reviewee = await User.getById(result.revieweeId);
      result.reviewee = reviewee.username;
      delete result.reviewerId;
      delete result.revieweeId;
    } catch(err) {
      throw new BadRequestError(err)
    }  
    return result.rows[0];
  }


  /** Delete given review; returns undefined. */

  static async remove(reviewerId, revieweeId) {
    const result = await db.query(
      `DELETE
            FROM reviews
            WHERE reviewer_id = $1 AND reviewee_id = $2
            RETURNING reviewer_id`,
      [reviewerId, revieweeId],
    );
    const review = result.rows[0];

    if (!review) throw new NotFoundError("Review not Found!");
  }

  /** Update review.
   *
   * Returns { id, reviewerId, revieweeId, rating, comments }
   *
   * Throws NotFoundError if review not found.
   */

  static async update(id, data) {
    const duplicateCheck = await db.query(
      `SELECT rating 
             FROM reviews
             WHERE 
              reviewer_id = $1 
              AND
              reviewee_id = $2
              AND
              id != $3`,
      [data.reviewerId, data.revieweeId, id],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Reviewer already wrote a review for this reviewee.");
    }

    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        reviewerId: "reviewer_id",
        revieweeId: "reviewee_id"
      });
    // const reviewVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE reviews 
                    SET ${setCols} 
                    WHERE 
                      reviewer_id = ${data.reviewerId} 
                      AND
                      reviewee_id = ${data.revieweeId}
                    RETURNING reviewer_id AS "reviewerId",
                              reviewee_id AS "revieweeId",
                              rating,
                              comments`;
    const result = await db.query(querySql, values);
    const review = result.rows[0];

    if (!review) throw new NotFoundError("Review not found!");

    return review;
  }

}

module.exports = Review;