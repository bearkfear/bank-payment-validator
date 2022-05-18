import Fastify from "fastify";
import Cors from "./cors";

test("expect to cors to accept all requests from all domains services", async () => {
    const fastify = Fastify();
    fastify.register(Cors);

    fastify.get("/", (req, reply) => {
        reply.send("ok");
    });

    expect(
        (
            await fastify.inject({
                url: "/",
                method: "GET",
                headers: {origin: "xx.xx.xx"}
            })
        ).headers["access-control-allow-origin"]
    ).toBe("xx.xx.xx");

    expect(
        (
            await fastify.inject({
                url: "/",
                method: "GET",
                headers: {origin: "xx.xx"}
            })
        ).headers["access-control-allow-origin"]
    ).toBe("xx.xx");

    expect(
        (
            await fastify.inject({
                url: "/",
                method: "GET",
                headers: {origin: "example.online"}
            })
        ).headers["access-control-allow-origin"]
    ).toBe("example.online");

    expect(
        (
            await fastify.inject({
                url: "/",
                method: "GET"
            })
        ).headers["access-control-allow-origin"]
    ).toBe(undefined);
});
