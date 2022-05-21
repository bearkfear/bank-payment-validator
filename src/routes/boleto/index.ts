import {FastifyPluginAsync} from "fastify";
import {FromSchema} from "json-schema-to-ts";
import {BoletoController} from "../../domain/controller/BoletoController";
import _ from "lodash";
const params = {
    type: "object",
    properties: {
        code: {type: "string", maxLength: 47}
    },
    required: ["code"]
} as const;

const opts = {
    schema: {
        description: "Valida código de barra",
        params
        // response: {
        //     200: {
        //         type: "object",
        //         properties: {
        //             barCode: {
        //                 type: "string"
        //             },
        //             amount: {
        //                 type: "string"
        //             },
        //             expirationDate: {
        //                 type: "string"
        //             }
        //         },
        //         required: ["barCode", "amount", "expirationDate"]
        //     }
        // }
    }
};

const boletoRouter: FastifyPluginAsync = async fastify => {
    fastify.get<{Params: FromSchema<typeof params>}>("/:code", opts, async request => {
        // return new BoletoController(request.params.code).validate();
        const boletoController = new BoletoController(request.params.code);

        return boletoController.validate();
    });
};

export default boletoRouter;
