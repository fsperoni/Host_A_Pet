"use strict";

const db = require("../db.js");
const { createToken } = require("../helpers/tokens");

async function alwaysBeforeAll() {
  // await db.connect();
}

async function alwaysBeforeEach() {
  await db.query("BEGIN");
}

async function alwaysAfterEach() {
  await db.query("ROLLBACK");
}

async function alwaysAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
  alwaysBeforeAll,
  alwaysBeforeEach,
  alwaysAfterEach,
  alwaysAfterAll,
  u1Token,
  u2Token,
  adminToken,
};
