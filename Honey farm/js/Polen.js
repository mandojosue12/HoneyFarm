const PolenV = {
    polenR: 0,
    polenB: 0,
    polenA: 0,

    ExtraCritico: 0,
    ExtraPowerCritico: 0,
    PpolenR: 1,
    PpolenB: 1,
    PpolenA: 1,

    PolenMultiplicador: [],
    PolenBonificacion: [],

    PolenAzulMultiplicador: [],
    PolenAzulBonificacion: [],

    PolenRojoMultiplicador: [],
    PolenRojoBonificacion: [],

    PolenBlancoMultiplicador: [],
    PolenBlancoBonificacion: [],

    Miel: 0,


    coordenadas: { x: 0, y: 0 }
}
//Recolectar el Polen de la flor
function recolectarPolenDeFlor(flores, recoleccion, Cordenadas, Bonificaciones) {
    if (EspacioActual < EspacioMaximo() && !ModoCovirtiendo) {

        if (flores) {
            let Polen = JSON.parse(JSON.stringify(PolenV));
            Bonificaciones = BuscarAnplicadores(Cordenadas, Bonificaciones)
            SacarBonificaciones(Polen, Bonificaciones)
            flores.forEach(flor => {
                let polenDisponible = parseInt(flor.Datos.polen);
                let recoleccionFinal = polenDisponible >= recoleccion ? recoleccion : polenDisponible;

                // Actualizar el polen de la flor
                flor.Datos.polen -= recoleccionFinal;
                GenearaFichaFlor(recoleccionFinal, flor)
                let nivelFlor = flor.Datos.Bonifcacion(flor.Datos);
                Polen = SumarColeres(Polen, flor, recoleccionFinal * nivelFlor);
                ActualizarFlor(flor);
            });
            Polen = Critico(Polen)
            Polen = Totalsuma(Polen)
            Polen.coordenadas.x = Cordenadas.x
            Polen.coordenadas.y = Cordenadas.y

            ganarPolen(Polen);
            GenerarTextoDeFlotante(Polen)
            return Polen;
        }
    }
}
function Critico(Polen) {
    if(Math.random() * 1 < EstProCrit() + Polen.ExtraCritico){Polen.PpolenA = EstPoderCrit() + Polen.ExtraPowerCritico}
    if(Math.random() * 1 < EstProCrit() + Polen.ExtraCritico){Polen.PpolenB = EstPoderCrit() + Polen.ExtraPowerCritico}
    if(Math.random() * 1 < EstProCrit() + Polen.ExtraCritico){Polen.PpolenR = EstPoderCrit() + Polen.ExtraPowerCritico}
    return Polen
}
//Distribuir el polen dependiendo el color
function SumarColeres(Polen, flor, cantidad) {

    const color = flor.innerHTML
    if (color === "🌼") {
        Polen.polenB += cantidad
    } else if (color === "💠") {
        Polen.polenA += cantidad
    } else {
        Polen.polenR += cantidad
    }
    return Polen;
}
function Totalsuma(Polen) {
    const producto = Polen.PolenMultiplicador.reduce((acc, num) => acc * num, 1);
    const suma = Polen.PolenBonificacion.reduce((acc, num) => acc + num, 1);
    const PolenTotal = parseFloat(((producto * EstPolen()) * suma).toFixed(2));

    const productoAzul = Polen.PolenAzulMultiplicador.reduce((acc, num) => acc * num, 1);
    const sumaAzul = Polen.PolenAzulBonificacion.reduce((acc, num) => acc + num, 1);
    const PolenAzulTotal = parseFloat(((productoAzul * EstPolenAzul() * Polen.PpolenA) * sumaAzul).toFixed(2));

    const productoRojo = Polen.PolenRojoMultiplicador.reduce((acc, num) => acc * num, 1);
    const sumaRojo = Polen.PolenRojoBonificacion.reduce((acc, num) => acc + num, 1);
    const PolenRojoTotal = parseFloat(((productoRojo * EstPolenRojo() * Polen.PpolenR) * sumaRojo).toFixed(2));

    const productoBlanco = Polen.PolenBlancoMultiplicador.reduce((acc, num) => acc * num, 1);
    const sumaBlanco = Polen.PolenBlancoBonificacion.reduce((acc, num) => acc + num, 1);
    const PolenBlancoTotal = parseFloat(((productoBlanco * EstPolenBlanco() * Polen.PpolenB) * sumaBlanco).toFixed(2));

    Polen.polenB = Math.round(Polen.polenB * PolenTotal * PolenBlancoTotal)
    Polen.polenA = Math.round(Polen.polenA * PolenTotal * PolenAzulTotal)
    Polen.polenR = Math.round(Polen.polenR * PolenTotal * PolenRojoTotal)
    return Polen;

}
//Enviar Polen A la Mochila
function ganarPolen(Polen) {
    const cantidadTotal = Polen.polenB + Polen.polenA + Polen.polenR; // Calcula la cantidad total de polen
    extraerPolen(Polen)
    HistorialPolen.push({ cantidadTotal, tiempo: Date.now() }); // Guarda la cantidad total y el tiempo en el historial
    EspacioActual = Math.min(EspacioActual + cantidadTotal, EspacioMaximo());
    ActulizarHUB(); // Actualiza el HUB con los datos actuales
}

function GenerarTextoDeFlotante(Polen) {
    // Crear el contenedor principal
    const ctextoFlotante = document.createElement('div');
    ctextoFlotante.className = "Zonatex";
    ctextoFlotante.style.position = 'absolute';

    PonerCordenadas(ctextoFlotante, Polen.coordenadas, 0, -40, 300, 0);

    // Crear un array para almacenar los datos de los divs
    const textosFlotantes = [];

    // Agregar datos al array si la cantidad es mayor a 0
    if (Polen.polenR > 0) {
        textosFlotantes.push({ valor: Polen.polenR, color: "#f03a17", critico: Polen.PpolenR });
    }
    if (Polen.polenA > 0) {
        textosFlotantes.push({ valor: Polen.polenA, color: "#00bcf2", critico: Polen.PpolenA });
    }
    if (Polen.polenB > 0) {
        textosFlotantes.push({ valor: Polen.polenB, color: "white" , critico: Polen.PpolenB});
    }
    if (Polen.Miel > 0) {
        textosFlotantes.push({ valor: Polen.Miel, color: "yellow", critico: 1 });
    }

    // Ordenar los datos de mayor a menor según el valor
    textosFlotantes.sort((a, b) => b.valor - a.valor);

    // Crear los divs y agregarlos al contenedor
    textosFlotantes.forEach(({ valor, color, critico }) => {
        const textoFlotante = textoCofin(valor, color, critico);
        ctextoFlotante.appendChild(textoFlotante);
    });

    // Verificar si al menos un div fue creado y añadir al DOM solo si contiene elementos
    if (ctextoFlotante.children.length > 0) {
        document.body.appendChild(ctextoFlotante);
        // Remover el contenedor después de 2 segundos
        setTimeout(() => {
            ctextoFlotante.remove();
        }, 2000);
    }
}


function textoCofin(cantida, color, critico = 1) {
    const textoFlotante = document.createElement('div');
    if(critico > 1){
        textoFlotante.className = "textoFlotanteCritico";

    }else{
        textoFlotante.className = "textoFlotante";
    }

    textoFlotante.textContent = "+" + ForNu(cantida);
    textoFlotante.style.color = color;


    const numDigitos = cantida.toString().length;
    textoFlotante.style.fontSize = `${10 + (numDigitos * 3)}px`;

    return textoFlotante;
}
function SacarBonificaciones(Polen, bonificaciones) {
    if (bonificaciones === "") { return }
    const segmentos = bonificaciones.split(",");
    
    const resultados = segmentos.map(segmento => {
        const match = segmento.match(/(\w+):\s*([*+\-\/])\s*(\d+(\.\d+)?)/);
        if (match) {
            return {
                Variable: match[1],  // Ejemplo: "Polen"
                Tipo: match[2],      // Ejemplo: "+"
                Cantidad: parseFloat(match[3]) // Ejemplo: 0.5 o 0.4
            };
        }
        return null; // En caso de que no haya coincidencias válidas
    });
    
    const filtrado = resultados.filter(item => item !== null);    
    const mapeo = {
        Polen: { '*': Polen.PolenMultiplicador, 'default': Polen.PolenBonificacion },
        PolenA: { '*': Polen.PolenAzulMultiplicador, 'default': Polen.PolenAzulBonificacion },
        PolenR: { '*': Polen.PolenRojoMultiplicador, 'default': Polen.PolenRojoBonificacion },
        PolenB: { '*': Polen.PolenBlancoMultiplicador, 'default': Polen.PolenBlancoBonificacion },
        Critico: { '*': 'ExtraCritico', 'default': 'ExtraCritico' }, // Asignación directa
        PowerCritico: { '*': 'ExtraPowerCritico', 'default': 'ExtraPowerCritico' } // Asignación directa
    };

    filtrado.forEach(({ Variable, Tipo, Cantidad }) => {
        if (mapeo[Variable]) {
            const destino = mapeo[Variable][Tipo] || mapeo[Variable]['default'];

            // Si destino es una propiedad de Polen, asignar directamente
            if (typeof destino === 'string') {
                Polen[destino] += Cantidad; // Asignar suma a la propiedad
            } else {
                destino.push(Cantidad); // En caso de listas
            }
        }
    });

}

function BuscarAnplicadores(Cordenadas, Bonificaciones) {
    let valor = 1
    Amplicadores.forEach(element => {
        if(calcularDistancia(element.Ubicacion, Cordenadas) <= element.area - 50){
            valor += element.bonificacion
        }
    });
    return Bonificaciones += `, *Polen: *${valor}`
}