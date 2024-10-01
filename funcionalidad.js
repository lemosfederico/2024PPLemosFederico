import { Aereo } from "./aereo.js";
import { Terrestre } from "./terrestre.js";
import { data } from "./data.js";
import * as validaciones from "./validaciones.js";

//*************************************** 1ER FORM ***************************************

let dataVehiculos = data;

function llenarTabla(vehiculos = dataVehiculos) 
{
    const tbody = document.getElementById("tablaVehiculos").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    vehiculos.forEach(vehiculo => {
        const fila = tbody.insertRow();
        fila.insertCell().textContent = vehiculo.id;
        fila.insertCell().textContent = vehiculo.modelo;
        fila.insertCell().textContent = vehiculo.anoFab;
        fila.insertCell().textContent = vehiculo.velMax;

        if("altMax" in vehiculo)
        {
            fila.insertCell().textContent = vehiculo.altMax;
            fila.insertCell().textContent = vehiculo.autonomia;
            fila.insertCell().textContent = "-";
            fila.insertCell().textContent = "-";
        } 
        else if("cantPue" in vehiculo) 
        {
            fila.insertCell().textContent = "-";
            fila.insertCell().textContent = "-";
            fila.insertCell().textContent = vehiculo.cantPue;
            fila.insertCell().textContent = vehiculo.cantRue;
        }
    });

    tbody.querySelectorAll("tr").forEach(row => {
        row.addEventListener("dblclick", function() 
        {
            const vehiculoId = parseInt(row.cells[0].textContent);
            const vehiculo = dataVehiculos.find(car => car.id === vehiculoId);

            document.getElementById("id").value = vehiculo.id;
            document.getElementById("tipo").value = vehiculo.autonomia !== undefined ? "aereo" : "terrestre";
            document.getElementById("modelo").value = vehiculo.modelo;
            document.getElementById("anoFab").value = vehiculo.anoFab;
            document.getElementById("velMax").value = vehiculo.velMax;
            document.getElementById("altMax").value = vehiculo.altMax || "";
            document.getElementById("autonomia").value = vehiculo.autonomia || "";
            document.getElementById("cantPue").value = vehiculo.cantPue || "";
            document.getElementById("cantRue").value = vehiculo.cantRue || "";

            
            toggleFormVisibility(true, false);
            btnAlta.classList.replace("visible", "hidden");
        });
    });
    toggleColumnVisibility();
}

function toggleColumnVisibility() 
{
    const columnas = ["id", "modelo", "anoFab", "velMax", "altMax", "autonomia", "cantPue", "cantRue"];
    columnas.forEach((col, index) => {
        const checkbox = document.getElementById(`col-${col}`);
        const th = document.getElementById(`th-${col}`);
        const isVisible = checkbox.checked;

        th.style.display = isVisible ? "" : "none";
        document.querySelectorAll(`td:nth-child(${index + 1})`).forEach(td => {
            td.style.display = isVisible ? "" : "none";
        });
    });
}

//*************************************** FILTROS ***************************************

function filtrarVehiculos() 
{
    const filtro = document.getElementById("filtro").value;
    let vehiculosFiltrados;

    if(filtro === "1") 
    {
        vehiculosFiltrados = dataVehiculos.filter(vehiculo => "altMax" in vehiculo);
    } 
    else if(filtro === "2") 
    {
        vehiculosFiltrados = dataVehiculos.filter(vehiculo => "cantPue" in vehiculo);
    } 
    else 
    {
        vehiculosFiltrados = dataVehiculos;
    }
    llenarTabla(vehiculosFiltrados);
}

function obtenerVehiculosFiltrados(filtro) 
{
    let vehiculosFiltrados = [];
    if(filtro === "1") 
    {
        vehiculosFiltrados = dataVehiculos.filter(vehiculo => "altMax" in vehiculo);
    } 
    else if(filtro === "2") 
    { 
        vehiculosFiltrados = dataVehiculos.filter(vehiculo => "cantPue" in vehiculo);
    } 
    else 
    {
        vehiculosFiltrados = dataVehiculos;
    }
    return vehiculosFiltrados;
}

//*************************************** CALCULAR PROMEDIO ***************************************


function calcularVelocidadMaximaPromedio() 
{
    const filtro = document.getElementById("filtro").value;
    const vehiculosFiltrados = obtenerVehiculosFiltrados(filtro);
    
    if(vehiculosFiltrados.length > 0)
    {
        const velocidadesValidas = vehiculosFiltrados.map(car => parseInt(car.velMax)).filter(velMax => !isNaN(velMax));

        if (velocidadesValidas.length > 0)
        {
            const sumaVelocidades = velocidadesValidas.reduce((total, velMax) => total + velMax, 0);
            const promedioVelMax= (sumaVelocidades / velocidadesValidas.length).toFixed(2);
            document.getElementById("velocidadMaxima").value = promedioVelMax;
        } 
        else 
        {
            document.getElementById("velocidadMaxima").value = "No hay datos";
        }
    } 
    else 
    {
        document.getElementById("velocidadMaxima").value = "No hay datos";
    }
}


//*************************************** MANEJAR VISIBILIDAD DE FORM Y BOTONES ***************************************

function toggleFormVisibility(mostrarAbm, mostrarDatos) 
{
    const formABM = document.getElementById("Form_ABM");
    const formDatos  = document.getElementById("Form_datos");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnCancelar = document.getElementById("btnCancelar");
    const btnAlta = document.getElementById("btnAlta");
    const btnModificar = document.getElementById("btnModificar");
    const btnEliminar = document.getElementById("btnEliminar");

    if(mostrarAbm) 
    {
        formABM.classList.replace("hidden", "visible");
        btnCancelar.classList.replace("hidden", "visible"); 
        btnAgregar.classList.replace("visible", "hidden");
        btnAlta.classList.replace("hidden", "visible");
        btnModificar.classList.replace("hidden", "visible");
        btnEliminar.classList.replace("hidden", "visible");
    } 
    else 
    {
        formABM.classList.replace("visible", "hidden");
        btnCancelar.classList.replace("visible", "hidden");
        btnAgregar.classList.replace("hidden", "visible");
        btnAlta.classList.replace("visible", "hidden");
        btnModificar.classList.replace("visible", "hidden");
        btnEliminar.classList.replace("visible", "hidden");
    }

    if(mostrarDatos)
    {
        formDatos.classList.replace("hidden", "visible");
        llenarTabla(dataVehiculos);
    } 
    else 
    {
        formDatos.classList.replace("visible", "hidden");
    }
}


document.getElementById("btnAgregar").addEventListener("click", function() {
    toggleFormVisibility(true, false);
    blanquearInputs();
    btnModificar.classList.replace("visible", "hidden");
    btnEliminar.classList.replace("visible", "hidden");

});
    
document.addEventListener("DOMContentLoaded", () => {
    llenarTabla();
    document.getElementById("filtro").addEventListener("change", (event) => {filtrarVehiculos(event);
        const promedioVelMax = document.getElementById("velocidadMaxima");
        promedioVelMax.value = "";})
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener("change", toggleColumnVisibility);  
    });
    const btnCalcular = document.getElementById("btnCalcular");
    btnCalcular.addEventListener("click", function(event) {
        event.preventDefault();
        calcularVelocidadMaximaPromedio();
    });
});

//*************************************** ORDENAR LA TABLA SEGUN ENCABEZADO ***************************************

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("th").forEach(th => {
        th.addEventListener("click", () => {
            const columna = th.id.replace("th-", "");
            ordenarTabla(columna);
        });
    });
});

function ordenarTabla(columna) 
{
    const filtro = document.getElementById("filtro").value;

    let vehiculosFiltrados = obtenerVehiculosFiltrados(filtro);
    vehiculosFiltrados.sort((a, b) => {
        if(tipo === "number")  
        {
            return a[columna] - b[columna];
        } 
        else 
        {
            return a[columna].localeCompare(b[columna]);
        }
    });
    llenarTabla(vehiculosFiltrados);
}

//*************************************** 2DO FORM ***************************************

controlarDatosIngresados();

document.getElementById("btnCancelar").addEventListener("click", function(event) {
    event.preventDefault();
    llenarTabla(dataVehiculos);
    toggleFormVisibility(false, true);
});


document.addEventListener("DOMContentLoaded", function() {
    const tipo = document.getElementById("tipo");
    const altMax = document.getElementById("altMax");
    const autonomia = document.getElementById("autonomia");
    const cantPue = document.getElementById("cantPue");
    const cantRue = document.getElementById("cantRue");

    tipo.addEventListener("change", function() 
    {
        if(tipo.value === "aereo") 
        {
            cantPue.disabled = true;
            cantRue.disabled = true;
            altMax.disabled = false;
            autonomia.disabled = false;
        } 
        else if(tipo.value === "terrestre") 
        {
            altMax.disabled = true;
            autonomia.disabled = true;
            cantPue.disabled = false;
            cantRue.disabled = false;
        }
    });
    function limpiarCampo(campo) 
    {
        if(campo.value) 
        {
            campo.value = "";
        }
    }
    tipo.dispatchEvent(new Event("change"));
});

//*************************************** ALTA ***************************************

document.getElementById("btnAlta").addEventListener("click", function(event) 
{
    event.preventDefault();
    const tipo = document.getElementById("tipo").value;
    const modelo = document.getElementById("modelo").value;
    const anoFab = document.getElementById("anoFab").value;
    const velMax = document.getElementById("velMax").value;
    const altMax = document.getElementById("altMax").value;
    const autonomia = document.getElementById("autonomia").value;
    const cantPue = document.getElementById("cantPue").value;
    const cantRue = document.getElementById("cantRue").value;
    const idUnico = generarIdUnico();

    if(tipo === "aereo") 
    {
        
        if(!validaciones.validarCampoVacio(modelo, anoFab, velMax, altMax, autonomia))
        {
            alert("No pueden quedar campos vacíos");
            return ;
        }
        else if(anoFab <= 1885)
        {
            alert("El año de fabricacion debe ser mayor a 1885");
            return ;
        }
        const nuevoAereo = new Aereo(idUnico, modelo, anoFab, velMax, altMax, autonomia);
        dataVehiculos.push(nuevoAereo);
        alert("Vehiculo aereo agregado correctamente");
    } 
    else if(tipo === "terrestre") 
    {
        if(!validaciones.validarCampoVacio(modelo, anoFab, velMax, cantPue, cantRue))
        {
            alert("No pueden quedar campos vacíos");
            return ;
        }
        else if(anoFab <= 1885)
        {
            alert("El año de fabricacion debe ser mayor a 1885");
            return ;
        }
        const nuevoTerrestre = new Terrestre(idUnico, modelo, anoFab, velMax, cantPue, cantRue);
        dataVehiculos.push(nuevoTerrestre);
        alert("Vehiculo terrestre agregado correctamente");
    }
    calcularVelocidadMaximaPromedio();
    llenarTabla();
    toggleColumnVisibility();
    toggleFormVisibility(false, true);
});

//*************************************** MODIFICAR ***************************************

document.getElementById("btnModificar").addEventListener("click", function(event) {
    event.preventDefault(); 

    const id = parseInt(document.getElementById("id").value);
    const tipo = document.getElementById("tipo").value;
    const modelo = document.getElementById("modelo").value;
    const anoFab = document.getElementById("anoFab").value;
    const velMax = document.getElementById("velMax").value;
    const altMax = document.getElementById("altMax").value;
    const autonomia = document.getElementById("autonomia").value;
    const cantPue = document.getElementById("cantPue").value;
    const cantRue = document.getElementById("cantRue").value;

    const index = dataVehiculos.findIndex(car => car.id === id);
    if(index !== -1)    
    {
        if(tipo === "aereo") 
        {
            if(!validaciones.validarCampoVacio(modelo, anoFab, velMax, altMax, autonomia))
            {
                alert(`No pueden quedar campos vacíos`);
                return ;
            }
            else if(anoFab <= 1885)
            {
                alert("El año de fab debe ser mayor a 1885");
                return ;
            }
            dataVehiculos[index] = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
        } 
        else if(tipo === "terrestre") 
        {
            if(!validaciones.validarCampoVacio(modelo, anoFab, velMax, cantPue, cantRue))
            {
                alert(`No pueden quedar campos vacíos`);
                return ;
            }
            else if(anoFab <= 1885)
            {
                alert("El año de fab debe ser mayor a 1885");
                return ;
            }
            
            dataVehiculos[index] = new Terrestre(id, modelo, anoFab, velMax, cantPue, cantRue);
        }
        alert("Vehiculo modificado correctamente");
        llenarTabla();
        toggleFormVisibility(false, true);
    }
    else 
    {
        alert("El Vehiculo con el ID especificado no existe.");
    }
});

//*************************************** BAJA ***************************************

document.getElementById("btnEliminar").addEventListener("click", function(event) {
    event.preventDefault(); 
    const id = parseInt(document.getElementById("id").value);
    const newDataVehiculos = dataVehiculos.filter(car => car.id !== id);
    if(newDataVehiculos.length < dataVehiculos.length) 
    {
        dataVehiculos = newDataVehiculos;
        alert("Vehiculo eliminado correctamente");
        llenarTabla();
        toggleFormVisibility(false, true);
    } 
    else 
    {
        alert("El Vehiculo con el ID especificado no existe.");
    }
});


function generarIdUnico() 
{
    const idsExistentes = dataVehiculos.map(item => item.id);
    const maxId = Math.max(...idsExistentes, 0);
    return maxId + 10;
}

function controlarDatosIngresados()
{
    const modelo = document.getElementById("modelo");
    const anoFab = document.getElementById("anoFab");
    const velMax = document.getElementById("velMax");
    const altMax = document.getElementById("altMax");
    const autonomia = document.getElementById("autonomia");
    const cantPue = document.getElementById("cantPue");
    const cantRue = document.getElementById("cantRue");

    validaciones.validarSoloLetras(modelo);
    validaciones.validarSoloNumerosEnteros(anoFab);
    validaciones.validarSoloNumerosEnteros(velMax);
    validaciones.validarSoloNumeros(altMax);
    validaciones.validarSoloNumeros(autonomia);
    validaciones.validarSoloNumerosEnteros(cantPue);
    validaciones.validarSoloNumerosEnteros(cantRue);  
}

function blanquearInputs()
{
    const id = document.getElementById("id");
    const modelo = document.getElementById("modelo");
    const anoFab = document.getElementById("anoFab");
    const velMax = document.getElementById("velMax");
    const altMax = document.getElementById("altMax");
    const autonomia = document.getElementById("autonomia");
    const cantPue = document.getElementById("cantPue");
    const cantRue = document.getElementById("cantRue");

    id.value = "";
    modelo.value = "";
    anoFab.value = "";
    velMax.value = "";
    altMax.value = "";
    autonomia.value = "";
    cantPue.value = "";
    cantRue.value = "";
}
