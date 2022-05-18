import {FastifyPluginAsync} from "fastify";

const boletoRouter: FastifyPluginAsync = async fastify => {
    fastify.get(
        "/:code",
        {
            schema: {
                description: "Valida código de barra",
                params: {
                    type: "object",
                    properties: {
                        code: {type: "string", minLength: 47, maxLength: 47}
                    },
                    required: ["code"]
                },
                response: {
                    200: {
                        type: "object",
                        properties: {
                            barCode: {
                                type: "string"
                            },
                            amount: {
                                type: "string"
                            },
                            expirationDate: {
                                type: "string"
                            }
                        },
                        required: ["barCode", "amount", "expirationDate"]
                    }
                }
            }
        },
        async _request => {
            return {
                barCode: 200,
                amount: "",
                expirationDate: ""
            };
        }
    );
};

export default boletoRouter;
