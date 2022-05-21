import {BoletoController} from "./BoletoController";
import successPaymentResults from "../../fixtures/successPaymentResults.json";

describe("test if the given inputs to validate would get the right results", () => {
    successPaymentResults.forEach(paymentTest => {
        test(`should ${paymentTest.input} return ${paymentTest.output.barCode}`, async () => {
            const boletoControllerResult = new BoletoController(paymentTest.input).validate();
            expect(boletoControllerResult).toEqual(paymentTest.output);
        });
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
            const boletoControllerResult = new BoletoController(data.input).findFields(data.input);
            expect(boletoControllerResult).toMatchObject(data.output);
        });
    });
});

describe("test if the expiration date and amount would be captured correctly", () => {
    const testData = [
        {
            input: "75870000002000",
            output: {
                amount: "20.00",
                expirationDate: "2018-07-16"
            }
        }
    ];

    testData.forEach(data => {
        test(`should ${data.input} return right values`, async () => {
            const boletoControllerResult = new BoletoController(data.input).findAmountAndExpiration(data.input);
            expect(boletoControllerResult).toMatchObject(data.output);
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
            const boletoControllerResult = new BoletoController("").generateCodebar(data.input);
            expect(boletoControllerResult).toBe(data.output);
        });
    });
});
