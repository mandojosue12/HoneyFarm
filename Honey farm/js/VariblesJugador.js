function EspacioMaximo(){
    return Math.round(MochilaEsta.Espacio * (1 + (multiLagrima.MasEspacio.act))) ;
} 

let EspacioActual = 0;
let Miel = 0;

let ModoCovirtiendo = false;
let ModoCovirtiendo2 = false;
let secionA = false;


let HistorialPolen = []; 
let HistorialMiel = []; 
const IntervaloPromedio = 5000;

function limpiarHistorial(Historial) {
    const TiempoLimite = Date.now() - IntervaloPromedio;
    // Filtra y modifica el arreglo original con los datos recientes
    for (let i = Historial.length - 1; i >= 0; i--) {
        if (Historial[i].tiempo < TiempoLimite) {
            Historial.splice(i, 1);
        }
    }
}

function obtenerPromedioPorSegundo(Historial) {
    limpiarHistorial(Historial);
    const SumaTotal = Historial.reduce((total, registro) => total + registro.cantidadTotal, 0); // Usa cantidadTotal
    const segundos = IntervaloPromedio / 1000; 

    return SumaTotal / segundos; // Promedio por segundo
}



function AumentarMiel(cantidad) {
    const cantidadTotal = cantidad; // Corregido el nombre
    HistorialMiel.push({ cantidadTotal, tiempo: Date.now() }); // Usar la propiedad correcta
    Miel += cantidadTotal;
}




const SecionDiv = document.querySelector('.Secion');
SecionDiv.style.display === "none"
SecionDiv.style.visibility = "hidden";
const body = document.body;