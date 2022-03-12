"use strict";

/** Routes for pets. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Pet = require("../models/pet");
const User = require("../models/user");
const petAddSchema = require("../schemas/petAdd.json");
const petUpdateSchema = require("../schemas/petUpdate.json");
const { json } = require("body-parser");

const router = express.Router();


/** POST /[id] => { pet }
 *
 * If a photo url is not provided, add a default one.
 * Returns { ownerId, name, type, photo }
 *
 * Authorization required: logged in user
 **/

router.post("/add/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  const username = req.params.username;
  const userId = await User.getUserId(username);
  const data = {...req.body, ownerId: userId}
  try {
    const validator = jsonschema.validate(data, petAddSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const pet = await Pet.add(data); 
    return res.json({ pet });
  } catch (err) {
    return next(err);
  }
});


/** GET /[id] => { pet }
 *
 * Returns { ownerId, name, type, photo }
 *
 * Authorization required: logged in user
 **/

router.get("/id/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const pet = await Pet.getById(req.params.id);
    return res.json({ pet });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => [{ pet1 }, {pet2}, ... ]
 *
 * Returns list of pets in format { ownerId, name, type, photo }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.get("/user/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  const username = req.params.username;
  const userId = await User.getUserId(username);
  try {
    const pets = await Pet.getByUserId(userId);
    return res.json({ pets });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[id/username]  =>  { deleted: id }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await Pet.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id/username] { pet } => { pet }
 *
 * Data can include:
 *   { name, type, photo }
 *
 * Returns { ownerId, name, type, photo }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:id/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, petUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const pet = await Pet.update(req.params.id, req.body);
    return res.json({ pet });
  } catch (err) {
    return next(err);
  }
});



module.exports = router;