"use strict";

/** Routes for availabilitiess. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const availAddSchema = require("../schemas/availabilityAdd.json");
const availUpdateSchema = require("../schemas/availabilityEdit.json");
const { json } = require("body-parser");
const Availability = require("../models/availability");

const router = express.Router();


/** POST /[username] => { availability }
 *
 * Returns { id, startDate, endDate, userId, roleId }
 *
 * Authorization required: own user or admin
 **/

router.post("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  const username = req.params.username;
  const userId = await User.getUserId(username);
  const data = { ...req.body, userId }
  try {
    const validator = jsonschema.validate(data, availAddSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const availability = await Availability.add(data);
    return res.json({ availability });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => [{ avail1 }, {avail2}, ... ]
 *
 * Returns list of { id, startDate, endDate, userId, roleId }
 * for range specified in request body.
 *
 * Authorization required: own user or admin
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  const username = req.params.username;
  try {
    const availabilities = await Availability.getUserAll(username);
    return res.json({ availabilities });
  } catch (err) {
    return next(err);
  }
});


/** GET /[id] => { availability }
 *
 * Returns { id, startDate, endDate, userId, roleId }
 *
 * Authorization required: logged in user
 **/

router.get("/id/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const availability = await Availability.get(req.params.id);
    return res.json({ availability });
  } catch (err) {
    return next(err);
  }
});

/** GET /dates => [{ avail1 }, {avail2}, ... ]
 *
 * Returns list of { id, startDate, endDate, userId, roleId }
 * for range specified in request body.
 *
 * Authorization required: logged in user
 **/

router.get("/dates", ensureLoggedIn, async function (req, res, next) {
  try {
    const availabilities = await Availability.getAll(req.body);
    return res.json({ availabilities });
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
    await Availability.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[username]/[id] { availability } => { availability }
 *
 * Data can include:
 *   { startDate, endDate, userId, roleId }
 *
 * Returns { id, startDate, endDate, userId, roleId }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const username = req.params.username;
    const userId = await User.getUserId(username);
    const data = { ...req.body, userId }
    const validator = jsonschema.validate(data, availUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const availability = await Availability.update(req.params.id, data);
    return res.json({ availability });
  } catch (err) {
    return next(err);
  }
});



module.exports = router;