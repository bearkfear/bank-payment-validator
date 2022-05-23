import {Convenio} from "./Convenio";

const convenio = new Convenio();

describe("test if convenio will return the right values", () => {
    test("should thrown error when generateBarCode is wrong", () => {
        try {
            const response = convenio.generateBarCode("8362000000210974008631288519277010100235497623");

            expect(response).toBeFalsy();
        } catch (error) {
            expect(error.message).toBe("Linha digitável inválida");
        }
    });

    test("should findModuletoUser thrown error", () => {
        try {
            const response = convenio.findModuleToUse(4);

            expect(response).toBeFalsy();
        } catch (error) {
            expect(error.message).toBe("Código de moeda inválido");
        }
    });

    test("should findModuletoUser return module10", () => {
        const response = convenio.findModuleToUse(6);

        expect(response).toBe("MODULE_10");
    });
    test("should findModuletoUser return module11", () => {
        const response = convenio.findModuleToUse(9);

        expect(response).toBe("MODULE_11");
    });

    test("should validateVerificationDigitBarCode use modulo11 to calculate", () => {
        expect(convenio.validateVerificationDigitBarCode("1299")).toBeFalsy();
    });
});

describe("should validate return errors", () => {
    test("will return error when dv is not right", () => {
        try {
            const response = convenio.validate("836300000021097400863128835019277010100235497623");
            expect(response).toBeFalsy();
        } catch (error) {
            expect(error.message).toBe("Código de barras não bate com DV");
        }
    });

    test("will return error when dvs not matchs with fields", () => {
        try {
            const response = convenio.validate("836200000012097400863128835019277010100235497623", true);
            expect(response).toBeFalsy();
        } catch (error) {
            expect(error.message).toBe("Código inválido, validação dos modulos não bate com os DVs");
        }
    });
});

describe("should validate and use modules", () => {
    test("test if will use module10", () => {
        const testData = {
            input: "836200000021097400863128835019277010100235497623",
            output: {
                barCode: "83620000002097400863128350192770110023549762",
                amount: "209.74",
                expirationDate: ""
            }
        };
        const response = convenio.validate(testData.input);
        expect(response).toMatchObject(testData.output);
    });

    test("test if will use module11", () => {
        try {
            const response = convenio.validate("839200000021097400863128835019277010100235497623", true);
            expect(response).toBeFalsy();
        } catch (error) {
            expect(error.message).toBe("Código inválido, validação dos modulos não bate com os DVs");
        }
    });
});
