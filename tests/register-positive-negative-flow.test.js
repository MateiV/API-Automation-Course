const { spec, request } = require("pactum");

const BASE_URL = "https://reqres.in/api/register";

describe("Register an user test suite", () => {
  before(() => {
    request.setDefaultTimeout(5000);
    console.log("Starting the execution of the register test suite.");
  });

  it("register a new user test", async () => {
    const requestBody = {
      email: "eve.holt@reqres.in",
      password: "admin12",
    };
    await spec()
      .post(`${BASE_URL}`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains("QpwL5tke4Pnpja7X4");
  });

  it("register a non-verified user test", async () => {
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

  it("register a verified user without password test", async () => {
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

  it("register without an username or email test", async () => {
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
