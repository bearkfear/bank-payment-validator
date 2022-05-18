export class BoletoController {
    constructor(private barCode = "") {
        console.log({barcode: this.barCode});
    }
}
