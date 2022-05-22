export type Fields = {
    field1: string;
    field2: string;
    field3: string;
    k: string;
    field5: string;
};
export abstract class Boleto {
    modulo10(fieldWithoutDv: string) {
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

    modulo11(barCodeWithoutDv: string) {
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
}
