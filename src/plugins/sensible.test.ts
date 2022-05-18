import Fastify from "fastify";
import Sensible from "./sensible";

test("Sensible not throw error", async () => {
    const fastify = Fastify();
    fastify.register(Sensible);
    await fastify.ready();
});
