import Fastify from "fastify";
import Root from "./root";

test("root", async () => {
    const fastify = Fastify();

    fastify.register(Root);
    const response = await fastify.inject({method: "GET", url: "/"});

    expect(JSON.parse(response.body)).toMatchObject({root: true});
    expect(response.statusCode).toBe(200);
});
