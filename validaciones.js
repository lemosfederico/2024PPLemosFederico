export function validarCampoVacio(campo1, campo2, campo3, campo4, campo5) 
{
    if(campo1 === "" || campo1 === null || campo2 === "" || campo2 === null || 
    campo3 === "" || campo3 === null || campo3 === 0 || campo4 === "" || campo4 === null || 
    campo4 === "0" || campo5 === "" || campo5 === null || campo5 === 0 || campo5 === "0")
    {
        return false;
    }
    return true;
}

export function validarSoloLetras(valorIngresado)
{
    valorIngresado.addEventListener("input", function(event) 
    {
        const valor = event.target.value;
        const soloLetrasRegex = /^[a-zA-Z]*$/;
        if(!soloLetrasRegex.test(valor)) 
        {
            event.target.value = valor.replace(/[^a-zA-Z]/g, "");
        }
    });
}

export function validarSoloNumerosEnteros(valorIngresado) 
{
    valorIngresado.addEventListener("input", function(event) 
    {
        const valor = event.target.value;
        const soloNumerosEnterosRegex = /^\d*$/;
        if(isNaN(valor) || !soloNumerosEnterosRegex.test(valor)) 
        {
            event.target.value = valor.slice(0, -1);
        }
    });
}

export function validarSoloNumeros(valorIngresado)
{
    valorIngresado.addEventListener("input", function(event) 
    {
        const valor = event.target.value;
        const soloNumerosRegex = /^\d*\.?\d*$/;
        if (!soloNumerosRegex.test(valor))
        {
            event.target.value = valor.replace(/[^\d.]/g, "");
        }
        if(valor.split(".").length > 2) 
        {
            event.target.value = valor.replace(/(\..*)\./g, "$1");
        }
        return valor;
    });
}
