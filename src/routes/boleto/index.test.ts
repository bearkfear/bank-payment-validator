import Fastify from "fastify";
import Router from "./index";
import successPaymentConvenio from "../../fixtures/successPaymentConvenio.json";
import successPaymentTitulo from "../../fixtures/successPaymentTitulo.json";

describe("test if the route will return the right responses", () => {
    const fastify = Fastify();
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
});
