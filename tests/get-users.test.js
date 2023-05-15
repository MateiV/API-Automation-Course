const { spec, request } = require("pactum");

const getUsersSchema = require("../data/response/get-users-response-schema.json");

describe("Get all users endpoint test suite", () => {
  before(() => {
    request.setDefaultTimeout(5000);
  });

  it("get all users test", async () => {
    await spec()
      .get("https://reqres.in/api/users?page=2")
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains("contributions towards server")
      .expectJsonSchema(getUsersSchema);
  });

  it("get all comments with filter id", async () => {
    await spec()
      .get("https://reqres.in/api/users?id=2")
      .expectStatus(200)
      .expectResponseTime(3000)
      .expectBodyContains("contributions towards server costs are");
  });

  it("Get a non-existing user test", async () => {
    await spec()
      .get("https://reqres.in/api/users/23")
      .expectStatus(404)
      .expectResponseTime(3000);
  });

  it("Get a delayed response from the server", async () => {
    await spec()
      .get("https://reqres.in/api/users?delay=3")
      .expectStatus(200) //should be 400
      .expectResponseTime(2000);
  });

  after(() => {
    console.log("All tests in the suite have been run!");
  });
});
