const { spec, request } = require("pactum");

const BASE_URL = "https://reqres.in/api/users/2";

describe("Delete posts endpoint test suite", () => {
  before(() => {
    request.setDefaultTimeout(5000);
  });

  it("delete existing post test", async () => {
    const postId = 1;
    await spec()
      .delete(`${BASE_URL}`)
      .expectStatus(204)
      .expectResponseTime(3000);

    await spec().get(`${BASE_URL}}`).expectStatus(404);
  });

  it("try to delete post using a string instead of id test", async () => {
    const postId = "lorem";
    await spec()
      .delete(`${BASE_URL}/${postId}`)
      .expectStatus(204)
      .expectResponseTime(3000);
  });
});
