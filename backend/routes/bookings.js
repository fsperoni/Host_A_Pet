"use strict";

/** Routes for bookings. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const bookingAddSchema = require("../schemas/bookingAdd.json");
const { json } = require("body-parser");
const Booking = require("../models/booking");

const router = express.Router();


/** POST /[username] => { booking }
 *
 * Returns { id, startDate, endDate, hostId, petId }
 *
 * Authorization required: own user or admin
 **/

router.post("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, bookingAddSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const booking = await Booking.add(req.body);
    return res.json({ booking });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => [{ booking1 }, {booking2}, ... ]
 *
 * Returns list of { id, startDate, endDate, hostId, petId }
 * for specified user.
 *
 * Authorization required: own user or admin
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  const username = req.params.username;
  try {
    const bookings = await Booking.getUserAll(username);
    return res.json({ availabilities });
  } catch (err) {
    return next(err);
  }
});


/** GET /[id] => { booking }
 *
 * Returns { id, startDate, endDate, hostId, petId }
 *
 * Authorization required: logged in user
 **/

router.get("/id/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const booking = await Booking.get(req.params.id);
    return res.json({ booking });
  } catch (err) {
    return next(err);
  }
});

/** GET /dates => [{ avail1 }, {avail2}, ... ]
 *
 * Returns list of { id, startDate, endDate, hostId, petId }
 * for data specified in request body.
 *
 * Authorization required: logged in user
 **/

router.get("/dates", ensureLoggedIn, async function (req, res, next) {
  try {
    const bookings = await Booking.getAll(req.body);
    return res.json({ bookings });
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
    await Booking.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;