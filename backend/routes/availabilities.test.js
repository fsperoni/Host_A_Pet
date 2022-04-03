"use strict";

const request = require("supertest");

const app = require("../app");

const {
  alwaysBeforeAll,
  alwaysBeforeEach,
  alwaysAfterEach,
  alwaysAfterAll,
  u1Token,
  adminToken
} = require("./_testAlways");

beforeAll(alwaysBeforeAll);
beforeEach(alwaysBeforeEach);
afterEach(alwaysAfterEach);
afterAll(alwaysAfterAll);

/************************************** POST /availabilities */

describe("POST /availabilities/:username", function () {
  const newAvailability = {
    startDate: '2022-07-01',
    endDate: '2022-07-31',
    userId: 1,
    roleId: 1,
  };

  test("ok for admin", async function () {
    const resp = await request(app)
    .post("/availabilities/testuser")
    .send(newAvailability)
    .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      availability: {
        startDate: '2022-07-01T06:00:00.000Z',
        endDate: '2022-07-31T06:00:00.000Z',
        userId: 1,
        roleId: 1,
        id: expect.any(Number)
      }
    });
  });

  test("unauth for non-admin", async function () {
    const resp = await request(app)
      .post("/availabilities/testuser")
      .send(newAvailability)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
      .post("/availabilities/testuser")
      .send({
        startDate: '2022-08-01',
        roleId: 1,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .post("/availabilities/testuser")
      .send({
        ...newAvailability,
        startDate: 1234,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /availabilities/:username */

describe("GET /availabilities/:username", function () {
  test("works for one user", async function () {
    const resp = await request(app)
      .get("/availabilities/testuser")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      availabilities:
        [
          {
            id: 1,
            startDate: '2022-04-16T06:00:00.000Z',
            endDate: '2022-04-30T06:00:00.000Z',
            roleId: 1
          },
          {
            id: 2,
            startDate: '2022-05-01T06:00:00.000Z',
            endDate: '2022-05-15T06:00:00.000Z',
            roleId: 1
          },
          {
            id: 3,
            startDate: '2022-05-16T06:00:00.000Z',
            endDate: '2022-05-31T06:00:00.000Z',
            roleId: 2
          },
          {
            id: 4,
            startDate: '2022-06-01T06:00:00.000Z',
            endDate: '2022-06-30T06:00:00.000Z',
            roleId: 2
          }
        ],
    });
  });

  test("works for another user", async function () {
    const resp1 = await request(app)
      .get("/availabilities/testadmin")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp1.body).toEqual({
      availabilities:
        [
          {
            id: 5,
            startDate: '2022-04-16T06:00:00.000Z',
            endDate: '2022-04-30T06:00:00.000Z',
            roleId: 1
          },
          {
            id: 6,
            startDate: '2022-05-01T06:00:00.000Z',
            endDate: '2022-05-15T06:00:00.000Z',
            roleId: 1
          },
          {
            id: 7,
            startDate: '2022-05-16T06:00:00.000Z',
            endDate: '2022-05-31T06:00:00.000Z',
            roleId: 2
          },
          {
            id: 8,
            startDate: '2022-06-01T06:00:00.000Z',
            endDate: '2022-06-30T06:00:00.000Z',
            roleId: 2
          }
        ],
    });
  });
});



/************************************** GET /availabilities/id/:id */

describe("GET /availabilities/id/:id", function () {
  test("works for an availability", async function () {
    const resp = await request(app)
      .get(`/availabilities/id/8`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      availability: {
        id: 8,
        startDate: '2022-06-01T06:00:00.000Z',
        endDate: '2022-06-30T06:00:00.000Z',
        userId: 2,
        roleId: 2
      },
    });
  });

  test("not found for no such availability", async function () {
    const resp = await request(app)
      .get(`/availabilities/id/9`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** POST /availabilities/search/:username */

describe("POST /availabilities/search/:username", function () {
  test("works for a search", async function () {
    const resp = await request(app)
      .post("/availabilities/search/testadmin")
      .send({
        endDate: "2022-05-25",
        roleId: "2",
        startDate: "2022-05-20"
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      availabilities: [{
        id: 8,
        endDate: "2022-05-31T06:00:00.000Z",
        id: 3,
        pets: [
          {
            id: 1,
            name: "Garfield",
            ownerId: 1,
            photo: "http://garfield.img",
            type: "Cat"
          },
          {
            id: 2,
            name: "Snoopy",
            ownerId: 1,
            photo: "http://snoopy.img",
            type: "Dog",
          },
        ],
        role: "Pet Owner",
        roleId: 2,
        userId: 2,
        startDate: "2022-05-16T06:00:00.000Z",
        user: {
          email: "johndoe@gmail.com",
          firstName: "Test",
          id: 1,
          isAdmin: false,
          lastName: "User",
          phone: "555-123-4567",
          postalCode: "T2Y 3X8",
          username: "testuser",
        },
        userId: 1,
      }]
    });
  });

  test("not found for no such availability", async function () {
    const resp = await request(app)
      .post("/availabilities/search/testadmin")
      .send({
        starDate: '2023-06-02',
        endDate: '2023-06-10',
        roleId: 2
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({availabilities:[]});
  });
});

/************************************** DELETE /availabilities/:username/:id */

describe("DELETE /availabilities/:username/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .delete(`/availabilities/testuser/2`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: "2" });
  });

  test("unauth for non-admin", async function () {
    const resp = await request(app)
      .delete(`/availabilities/testuser/1`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .delete(`/availabilities/testuser/3`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such availability", async function () {
    const resp = await request(app)
      .delete(`/availabilities/testuser/11`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});


/************************************** PATCH /availabilities/:username/:id */

describe("PATCH /availabilities/:username/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .patch(`/availabilities/testuser/1`)
      .send({
        startDate: '2022-04-10',
        endDate: '2022-04-20',
        roleId: 1
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      availability: {
        id: 1,
        startDate: '2022-04-10T06:00:00.000Z',
        endDate: '2022-04-20T06:00:00.000Z',
        userId: 1,
        roleId: 1
      },
    });
  });

  test("unauth for non-admin", async function () {
    const resp = await request(app)
      .patch(`/availabilities/testuser/1`)
      .send({
        startDate: '2022-04-10',
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .patch(`/availabilities/testuser/1`)
      .send({
        startDate: '2022-04-10',
      });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such availability", async function () {
    const resp = await request(app)
      .patch(`/availabilities/testuser/10`)
      .send({
        startDate: '2022-04-10',
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on invalid data", async function () {
    const resp = await request(app)
      .patch(`/availabilities/testuser/1`)
      .send({
        roleId: 10,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

