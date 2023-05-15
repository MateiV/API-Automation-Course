const { spec, request } = require("pactum");

const BASE_URL = "https://reqres.in/api/login";

describe("Login an user test suite", () => {
  before(() => {
    request.setDefaultTimeout(5000);
    console.log("Starting the execution of the login test suite.");
  });

  it("login an existing verified user test", async () => {
    const requestBody = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };
    await spec()
      .post(`${BASE_URL}`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains("QpwL5tke4Pnpja7X4");
  });

  it("login a non-registered user test", async () => {
    const requestBody = {
      email: "matei.vlad@gmail.com",
      password: "admin12",
    };
    await spec()
      .post(`${BASE_URL}`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(400)
      .expectResponseTime(3000);
  });

  it("login a registered user without password test", async () => {
    const requestBody = {
      email: "eve.holt@reqres.in",
    };
    await spec()
      .post(`${BASE_URL}`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(400)
      .expectResponseTime(3000)
      .expectBodyContains("Missing password");
  });

  it("login without an username or email test", async () => {
    const requestBody = {
      password: "admin12",
    };
    await spec()
      .post(`${BASE_URL}`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(400)
      .expectResponseTime(3000)
      .expectBodyContains("Missing email or username");
  });

  afterEach(() => {
    console.log("Test has been run!");
  });
  after(() => {
    console.log("The post test suite has been run!");
  });
});
