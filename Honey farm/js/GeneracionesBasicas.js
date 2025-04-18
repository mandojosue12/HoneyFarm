const campo = document.getElementById('campo');

// Generar flores
const flores = ['🌼', '💠', '🌹'];

function generarFlores(cantidad) {
    campo.innerHTML = '';
    const columnas = Math.floor(Math.sqrt(cantidad));
    campo.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    let id = 1;

    for (let i = 0; i < cantidad; i++) {
        const divFlor = CreacionFlor(id)
        campo.appendChild(divFlor);
        id++;
    }
    const texto = `El Campo a Cambiado`
    AgregarNotificacion("azul", texto) 
}
function CreacionFlor(id) {
    let variable;
    for (const key in Campos) {
        const campo = Campos[key];
        if(campo.Activo){
            variable = obtenerFlor(campo)
            break;
        }
    }
    const divFlor = document.createElement('div');
    divFlor.className = 'flores';
    let nivel = variable.nivel;

    divFlor.Datos = {
        id: id,
        polenMax: ((nivel -1) * 10) + 20,
        polen: ((nivel -1) * 10) + 20,
        Humeda: 0,
        TiempoHumeda: null,
        Bonifcacion: BonifcacionFlor,

    }
    divFlor.textContent = variable.color;

    divFlor.onclick = () => Recolector(Ubicacion(divFlor));

    //divFlor.onmouseover = () => recolectarPolenDeFlor(buscarFloresPorHit("A", Ubicacion(divFlor)), 1, Ubicacion(divFlor), "");

    return divFlor;
}

function BonifcacionFlor(Datos) {
    
    let Bonif = 1 + ((Datos.polenMax - 20) / 10) + Datos.Humeda
    return  Bonif
}




















generarFlores(Cantflor ** 2);
ActulizarMochila() 
setInterval(() => {
    ActulizarHUB()
}, 1000);
setInterval(() => {
    generarFlores(Cantflor ** 2)
}, 180000);
window.onload = function () {
    if (campo) {
        campo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};
ActulizarHUB() 