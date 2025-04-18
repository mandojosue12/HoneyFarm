let boolRecolectar = true;
let tiempoRecarga = 500;  // Tiempo de recarga en milisegundos

// Referencias a los elementos de la barra de recarga
const barraRecarga = document.getElementById('barraRecarga');
const porcentajeRecarga = document.getElementById('porcentajeRecarga');

function Recolector(coordenadas) {
    if (!boolRecolectar) {
        return;
    }
    boolRecolectar = false;
    let Datos = null;
    for (const key in RecolectoresUsuarios) {
        const herramienta = RecolectoresUsuarios[key];
        if (herramienta.Comprado && herramienta.Equipado){
            Datos = herramienta.ESTA;
            
        }
    }
    activarRecarga(Datos.Time);
    CrearEffecto("EffectoFuego", "❗", mausPosition, 12.5, 600);
    let Resulatado = buscarFloresPorHit(Datos.Hit, coordenadas);
    recolectarPolenDeFlor(Resulatado, Datos.Re, coordenadas, "");

    setTimeout(() => {
        boolRecolectar = true;
    }, Datos.Time * 1000);
}

// Función para activar la barra de recarga
function activarRecarga(tiempo) {


    porcentajeRecarga.style.transition = `none`;
    porcentajeRecarga.style.height = "0%"; 
    porcentajeRecarga.style.opacity = "1";


    setTimeout(() => {

        porcentajeRecarga.style.transition = `height ${tiempo - 0.05}s linear`;
        porcentajeRecarga.style.height = "100%";
        setTimeout(() => {
            porcentajeRecarga.style.opacity = "0";
        }, tiempo * 950);
    }, 50);

}
document.addEventListener('mousemove', (event) => {
    barraRecarga.style.left = `${event.pageX - 40}px`;  // Centrado del círculo
    barraRecarga.style.top = `${event.pageY - 20}px`;
});
