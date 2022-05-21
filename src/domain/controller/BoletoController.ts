import {format} from "date-fns";
import addDays from "date-fns/addDays";

export type Fields = {
    field1: string;
    field2: string;
    field3: string;
    k: string;
    field5: string;
};
export class BoletoController {
    constructor(public writableLine = "") {
        console.log({barcode: this.writableLine});
    }

    findAmountAndExpiration(field5 = "", currentDate = new Date()) {
        const expirationFactor = field5.substring(0, 4);
        const amount = parseFloat(field5.substring(4).replace(/(\d{1,})(\d{2}$)/gm, "$1.$2"));

        let baseDate = new Date(1997, 9, 7);

        const factorRestart = new Date(2025, 1, 22);
        if (
            currentDate.getFullYear() >= factorRestart.getFullYear() &&
            currentDate.getMonth() >= factorRestart.getMonth() &&
            currentDate.getDay() >= factorRestart.getDay()
        ) {
            baseDate = addDays(factorRestart, -1000);
        }

        const expirationDate = addDays(baseDate, Number(expirationFactor));
        const formatedExpirationDate = format(expirationDate, "yyyy-MM-dd");

        return {
            amount: amount.toFixed(2),
            expirationDate: formatedExpirationDate
        };
    }

    findFields(writableLine = "") {
        console.log(writableLine.length);
        if (writableLine.length !== 47) {
            throw new Error("Inválido, tamanho incorreto!");
        }

        const field1 = writableLine.substring(0, 10);
        const field2 = writableLine.substring(10, 21);
        const field3 = writableLine.substring(21, 32);
        const k = writableLine.substring(32, 33);
        const field5 = writableLine.substring(33);

        return {
            field1,
            field2,
            field3,
            k,
            field5
        };
    }
    modulo10(field: string) {
        const fieldWithoutDv = field.substring(0, field.length - 1);
        const reducedValues = fieldWithoutDv
            .split("")
            .reverse()
            .map((n, index) => {
                const multipliedValue = Number(n) * (index % 2 === 0 ? 2 : 1);
                let resultValue = multipliedValue;
                while (resultValue > 9) {
                    resultValue = String(resultValue)
                        .split("")
                        .reduce((acc, curr) => acc + Number(curr), 0);
                }
                return resultValue;
            })
            .reduce((acc, curr) => acc + curr, 0);

        const divisionRest = reducedValues % 10;
        const nextDozens = Math.ceil(divisionRest / 10.0) * 10;
        const dv = nextDozens - divisionRest;

        if (dv === 10) {
            return 0;
        }
        return dv;
    }

    modulo11(codeBar: string) {
        const barCodeWithoutDv = codeBar.substring(0, 4) + codeBar.substring(5);
        const [sumResult] = barCodeWithoutDv
            .split("")
            .reverse()
            .reduce(
                (acc, curr) => {
                    let [sum, mult] = acc;
                    sum += Number(curr) * mult;
                    mult++;
                    if (mult > 9) {
                        mult = 2;
                    }
                    return [sum, mult];
                },
                [0, 2]
            );

        const result = 11 - (sumResult % 11);

        if ([0, 10, 11].includes(result)) {
            return 1;
        }

        return result;
    }

    generateCodebar(fields: Fields): string {
        const structure = [
            fields.field1.substring(0, 3), // codigo do banco
            fields.field1.substring(3, 4), // codigo da moeda
            fields.k, // DV do código de barras
            fields.field5.substring(0, 4), // fator de vencimento
            fields.field5.substring(4), // valor
            fields.field1.substring(4, 9), // campo livre
            fields.field2.substring(0, fields.field2.length - 1), // campo livre
            fields.field3.substring(0, fields.field3.length - 1) // campo livre
        ];

        return structure.join("");
    }

    validate() {
        const writableLine = this.writableLine.replace(/\D/g, "");
        const fields = this.findFields(writableLine);
        const isFieldsWithDvValid = [fields.field1, fields.field2, fields.field3].every(
            field => this.modulo10(field) === Number(field.substring(field.length - 1))
        );

        if (isFieldsWithDvValid === false) {
            throw new Error("Digito verificador inválido!");
        }

        const barCode = this.generateCodebar(fields);
        if (Number(fields.k) !== this.modulo11(barCode)) {
            throw new Error("Digito verificador do código de barras inválido!");
        }
        return {
            ...this.findAmountAndExpiration(fields.field5),
            barCode
        };
    }
}
