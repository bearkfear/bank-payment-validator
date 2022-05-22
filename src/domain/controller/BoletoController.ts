import {Convenio} from "../model/Convenio";
import {Titulo} from "../model/Titulo";
export class BoletoController {
    constructor(public writableLine = "") {}
    validate() {
        const writableLine = this.writableLine.replace(/\D/g, "");

        if (writableLine.length > 47) {
            return new Convenio().validate(writableLine);
        }

        return new Titulo().validate(writableLine);
    }
}
