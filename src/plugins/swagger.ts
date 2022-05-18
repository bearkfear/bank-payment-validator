import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";

export default fp(async (fastify, opts) => {
    fastify.register(fastifySwagger, {
        routePrefix: "/docs",
        swagger: {
            info: {
                title: String(require("../../package.json").name),
                description: String(require("../../package.json").description),
                version: String(require("../../package.json").version)
            },
            consumes: ["application/json"],
            produces: ["application/json"]
        },
        uiConfig: {},
        staticCSP: true,
        transformStaticCSP: (header: any) => header,
        exposeRoute: true
    });
});
