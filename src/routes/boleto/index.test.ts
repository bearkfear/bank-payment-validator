import Fastify from "fastify";
import Router from "./index";
import successPaymentConvenio from "../../fixtures/successPaymentConvenio.json";
import successPaymentTitulo from "../../fixtures/successPaymentTitulo.json";
import fastifySensible from "@fastify/sensible";

describe("test if the route will return the right responses", () => {
    const fastify = Fastify();
    fastify.register(fastifySensible);
    fastify.register(Router);
    successPaymentConvenio.forEach(testData => {
        test("should return success and the result must match for convenio", async () => {
            const response = await fastify.inject({
                method: "GET",
                url: testData.input
            });

            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.body)).toMatchObject(testData.output);
        });
    });

    successPaymentTitulo.forEach(testData => {
        test("should return success and the result must match for titulo", async () => {
            const response = await fastify.inject({
                method: "GET",
                url: testData.input
            });

            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.body)).toMatchObject(testData.output);
        });
    });

    test("should return 400 when the data is incorrect", async () => {
        const response = await fastify.inject({
            method: "GET",
            url: "212900011921112312109044756174123758700000020000"
        });

        expect(response.statusCode).toBe(400);
    });
});
