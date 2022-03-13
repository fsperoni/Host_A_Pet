"use strict";

/** Routes for roles. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const Role = require("../models/role");
const { BadRequestError } = require("../expressError");
const roleSchema = require("../schemas/role.json");
const { json } = require("body-parser");

const router = express.Router();


/** POST /[id] => { role }
 *
 * Returns { id, name }
 *
 * Authorization required: admin user
 **/

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, roleSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const role = await Role.add(req.body); 
    return res.json({ role });
  } catch (err) {
    return next(err);
  }
});


/** GET /[id] => { role }
 *
 * Returns { id, name }
 *
 * Authorization required: logged in user
 **/

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const role = await Role.get(req.params.id);
    return res.json({ role });
  } catch (err) {
    return next(err);
  }
});

/** GET /[role] => [{ role1 }, {role2}, ... ]
 *
 * Returns list of roles in format { id, name }
 *
 * Authorization required: logged in user
 **/

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const roles = await Role.getAll();
    return res.json({ roles });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization required: admin
 **/

router.delete("/:id", ensureAdmin, async function (req, res, next) {
  try {
    await Role.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id] { role } => { role }
 *
 * Data can include:
 *   { name }
 *
 * Returns { id, name }
 *
 * Authorization required: admin
 **/

router.patch("/:id", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, roleSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const role = await Role.update(req.params.id, req.body);
    return res.json({ role });
  } catch (err) {
    return next(err);
  }
});



module.exports = router;