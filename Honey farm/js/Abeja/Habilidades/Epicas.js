//Lagrima
let multiLagrima = {
    Acumulaciones: { act: 0, max: Infinity },
    MasEspacio: { min: 0, act: 0, max: Infinity },
    MasConvercionAzul: { min: 0, act: 0, max: Infinity },
    interval: null
}
function LagrimaBuff(abeja, ficha) {
    CrearEffecto("EffectoFuego", "💧", Ubicacion(ficha), 12.5, 600);
    ficha.remove()


    let icon = document.getElementById("Lagrima");
    multiLagrima.Acumulaciones.act++
    multiLagrima.MasEspacio.act = (multiLagrima.Acumulaciones.act ** 0.8) / 100
    multiLagrima.MasConvercionAzul.act = ((multiLagrima.Acumulaciones.act / 2) ** 0.8) / 100
    console.log(multiLagrima.MasConvercionAzul.act)

    let Variables = [
        { Nombre: "Espacio", valor: multiLagrima.MasEspacio.act, Multi: false },
        { Nombre: "AzulConvercion", valor: multiLagrima.MasConvercionAzul.act, Multi: false }
    ]
    if (icon) {
        let acumulacionesDiv = icon.querySelector(".acumulaciones");
        acumulacionesDiv.innerHTML = "x" + multiLagrima.Acumulaciones.act;

        icon.addEventListener("mouseenter", () => { Descrion("💧Lagrima", multiLagrima.Acumulaciones.act, Variables) });

    } else {
        icon = Generalcon(".💧", multiLagrima.Acumulaciones.act, "Lagrima")
        document.querySelector(".HubHabilidades").appendChild(icon);

        icon.addEventListener("mouseenter", () => { Descrion("💧Lagrima", multiLagrima.Acumulaciones.act, Variables) });
        icon.addEventListener("mouseleave", () => { document.querySelector('.descricon').innerHTML = "" });
    }
    if (multiLagrima.interval) { clearTimeout(multiLagrima.interval) }

    let tiempoFaltanteDiv = icon.querySelector(".TiempoFaltante");
    tiempoFaltanteDiv.style.transition = 'none';
    tiempoFaltanteDiv.style.height = `100%`;
    tiempoFaltanteDiv.style.background = "#5bb5ff";


    setTimeout(() => {
        tiempoFaltanteDiv.style.transition = `height ${59.95}s linear`
        tiempoFaltanteDiv.style.height = `0%`;
    }, 50);

    multiLagrima.interval = setTimeout(() => {
        multiLagrima.Acumulaciones.act = 0
        multiLagrima.MasEspacio.act = multiLagrima.MasEspacio.min
        multiLagrima.interval = null
        icon.remove()
    }, 60000);
    ActulizarHUB()
}
//Chapunchon
function Chapunchon(abeja, ficha) {
    CrearEffecto("EffectoFuego", "🧺", Ubicacion(ficha), 12.5, 600);
    const lugar = Ubicacion(ficha)
    ficha.remove()
    const Patrón = "BBB\\nBAB\\nBBB";
    const Resulatado = buscarFloresPorHit(Patrón, lugar);
    Resulatado.forEach(element => {
        Humedo(element, 0.30 + (0.3 * abeja.nivel))
    });
}
//MultiMasCritico

let MultiMasCritico = {
    Acumulaciones: { act: 0, max: 10 },
    MasCritico: { min: 0, act: 0, max: 0.3 },
    interval: null
}
function MasCritico(abeja, ficha) {
    ficha.remove()
    let icon = document.getElementById("MasCritico");
    if (MultiMasCritico.Acumulaciones.act + 1 <= MultiMasCritico.Acumulaciones.max) { MultiMasCritico.Acumulaciones.act++ }
    CalculoPorentaje(MultiMasCritico.Acumulaciones, MultiMasCritico.MasCritico)
    let Variables = [
        { Nombre: "Posibilidad Critico", valor: MultiMasCritico.MasCritico.act, Multi: false },
    ]
    if (icon) {
        let acumulacionesDiv = icon.querySelector(".acumulaciones");
        acumulacionesDiv.innerHTML = "x" + MultiMasCritico.Acumulaciones.act;

        icon.addEventListener("mouseenter", () => {
            Descrion("💢MasCritico", MultiMasCritico.Acumulaciones.act, Variables)
        });
    } else {
        icon = Generalcon("💢", MultiMasCritico.Acumulaciones.act, "MasCritico")
        document.querySelector(".HubHabilidades").appendChild(icon);

        icon.addEventListener("mouseenter", () => {
            Descrion("💢MasCritico", MultiMasCritico.Acumulaciones.act, Variables)

        });
        icon.addEventListener("mouseleave", () => {
            document.querySelector('.descricon').innerHTML = "";
        });
    }
    if (MultiMasCritico.interval) { clearTimeout(MultiMasCritico.interval) }

    let tiempoFaltanteDiv = icon.querySelector(".TiempoFaltante");
    tiempoFaltanteDiv.style.transition = 'none';
    tiempoFaltanteDiv.style.height = `100%`;
    tiempoFaltanteDiv.style.background = "brown";


    setTimeout(() => {
        tiempoFaltanteDiv.style.transition = `height ${14.95}s linear`
        tiempoFaltanteDiv.style.height = `0%`;
    }, 50);

    MultiMasCritico.interval = setTimeout(() => {
        MultiMasCritico.Acumulaciones.act = 0
        MultiMasCritico.MasCritico.act = 0
        MultiMasCritico.interval = null
        icon.remove()
    }, 14000);
}

let FuegosActivos = [];

function Fuego(abeja, ficha) {
    const lugar = Ubicacion(ficha);
    ficha.remove();

    const Patron = "cBc\nBAB\ncBc";
    const Resultado = buscarFloresPorHit(Patron, lugar);

    const datos = {
        CriticoExtra: 0,
        PowerCritico: 0,
        id: FuegosActivos.length
    };
    const bonificacionR = 0.5 + 0.25 * abeja.nivel;

    const dato = recolectarPolenDeFlor(Resultado, 2, lugar,
        `PowerCritico: +${datos.PowerCritico}, PolenR: +${bonificacionR}, Critico: +${datos.CriticoExtra}`
    );

    FuegosActivos.push({ datos, lugar });

    const actualizarDatos = (element, dato) => {
        if (calcularDistancia(element.lugar, lugar) <= 60) {
            if (dato.PpolenB > 1 || dato.PpolenR > 1 || dato.PpolenA > 1) {
                element.datos.PowerCritico += datos.id !== datos.id ? 0.1 : 0.2;
            } else {
                element.datos.CriticoExtra += datos.id !== datos.id ? 0.05 : 0.1;
            }
        }
    };

    FuegosActivos.forEach(element => actualizarDatos(element, dato));

    CrearEffecto("EffectoFuego", "🔥", lugar, 12.5, 600);

    const varinterval = setInterval(() => {
        CrearEffecto("EffectoFuego", "🔥", lugar, 12.5, 600);

        const dato = recolectarPolenDeFlor(Resultado, 2, lugar,
            `PowerCritico: +${datos.PowerCritico}, PolenR: +${bonificacionR}, Critico: +${datos.CriticoExtra}`
        );

        FuegosActivos.forEach(element => actualizarDatos(element, dato));
    }, 500);

    setTimeout(() => {
        clearInterval(varinterval);
        FuegosActivos = FuegosActivos.filter(fuego => fuego.datos.id !== datos.id);
    }, 2000);
}

function CrearEffecto(clase, Icon, lugar, diferencia, duracion) {
    const divEffectoFuego = CrearDiv(clase)
    divEffectoFuego.textContent = Icon
    mundo.appendChild(divEffectoFuego);
    divEffectoFuego.style.top = `${lugar.y - diferencia}px`
    divEffectoFuego.style.left = `${lugar.x - diferencia}px`
    setTimeout(() => { divEffectoFuego.remove() }, duracion);

}

function Convertidor(abeja, ficha) {
    ficha.remove()
    const flores = document.querySelectorAll('.flores');
    const flor = flores[Math.floor(Math.random() * flores.length)];
    const lugar = Ubicacion(flor);
    const tiempo = 4 + (0.2 * Math.floor(abeja.nivel / 2))
    const Area = 150 + (5 * abeja.nivel);
    const Conver2 = 0.09 + (0.01 * Math.floor(abeja.nivel / 5));
    const DivConver = CrearDiv("EffectoConver")
    DivConver.textContent = "💱"
    DivConver.style.top = `${lugar.y - 18}px`
    DivConver.style.left = `${lugar.x - 18}px`

    const divArea = CrearDiv("Circulo")

    divArea.style.height = Area + "px"
    divArea.style.width = Area + "px"
    divArea.style.top = `${lugar.y - Area / 2}px`
    divArea.style.left = `${lugar.x - Area / 2}px`

    DivConver.classList.add("effecto-aparecer");
    divArea.classList.add("effecto-aparecer");

    setTimeout(() => {
        DivConver.classList.add("effecto-rotar");
        divArea.classList.add("effecto-rotar");

        setTimeout(() => {
            DivConver.remove()
            divArea.remove()
            CrearEffecto("EffectoConver2", "💱", lugar, 18, 600);

            const divArea2 = CrearDiv("Circulo2")
            mundo.appendChild(divArea2);
            divArea2.style.height = Area + "px"
            divArea2.style.width = Area + "px"
            divArea2.style.top = `${lugar.y - Area / 2}px`
            divArea2.style.left = `${lugar.x - Area / 2}px`
            setTimeout(() => { divArea2.remove() }, 600);

        }, tiempo * 1000);
    }, 500);
    mundo.appendChild(divArea)
    mundo.appendChild(DivConver)

    const inter = setInterval(() => {
        if (EspacioActual === 0) { return }

        let total = 0;
        Colmena.forEach(element => {
            total += element.abeja.FCovercion()
        });
        total = Math.round(total * Conver2);
        let AbejasCover = []
        Colmena.forEach(element => {
            if (calcularDistancia(Ubicacion(element.abeja.DivAbeja), lugar) <= Area - 50) {
                AbejasCover.push(Math.round(element.abeja.FCovercion() / 3))
            }
        });
        if (AbejasCover.length > 0) {
            const tresMasGrandes = AbejasCover
                .sort((a, b) => b - a) // Ordena de mayor a menor
                .slice(0, 3);         // Toma los primeros 3 elementos

            // Suma los 3 valores más grandes al total
            total += tresMasGrandes.reduce((suma, valor) => suma + valor, 0);
        }
        if (total > EspacioActual) { total = EspacioActual }

        let Polen = JSON.parse(JSON.stringify(PolenV));
        Polen.Miel += total
        Polen.coordenadas = lugar
        GenerarTextoDeFlotante(Polen)
        AumentarMiel(total)

        EspacioActual -= total;
        const texto = `Has Convertido  ` + total + ' de Polen ';
        AgregarNotificacion("azul", texto, "Covercion")
        ActulizarHUB()
    }, 1000);
    setTimeout(() => {
        clearInterval(inter)
    }, tiempo * 1000);
}

let Amplicadores = [

]
let INDIFICADOR = 0;
function Amplificador(abeja, ficha) {
    ficha.remove()
    const flores = document.querySelectorAll('.flores');
    const flor = flores[Math.floor(Math.random() * flores.length)];
    const lugar = Ubicacion(flor);
    const tiempo = 4 + (0.2 * Math.floor(abeja.nivel / 2))
    const Area = 200 + (7 * abeja.nivel);
    const boni = 0.5 + (0.1 * abeja.nivel);
    INDIFICADOR++;
    const ID = INDIFICADOR;
    Amplicadores.push({id: ID, Ubicacion: lugar, area: Area, bonificacion: boni})
    const DivAmplificador = CrearDiv("EffectoConver")
    const divArea = CrearDiv("Circulo")

    DivAmplificador.textContent = "🔍"
    DivAmplificador.style.top = `${lugar.y - 18}px`
    DivAmplificador.style.left = `${lugar.x - 18}px`

    divArea.style.height = Area + "px"
    divArea.style.width = Area + "px"
    divArea.style.top = `${lugar.y - Area / 2}px`
    divArea.style.left = `${lugar.x - Area / 2}px`
    divArea.style.border = `4px dashed rgb(100, 90, 0)`


    DivAmplificador.classList.add("effecto-aparecer");
    divArea.classList.add("effecto-aparecer");

    setTimeout(() => {
        divArea.classList.add("effecto-Amplicador-rotar");

        setTimeout(() => {
            DivAmplificador.remove()
            divArea.remove()
            CrearEffecto("EffectoConver2", "🔍", lugar, 18, 600);

            const divArea2 = CrearDiv("Circulo2")
            mundo.appendChild(divArea2);
            divArea2.style.height = Area + "px"
            divArea2.style.width = Area + "px"
            divArea2.style.border = `4px dashed rgb(100, 90, 0)`
            divArea2.style.top = `${lugar.y - Area / 2}px`
            divArea2.style.left = `${lugar.x - Area / 2}px`
            setTimeout(() => { divArea2.remove() }, 600);

        }, tiempo * 1000);
    }, 500);
    mundo.appendChild(divArea)
    mundo.appendChild(DivAmplificador)

    setTimeout(() => {
        Amplicadores = Amplicadores.filter(Amplicador => Amplicador.id !== ID);
    }, tiempo * 1000);
}