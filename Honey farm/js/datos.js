let Diario = "Abrevaciones\nTLM=tiempo llenar la mochila\nMT=El tamaño de mochi;a\nM= miel de jugador\nCL=cantida de abejas que tiene el jugador\nTLT:Tiempo actual lleva juagdno el jugador\n\n";
let Tiempodellenado = Date.now();
let TiempoJugado = Date.now();
let UltimoTiempoJugado = 0;
let cantidadCargadas = 0;

function CargarDiario() {
    cantidadCargadas++;

    // Calcular el tiempo jugado
    const tiempoActual = Date.now();
    const tiempoJugadoSegundos = Math.floor((tiempoActual - TiempoJugado) / 1000);

    // Calcular el tiempo para llenar la mochila
    const tiempoLlenadoSegundos = Math.floor((tiempoActual - Tiempodellenado) / 1000);
    Tiempodellenado = tiempoActual; // Actualizar para la próxima carga
    const Espacio = EspacioMaximo();

    // Actualizar el diario

    Diario += `${cantidadCargadas}. TLM:${tiempoLlenadoSegundos}s, MT:${Espacio}, M:${Miel}, CL:${Colmena.length},TLT: ${tiempoJugadoSegundos}S \n`;



    console.log(Diario);
}
let lleno = false;
setInterval(() => {
    if(EspacioActual >= EspacioMaximo() && !lleno){
        CargarDiario()
        lleno = true;
        const texto = `Tu mochila esta llena`
        AgregarNotificacion("rojo", texto)
    }
    if(EspacioActual === 0){
        lleno = false;
    }
}, 100);