import Fastify from "fastify";
import Support from "./support";

test("support works standalone", async () => {
    const fastify = Fastify();
    fastify.register(Support);
    await fastify.ready();

    expect(fastify.someSupport()).toBe("hugs");
});
