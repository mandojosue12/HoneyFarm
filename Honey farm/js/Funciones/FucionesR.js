function Ubicacion(Obejto) {
    if (Obejto) {
        const ObejtoRect = Obejto.getBoundingClientRect(); // Obtener el rectángulo de la flor
        const mundoRect = mundo.getBoundingClientRect(); // Obtener el rectángulo del mundo
        const x = Math.floor(ObejtoRect.left - mundoRect.left + ObejtoRect.width / 2);

        // Coordenada Y centrada
        const y = Math.floor(ObejtoRect.top - mundoRect.top + ObejtoRect.height / 2);

        return { x: x, y: y }
    }
}

function calcularDistancia(pos1, pos2) {
    return Math.sqrt(
        Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
    );
}
function PonerCordenadas(div, coordenadas, extraX, extraY, ancho, alto) {
    const offsetX = ancho / 2;          // Mitad del ancho
    const offsetY = alto / 2;         // Mitad del alto
    div.style.left = `${coordenadas.x + extraX - offsetX}px`; // Centrar horizontalmente
    div.style.top = `${coordenadas.y + extraY - offsetY}px`;  // Centrar verticalmente

}
function ActualizarFlor(flor) {

    if (flor) {
        const polen = parseInt(flor.Datos.polen) || 0; // Obtiene el polen actual de la flor
        const polenMaximo = parseInt(flor.Datos.polenMax); // Calcula el polen máximo en función del nivel

        const fontSize = (polen / polenMaximo) * 40; // Calcula el fontSize en base al polen y polen máximo

        flor.style.fontSize = `${fontSize}px`; // Asigna el fontSize a la flor
    }
}
function CrecerFlor() {
    const flores = document.querySelectorAll('.flores');


    for (let flor of flores) {

        const polenActual = parseFloat(flor.Datos.polen) || 0; // Convierte el polen a número
        const polenMaximo = parseInt(flor.Datos.polenMax);


        if (polenActual < polenMaximo) {
            // Incrementa el polen y actualiza en el dataset
            const incremento = flor.Datos.Humeda > 0 ? 0.6 : 0.2
            flor.Datos.polen = Math.min(polenActual + (incremento * polenMaximo), polenMaximo).toFixed(2);
            ActualizarFlor(flor);// Llama a la función para actualizar el tamaño'
        }

    }
}
function buscarFloresPorHit(pattern, center, tamañoCelda = 50) {
    const resultado = []; // Aquí se guardarán las coordenadas de las flores
    const Flores = []; // Aquí se guardarán las coordenadas de las flores
    const filas = pattern.trim().split("\\n");

    filas.forEach((fila, rowIndex) => {
        [...fila].forEach((celda, colIndex) => {
            if (celda === "A" || celda === "B") {
                // Calcular posición relativa
                const offsetX = (colIndex - Math.floor(fila.length / 2)) * tamañoCelda;
                const offsetY = (rowIndex - Math.floor(filas.length / 2)) * tamañoCelda;

                // Calcular coordenadas absolutas
                const coordX = center.x + offsetX;
                const coordY = center.y + offsetY;

                // Agregar a los resultados
                resultado.push({ tipo: celda, x: coordX, y: coordY });
            }
        });
    });
    const flores = document.querySelectorAll('.flores');

    resultado.forEach(FloresCor => {
        

        flores.forEach((flor) => {
            const distancia = calcularDistancia(FloresCor, Ubicacion(flor));

            if (distancia < 30) {
                Flores.push(flor);
            }
        });
    });

    return Flores; // Devuelve un arreglo con las coordenadas
}

// Patrón de ejemplo
// "CBC\\nBAB\\nCBC";
//A CENTER Y FLOR
//B FLOR
//C NADA
//n entre
setInterval(CrecerFlor, 6000);
const ColmenaClik = document.querySelector(".colmena");
ColmenaClik.addEventListener("click", () => {
    if (!ModoCovirtiendo || EspacioActual === 0) { return }

    let total = 1;
    Colmena.forEach(element => {
        total += element.abeja.FCovercion()

    });
    total = Math.round(total * 0.01);
    if(total > EspacioActual){total = EspacioActual}
    let Polen = JSON.parse(JSON.stringify(PolenV));
    Polen.Miel += total
    Polen.coordenadas = Ubicacion(ColmenaClik)
    GenerarTextoDeFlotante(Polen)
    AumentarMiel(total)

    EspacioActual -= total;
    ActulizarHUB()
});