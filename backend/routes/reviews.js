"use strict";

/** Routes for availabilitiess. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const reviewAddSchema = require("../schemas/reviewAdd.json");
const reviewUpdateSchema = require("../schemas/reviewUpdate.json");
const { json } = require("body-parser");
const Review = require("../models/review");

const router = express.Router();


/** POST /[username] => { review }
 *
 * Returns { id, reviewerId, revieweeId, rating, comments }
 *
 * Authorization required: own user or admin
 **/

router.post("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const reviewer = await User.get(req.body.reviewer);
    const reviewerId = reviewer.id;
    const reviewee = await User.get(req.body.reviewee);
    const revieweeId = reviewee.id;
    let data = { ...req.body, reviewerId, revieweeId };
    delete data.reviewer;
    delete data.reviewee;
    const validator = jsonschema.validate(data, reviewAddSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const review = await Review.add(data);
    return res.json({ review });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => [{ review1 }, { review2 }, ... ]
 *
 * Returns list of { id, reviewerId, revieweeId, rating, comments }
 *
 * Authorization required: own user or admin
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  const username = req.params.username;
  try {
    const reviews = await Review.getUserAll(username);
    return res.json({ reviews });
  } catch (err) {
    return next(err);
  }
});


/** GET /[id] => { review }
 *
 * Returns { id, reviewerId, revieweeId, rating, comments }
 *
 * Authorization required: logged in user
 **/

router.get("/id/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const review = await Review.get(req.params.id);
    return res.json({ review });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[username]/[id]  =>  { deleted: id }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await Review.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[username]/[id] { availability } => { availability }
 *
 * Data can include:
 *   { rating, comments }
 *
 * Returns { id, reviewerId, revieweeId, rating, comments }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const reviewer = await User.get(req.body.reviewer);
    const reviewerId = reviewer.id;
    const reviewee = await User.get(req.body.reviewee);
    const revieweeId = reviewee.id;
    let data = { ...req.body, reviewerId, revieweeId };
    delete data.reviewer;
    delete data.reviewee;
    const validator = jsonschema.validate(data, reviewUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const review = await Review.update(req.params.id, data);
    return res.json({ review });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;