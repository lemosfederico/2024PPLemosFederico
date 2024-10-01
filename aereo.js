import { Vehiculo } from "./vehiculo.js";

export class Aereo extends Vehiculo
{
    constructor(id, modelo, anoFab, velMax, altMax, autonomia)
    {
        super(id, modelo, anoFab, velMax);
        this.altMax = altMax;
        this.autonomia = autonomia;
    }

    toString()
    {
        return  `Aereo: ` + super.toString() + `AlturaMax: ${this.altMax}` + `Autonomia: ${this.$autonomia}`;
    }

}