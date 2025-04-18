
let multiAmorAbeja = {
    Acumulaciones: { act: 0, max: 100 },
    MultuAbeja: { min: 1, act: 1, max: 10 },
    MultuAPolen: { min: 1, act: 1, max: 1.5 },
    interval: null
}

function AmorAbeja(abeja, ficha) {
    CrearEffecto("EffectoFuego", "💖", Ubicacion(ficha), 12.5, 600);
    ficha.remove()


    let icon = document.getElementById("AmorAbejaID");
    if (multiAmorAbeja.Acumulaciones.act + 1 <= multiAmorAbeja.Acumulaciones.max) { multiAmorAbeja.Acumulaciones.act++ }
    CalculoPorentaje(multiAmorAbeja.Acumulaciones, multiAmorAbeja.MultuAbeja)
    CalculoPorentaje(multiAmorAbeja.Acumulaciones, multiAmorAbeja.MultuAPolen)
    let Variables = [
        { Nombre: "Polen", valor: multiAmorAbeja.MultuAPolen.act, Multi: true },
        { Nombre: "Recolecion de abeja", valor: multiAmorAbeja.MultuAbeja.act, Multi: true }
    ]
    if (icon) {
        let acumulacionesDiv = icon.querySelector(".acumulaciones");
        acumulacionesDiv.innerHTML = "x" + multiAmorAbeja.Acumulaciones.act;

        icon.addEventListener("mouseenter", () => {
            Descrion("💖Amor De Abeja", multiAmorAbeja.Acumulaciones.act, Variables)
        });
    } else {
        icon = Generalcon("💖", multiAmorAbeja.Acumulaciones.act, "AmorAbejaID")
        document.querySelector(".HubHabilidades").appendChild(icon);

        icon.addEventListener("mouseenter", () => {
            Descrion("💖Amor De Abeja", multiAmorAbeja.Acumulaciones.act, Variables)

        });
        icon.addEventListener("mouseleave", () => {
            document.querySelector('.descricon').innerHTML = "";
        });
    }
    if (multiAmorAbeja.interval) { clearTimeout(multiAmorAbeja.interval) }

    let tiempoFaltanteDiv = icon.querySelector(".TiempoFaltante");
    tiempoFaltanteDiv.style.transition = 'none';
    tiempoFaltanteDiv.style.height = `100%`;

    setTimeout(() => {
        tiempoFaltanteDiv.style.transition = `height ${14.95}s linear`
        tiempoFaltanteDiv.style.height = `0%`;
    }, 50);

    multiAmorAbeja.interval = setTimeout(() => {
        multiAmorAbeja.Acumulaciones.act = 0
        multiAmorAbeja.MultuAbeja.act = 1
        multiAmorAbeja.MultuAPolen.act = 1
        multiAmorAbeja.interval = null
        icon.remove()
    }, 15000);
}

function CalculoPorentaje(acumulaciones, Calculado) {
    let porcentaje = (acumulaciones.act / acumulaciones.max) * 100
    Calculado.act = parseFloat((Calculado.min + (porcentaje / 100) * (Calculado.max - Calculado.min)).toFixed(2));
}
let multiMasAzul = {
    Acumulaciones: { act: 0, max: 15 },
    MultuAPolenA: { min: 1, act: 1, max: 5 },
    interval: null
}
function MasAzul(abeja, ficha) {
    CrearEffecto("EffectoFuego", "💠", Ubicacion(ficha), 12.5, 600);
    ficha.remove()


    let icon = document.getElementById("MasAzulID");
    if (multiMasAzul.Acumulaciones.act + 1 <= multiMasAzul.Acumulaciones.max) { multiMasAzul.Acumulaciones.act++ }
    CalculoPorentaje(multiMasAzul.Acumulaciones, multiMasAzul.MultuAPolenA)
    let Variables = [
        { Nombre: "Polen Azul", valor: multiMasAzul.MultuAPolenA.act, Multi: true },
    ]
    if (icon) {
        let acumulacionesDiv = icon.querySelector(".acumulaciones");
        acumulacionesDiv.innerHTML = "x" + multiMasAzul.Acumulaciones.act;

        icon.addEventListener("mouseenter", () => {
            Descrion("💠Mas Azul", multiMasAzul.Acumulaciones.act, Variables)
        });
    } else {
        icon = Generalcon("💠", multiMasAzul.Acumulaciones.act, "MasAzulID")
        document.querySelector(".HubHabilidades").appendChild(icon);

        icon.addEventListener("mouseenter", () => {
            Descrion("💠Mas Azul", multiMasAzul.Acumulaciones.act, Variables)

        });
        icon.addEventListener("mouseleave", () => {
            document.querySelector('.descricon').innerHTML = "";
        });
    }
    if (multiMasAzul.interval) { clearTimeout(multiMasAzul.interval) }

    let tiempoFaltanteDiv = icon.querySelector(".TiempoFaltante");
    tiempoFaltanteDiv.style.transition = 'none';
    tiempoFaltanteDiv.style.height = `100%`;
    tiempoFaltanteDiv.style.background = "#5bb5ff";


    setTimeout(() => {
        tiempoFaltanteDiv.style.transition = `height ${9.95}s linear`
        tiempoFaltanteDiv.style.height = `0%`;
    }, 50);

    multiMasAzul.interval = setTimeout(() => {
        multiMasAzul.Acumulaciones.act = 0
        multiMasAzul.MultuAPolenA.act = 1
        multiMasAzul.interval = null
        icon.remove()
    }, 10000);
}
let multiMasRojo = {
    Acumulaciones: { act: 0, max: 15 },
    MultuAPolenR: { min: 1, act: 1, max: 5 },
    interval: null
}
function MasRojo(abeja, ficha) {
    CrearEffecto("EffectoFuego", "🌹", Ubicacion(ficha), 12.5, 600);

    ficha.remove()

    let icon = document.getElementById("MasRojoID");
    if (multiMasRojo.Acumulaciones.act + 1 <= multiMasRojo.Acumulaciones.max) { multiMasRojo.Acumulaciones.act++ }
    CalculoPorentaje(multiMasRojo.Acumulaciones, multiMasRojo.MultuAPolenR)
    let Variables = [
        { Nombre: "Polen Rojo", valor: multiMasRojo.MultuAPolenR.act , Multi: true},
    ]
    if (icon) {
        let acumulacionesDiv = icon.querySelector(".acumulaciones");
        acumulacionesDiv.innerHTML = "x" + multiMasRojo.Acumulaciones.act;

        icon.addEventListener("mouseenter", () => {
            Descrion("🌹Mas Rojo", multiMasRojo.Acumulaciones.act, Variables)
        });
    } else {
        icon = Generalcon(".🌹", multiMasRojo.Acumulaciones.act, "MasRojoID")
        document.querySelector(".HubHabilidades").appendChild(icon);

        icon.addEventListener("mouseenter", () => {
            Descrion("🌹Mas Rojo", multiMasRojo.Acumulaciones.act, Variables)

        });
        icon.addEventListener("mouseleave", () => {
            document.querySelector('.descricon').innerHTML = "";
        });
    }
    if (multiMasRojo.interval) { clearTimeout(multiMasRojo.interval) }

    let tiempoFaltanteDiv = icon.querySelector(".TiempoFaltante");
    tiempoFaltanteDiv.style.transition = 'none';
    tiempoFaltanteDiv.style.height = `100%`;
    tiempoFaltanteDiv.style.background = "#ff7272";


    setTimeout(() => {
        tiempoFaltanteDiv.style.transition = `height ${9.95}s linear`
        tiempoFaltanteDiv.style.height = `0%`;
    }, 50);

    multiMasRojo.interval = setTimeout(() => {
        multiMasRojo.Acumulaciones.act = 0
        multiMasRojo.MultuAPolenR.act = 1
        multiMasRojo.interval = null
        icon.remove()
    }, 10000);
}



///Explicones
let multiExplociones = {
    Acumulaciones: { act: 0, max: 10 },
    MultuExplociones: { min: 1, act: 1, max: 5 },
    interval: null
}
function Explociones() {
    let icon = document.getElementById("ExplocionesID");
    if (multiExplociones.Acumulaciones.act + 1 <= multiExplociones.Acumulaciones.max) { multiExplociones.Acumulaciones.act++ }
    CalculoPorentaje(multiExplociones.Acumulaciones, multiExplociones.MultuExplociones)
    let Variables = [
        { Nombre: "Polen por explocion", valor: multiExplociones.MultuExplociones.act, Multi: true },
    ]
    if (icon) {
        let acumulacionesDiv = icon.querySelector(".acumulaciones");
        acumulacionesDiv.innerHTML = "x" + multiExplociones.Acumulaciones.act;

        icon.addEventListener("mouseenter", () => {
            Descrion("💥Explociones", multiExplociones.Acumulaciones.act, Variables)
        });
    } else {
        icon = Generalcon("💥", multiExplociones.Acumulaciones.act, "ExplocionesID")
        document.querySelector(".HubHabilidades").appendChild(icon);

        icon.addEventListener("mouseenter", () => {
            Descrion("💥Explociones", multiExplociones.Acumulaciones.act, Variables)

        });
        icon.addEventListener("mouseleave", () => {
            document.querySelector('.descricon').innerHTML = "";
        });
    }
    if (multiExplociones.interval) { clearTimeout(multiExplociones.interval) }

    let tiempoFaltanteDiv = icon.querySelector(".TiempoFaltante");
    tiempoFaltanteDiv.style.transition = 'none';
    tiempoFaltanteDiv.style.height = `100%`;
    tiempoFaltanteDiv.style.background = "black";


    setTimeout(() => {
        tiempoFaltanteDiv.style.transition = `height ${2.95}s linear`
        tiempoFaltanteDiv.style.height = `0%`;
    }, 50);

    multiExplociones.interval = setTimeout(() => {
        multiExplociones.Acumulaciones.act = 0
        multiExplociones.MultuExplociones.act = 1
        multiExplociones.interval = null
        icon.remove()
    }, 3000);
}
function GloboExplosivo(abeja, ficha) {
    const lugar = Ubicacion(ficha);
    ficha.remove();
    Explociones()

    const Globo = document.createElement('div');
    Globo.innerHTML = `<div class="GloboEffecto">🎈</div>`
    Globo.misDatos = {
        Explotar: ExplotoGlobo,
        lugar: lugar,
        abeja: abeja,
        yaExplotado: false
    };

    Globo.className = "Globo";
    Globo.style.left = `${lugar.x - 27}px`;
    Globo.style.top = `${lugar.y - 27}px`;
    mundo.appendChild(Globo);

    setTimeout(() => {
        ExplotoGlobo(abeja, lugar, Globo, false);
        Globo.remove();
    }, 2000); 
}

function ExplotoGlobo(abeja, lugar, globo, var1, acumulacion = 0) {
    if (!globo || globo.misDatos.yaExplotado) return;
    globo.misDatos.yaExplotado = true; // Marca este globo como explotado
    const bonificacionA = (0.25 + 0.20 * abeja.nivel) * EstExplocion();
    const Globos = document.querySelectorAll('.Globo');

    Globos.forEach(element => {
        if (element.misDatos && !element.misDatos.yaExplotado) {
            const distancia = calcularDistancia(lugar, element.misDatos.lugar);

            if (distancia < 100) { // Usa RADIO_EXPLOSION si lo defines
                element.innerHTML = `<div class="GloboEffecto2">🎈</div>`
                setTimeout(() => {
                    element.misDatos.Explotar(element.misDatos.abeja, element.misDatos.lugar, element, true, acumulacion + 1);
                }, 150);

            }
        }
    });
    let bonificacionP = 0;
    if (acumulacion > 2) acumulacion--;
    if (var1) {
        globo.remove();
        bonificacionP = (0.5 + 0.25 * acumulacion) * EstExplocion();
    }
    const Patrón = "CCBCC\\nCBBBC\\nBBABB\\nCBBBC\\nCCBCC";
    const Resulatado = buscarFloresPorHit(Patrón, lugar);
    recolectarPolenDeFlor(Resulatado, 2, lugar, `PolenA: +${bonificacionA}, Polen: +${bonificacionP}`);
}
function Pertado(abeja, ficha) {
    const lugar = Ubicacion(ficha);
    ficha.remove();
    Explociones()
    const Pertado = document.createElement('div');
    Pertado.innerHTML = `<div class="Pertadoffecto">🧨</div>`
    let Resulatado = buscarFloresPorHit("A", lugar);
    
    let CriticoExtra = 0;
    let BoniPolen = 1;
    const bonificacionR= (0.25 + 0.20 * abeja.nivel) * EstExplocion();


    const interval = setInterval(() => {
        const dato = recolectarPolenDeFlor(Resulatado, 7, lugar, `Polen: *${BoniPolen}, PolenR: +${bonificacionR}, Critico: +${CriticoExtra}`);

        if(dato.PpolenB > 1 || dato.PpolenR > 1 || dato.PpolenA > 1){
            if(BoniPolen === 1){
                BoniPolen = 2
            }else{
                BoniPolen += 2
            }
        }else{
            CriticoExtra += 0.3;
        }
    }, 333);


    Pertado.className = "Pertado";
    Pertado.style.left = `${lugar.x - 12.5}px`;
    Pertado.style.top = `${lugar.y - 12.5}px`;
    mundo.appendChild(Pertado);

    setTimeout(() => {
        Pertado.remove();
        clearInterval(interval);
    }, 999); // Usa TIEMPO_EXPLOSION si lo defines
}
function Foto(abeja, ficha) {
    const lugar = Ubicacion(ficha);
    ficha.remove();
    Explociones()
    const Foto = document.createElement('div');
    Foto.innerHTML = `<div class="Foto">📷</div>`
    let Resulatado = buscarFloresPorHit("BBB\\nBAB\\nBBB", lugar);
    let var1 = 0
    let Resta = 0
    Resulatado.forEach(element => {
        var1 += parseInt(element.dataset.nivel)
        Resta++
    });
    var1 -= Resta

    let BoniPolen = 1 + (var1 * 0.1);
    const bonificacionB= (0.25 + 0.20 * abeja.nivel) * EstExplocion();
    recolectarPolenDeFlor(Resulatado, 3, lugar, `Polen: *${BoniPolen}, PolenB: +${bonificacionB}`);


    Foto.className = "Pertado";
    Foto.style.left = `${lugar.x - 12.5}px`;
    Foto.style.top = `${lugar.y - 12.5}px`;
    mundo.appendChild(Foto);

    setTimeout(() => {
        Foto.remove();
    }, 999); // Usa TIEMPO_EXPLOSION si lo defines
}
