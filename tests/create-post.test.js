const { spec, request } = require("pactum");

const BASE_URL = "https://reqres.in/api/users";

describe("Create posts endpoint test suite", () => {
  before(() => {
    request.setDefaultTimeout(5000);
    console.log("Starting the execution of the POST test suite.");
  });

  it("create new post test", async () => {
    const requestBody = {
      name: "matei",
      job: "admin",
    };
    await spec()
      .post(`${BASE_URL}`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(201)
      .expectResponseTime(3000)
      .expectBodyContains("admin");
  });

  afterEach(() => {
    console.log("Test has been run!");
  });
  after(() => {
    console.log("The post test suite has been run!");
  });
});
