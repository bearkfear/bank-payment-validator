import fastifyCors from "@fastify/cors";
import fp from "fastify-plugin";

export default fp(async (fastify, opts) => {
    fastify.register(fastifyCors, {
        origin: true
    });
});
