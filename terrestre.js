import { Vehiculo } from "./vehiculo.js";

export class Terrestre extends Vehiculo
{
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue)
    {
        super(id, modelo, anoFab, velMax);
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }

    toString() 
    {
        return `Terrestre: ` + super.toString() + `Puertas: ${this.cantPue}` + `Ruedas: ${this.cantRue}`;
    }
}