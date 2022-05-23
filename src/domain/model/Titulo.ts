import {Boleto, Fields} from "./Boleto";
import {format} from "date-fns";
import addDays from "date-fns/addDays";

export class Titulo extends Boleto {
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
    findAmountAndExpiration(field5: string, currentDate = new Date()) {
        const expirationFactor = field5.substring(0, 4);
        const amount = parseFloat(field5.substring(4).replace(/(\d{1,})(\d{2}$)/gm, "$1.$2"));

        let baseDate = new Date(1997, 9, 7);

        const factorRestart = new Date(2025, 1, 22);
        if (currentDate.getTime() > factorRestart.getTime()) {
            baseDate = addDays(factorRestart, -1000);
        }

        const expirationDate = addDays(baseDate, Number(expirationFactor));
        const formatedExpirationDate = Number(expirationFactor) === 0 ? "" : format(expirationDate, "yyyy-MM-dd");

        return {
            amount: amount.toFixed(2),
            expirationDate: formatedExpirationDate
        };
    }

    findFields(writableLine: string) {
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

    validate(writableLine: string, imperativeFieldsValid = false) {
        const fields = this.findFields(writableLine);
        const isFieldsWithDvValid = [fields.field1, fields.field2, fields.field3].every(field => {
            const fieldWithoutDv = field.substring(0, field.length - 1);
            const dv = Number(field.substring(field.length - 1));
            return this.modulo10(fieldWithoutDv) === dv;
        });

        if (isFieldsWithDvValid === false && imperativeFieldsValid === false) {
            throw new Error("Digito verificador inválido!");
        }

        const barCode = this.generateCodebar(fields);
        const barCodeWithoutDv = barCode.substring(0, 4) + barCode.substring(5);

        if (Number(fields.k) !== this.modulo11(barCodeWithoutDv)) {
            throw new Error("Digito verificador do código de barras inválido!");
        }
        return {
            ...this.findAmountAndExpiration(fields.field5),
            barCode
        };
    }
}
