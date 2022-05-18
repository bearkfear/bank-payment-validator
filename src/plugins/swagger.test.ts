import Fastify from "fastify";
import Swagger from "./swagger";

test("expect to swagger plugin return a endpoint and json", async () => {
    const fastify = Fastify();
    fastify.register(Swagger);

    const responseDocs = await fastify.inject({
        url: "/docs/static/index.html",
        method: "GET"
    });

    const responseJson = await fastify.inject({
        url: "/docs/json",
        method: "GET"
    });

    expect(responseDocs.statusCode).toBe(200);
    expect(responseJson.statusCode).toBe(200);
});
