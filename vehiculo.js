export class Vehiculo
{
    constructor(id, modelo, anoFab, velMax)
    {
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }

    toString()
    {
        return `id: ${this.id}, modelo: ${this.modelo}, anoFab: ${this.anoFab}, velMax: ${this.velMax},`;
    }
}
