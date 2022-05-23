import {Boleto} from "./Boleto";

test("should return 0 when using modulo10 and dv === 10", () => {
    expect(new Boleto().modulo10("129381923819283", 10)).toBe(0);
});
