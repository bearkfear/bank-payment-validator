import {FastifyPluginAsync} from "fastify";
import AutoLoad, {AutoloadPluginOptions} from "@fastify/autoload";
import {join} from "path";
import pkg from "../package.json";
export type AppOptions = {
    // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
    // Place here your custom code!
    console.log({version: pkg.version});

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: join(__dirname, "plugins"),
        options: opts
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: join(__dirname, "routes"),
        options: opts
    });
};

export default app;
export {app};
