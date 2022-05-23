import {Titulo} from "./Titulo";
import successPaymentResults from "../../fixtures/successPaymentTitulo.json";

describe("test if the given inputs to validate would get the right results", () => {
    successPaymentResults.forEach(paymentTest => {
        test(`should ${paymentTest.input} return ${paymentTest.output.barCode}`, async () => {
            const boletoControllerResult = new Titulo().validate(paymentTest.input);
            expect(boletoControllerResult).toEqual(paymentTest.output);
        });
    });

    test("should throw error when some dv not match", async () => {
        try {
            const response = new Titulo().validate("21290001193110001210904475617405975870000002000");
            expect(response).toBeFalsy();
        } catch (error) {
            expect(error.message).toBe("Digito verificador inválido!");
        }
    });

    test("should throw error when some dv from generated barCode not match", async () => {
        try {
            const response = new Titulo().validate("21290001192110001210904475617405275870000002000", true);
            expect(response).toBeFalsy();
        } catch (error) {
            expect(error.message).toBe("Digito verificador do código de barras inválido!");
        }
    });
});

describe("test if the find fields would return object with right positions", () => {
    const testData = [
        {
            input: "21290001192110001210904475617405975870000002000",
            layou: "AAABCCCCCXDDDDDDDDDDYEEEEEEEEEEZKUUUUVVVVVVVVVV",
            output: {
                field1: "2129000119",
                field2: "21100012109",
                field3: "04475617405",
                k: "9",
                field5: "75870000002000"
            }
        },
        {
            input: "00190500954014481606906809350314337370000000100",

            output: {
                field1: "0019050095",
                field2: "40144816069",
                field3: "06809350314",
                k: "3",
                field5: "37370000000100"
            }
        }
    ];

    testData.forEach(data => {
        test(`should ${data.input} return right`, async () => {
            const boletoControllerResult = new Titulo().findFields(data.input);
            expect(boletoControllerResult).toMatchObject(data.output);
        });
    });

    test("should throw error when size is less than 47 chars", async () => {
        try {
            const boletoControllerResult = new Titulo().findFields("123");
        } catch (error) {
            expect(error.message).toBe("Inválido, tamanho incorreto!");
        }
    });
});

describe("test if the expiration date and amount would be captured correctly", () => {
    const testDataBefore2025 = [
        {
            input: "75870000002000",
            output: {
                amount: "20.00",
                expirationDate: "2018-07-16"
            }
        }
    ];

    testDataBefore2025.forEach(data => {
        test(`should ${data.input} return right values before 2025`, async () => {
            const boletoControllerResult = new Titulo().findAmountAndExpiration(data.input, new Date(2022, 4, 22));
            expect(boletoControllerResult).toMatchObject(data.output);
        });
    });

    const testDataAfter2025 = [
        {
            input: "75870000002000",
            output: {
                amount: "20.00",
                expirationDate: "2043-03-07"
            }
        }
    ];

    testDataAfter2025.forEach(data => {
        test(`should ${data.input} return right values after 2025`, async () => {
            const boletoControllerResult = new Titulo().findAmountAndExpiration(data.input, new Date(2025, 4, 22));
            expect(boletoControllerResult).toMatchObject(data.output);
        });
    });

    test("should return empty when no expiration date", async () => {
        const boletoControllerResult = new Titulo().findAmountAndExpiration("00000000002000", new Date(2025, 4, 22));
        expect(boletoControllerResult).toMatchObject({
            amount: "20.00",
            expirationDate: ""
        });
    });
});

describe("test if generation of the codebar will work correcly", () => {
    const testData = [
        {
            input: {
                field1: "2129000119",
                field2: "21100012109",
                field3: "04475617405",
                k: "9",
                field5: "75870000002000"
            },

            output: "21299758700000020000001121100012100447561740"
        }
    ];

    testData.forEach(data => {
        test(`should the fields passed to the generator return ${data.output}`, async () => {
            const boletoControllerResult = new Titulo().generateCodebar(data.input);
            expect(boletoControllerResult).toBe(data.output);
        });
    });
});
