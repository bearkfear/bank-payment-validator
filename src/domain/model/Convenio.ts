import {Boleto} from "./Boleto";
export class Convenio extends Boleto {
    generateBarCode(linhaDigitavel: string) {
        const splitedFields = linhaDigitavel.match(/\d{12}/g);

        if (Array.isArray(splitedFields) && splitedFields.length === 4) {
            return splitedFields.map(field => field.substring(0, field.length - 1)).join("");
        }
        throw new Error("Linha digitável inválida");
    }
    findAmountAndExpiration(barCode: string) {
        const amount = parseFloat(barCode.substring(5, 15).replace(/(\d{1,})(\d{2}$)/gm, "$1.$2"));
        return {
            amount: amount.toFixed(2),
            expirationDate: ""
        };
    }

    validateVerificationDigitBarCode(barCode: string) {
        const DV = Number(barCode[3]);
        const moneyCode = Number(barCode[2]);

        const barCodeWithoutDV = barCode.substring(0, 3) + barCode.substring(4);

        if (this.findModuleToUse(moneyCode) === "MODULE_10") {
            // calculate with modulo 10
            return this.modulo10(barCodeWithoutDV) === DV;
        }
        // calculate with modulo 11
        return this.modulo11(barCodeWithoutDV) === DV;
    }

    findModuleToUse(moneyCod: number): "MODULE_10" | "MODULE_11" {
        if (moneyCod < 5 || moneyCod > 9) {
            throw new Error("Código de moeda inválido");
        }
        if ([6, 7].includes(moneyCod)) {
            return "MODULE_10";
        }
        return "MODULE_11";
    }

    validate(writableLine: string, imperativeIgnoreValidateBarCode = false) {
        if (Number(writableLine[0]) !== 8) {
            throw new Error("Código inválido, não possui identificação de arrecadação");
        }
        const barCode = this.generateBarCode(writableLine);
        const isBarCodeValid = this.validateVerificationDigitBarCode(barCode);

        if (isBarCodeValid === false && imperativeIgnoreValidateBarCode === false) {
            throw new Error("Código de barras não bate com DV");
        }

        const amountAndExpiration = this.findAmountAndExpiration(barCode);

        const findedFields = writableLine.match(/\d{12}/) || [];

        const moneyCode = Number(barCode[2]);
        const moduleToUse = this.findModuleToUse(moneyCode);

        const fieldsWithDv = findedFields.map(field => ({
            field: field.substring(0, field.length - 1),
            fieldDv: field[field.length - 1]
        }));

        const isFieldsValid = fieldsWithDv.every(item => {
            if (moduleToUse === "MODULE_10") {
                return this.modulo10(item.field) === Number(item.fieldDv);
            }
            return this.modulo11(item.field) === Number(item.fieldDv);
        });

        if (!isFieldsValid) {
            throw new Error("Código inválido, validação dos modulos não bate com os DVs");
        }

        return {barCode, ...amountAndExpiration};
    }
}
