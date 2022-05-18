import {FastifyPluginAsync} from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get(
        "/",
        {
            schema: {
                response: {
                    200: {
                        description: "Rota de healthy",
                        tags: ["Server"],
                        summary: "Retorna algo caso esteja funcionando",
                        type: "object",
                        properties: {
                            root: {type: "boolean"}
                        }
                    }
                }
            }
        },
        async () => ({root: true})
    );
};

export default root;
