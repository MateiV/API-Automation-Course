const { spec, request } = require("pactum");

const BASE_URL = "https://reqres.in/api/users/2";

describe("Verify the put and patch endpoints test suite", () => {
  before(() => {
    request.setDefaultTimeout(5000);
  });

  it("create new put test", async () => {
    const requestBody = {
      name: "matei",
      job: "admin",
    };
    await spec()
      .put(`${BASE_URL}`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains("2023-05");
  });

  it("create new patch test", async () => {
    const requestBody = {
      name: "matei2",
      job: "admin2",
    };
    await spec()
      .put(`${BASE_URL}`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains("2023-05");
  });

  afterEach(() => {
    console.log("Test has been run!");
  });
  after(() => {
    console.log("The post test suite has been run!");
  });
});
