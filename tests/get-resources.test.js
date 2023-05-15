const { spec, request } = require("pactum");

const getResourcesSchema = require("../data/response/get-resources-response-schema.json");

describe("Get resources endpoint test suite", () => {
  before(() => {
    request.setDefaultTimeout(5000);
  });

  it("get all resources test", async () => {
    await spec()
      .get("https://reqres.in/api/unknown")
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains("contributions towards server")
      .expectJsonSchema(getResourcesSchema);
  });

  it("get a single resources", async () => {
    await spec()
      .get("https://reqres.in/api/unknown/2")
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains("contributions towards server costs are");
    //.expectJsonSchema(getResourcesSchema);
  });

  it("Get a non-existing resource test", async () => {
    await spec()
      .get("https://reqres.in/api/unknown/23")
      .expectStatus(404)
      .expectResponseTime(3000);
    //.expectJsonSchema(getResourcesSchema);
  });

  after(() => {
    console.log("All tests in the resources test suite have been run!");
  });
});
