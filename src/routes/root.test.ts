import Fastify from "fastify";
import Root from "./root";

test("root", async () => {
    const fastify = Fastify();

    fastify.register(Root);
    const response = await fastify.inject({method: "GET", url: "/"});

    expect(response.body).toBe(JSON.stringify({root: true}));
    expect(response.statusCode).toBe(200);
});
