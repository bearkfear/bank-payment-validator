import {FastifyPluginAsync} from "fastify";
import {FromSchema} from "json-schema-to-ts";
import {BoletoController} from "../../domain/controller/BoletoController";
const params = {
    type: "object",
    properties: {
        code: {type: "string", minLength: 47}
    },
    required: ["code"]
} as const;

const opts = {
    schema: {
        description: "Valida código de barra",
        params,
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
};

const boletoRouter: FastifyPluginAsync = async fastify => {
    fastify.get<{Params: FromSchema<typeof params>}>("/:code", opts, async (request, reply) => {
        try {
            return new BoletoController(request.params.code).validate();
        } catch (error: any) {
            reply.badRequest((error as Error).message);
        }
    });
};

export default boletoRouter;
