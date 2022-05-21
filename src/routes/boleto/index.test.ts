import Fastify from "fastify";
import Router from "./index";
import successPaymentResult from "../../fixtures/successPaymentResults.json";

describe("test if the route will return the right responses", () => {
    const fastify = Fastify();
    fastify.register(Router);
    successPaymentResult.forEach(testData => {
        test("should return success and the result must match", async () => {
            const response = await fastify.inject({
                method: "GET",
                url: testData.input
            });

            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.body)).toMatchObject(testData.output);
        });
    });
});
