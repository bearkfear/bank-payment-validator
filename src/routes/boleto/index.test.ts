import Fastify from "fastify";
import Router from "./index";

test("login", async () => {
    const fastify = Fastify();
    fastify.register(Router);

    const response = await fastify.inject({
        method: "POST",
        url: "/google",
        payload: {
            jwt: "placeholder-jwt"
        }
    });

    expect(JSON.parse(response.body)).toEqual("");
});
