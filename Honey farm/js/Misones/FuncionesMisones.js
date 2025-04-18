//acttvar msion
function activarMision(idMision) {
    for (const key in misionesOso) {
        const mision = misionesOso[key];
        if (mision.id === idMision && mision.estado === "inactiva") {
            mision.estado = "activa";

            return; // Salir después de activar la misión
        }
    }

}
function activarSiguienteMision() {
    let siguienteMision = null;

    // Buscar la misión con el id más bajo que esté inactiva
    for (const key in misionesOso) {
        const mision = misionesOso[key];
        if (mision.estado === "inactiva") {
            if (!siguienteMision || mision.id < siguienteMision.id) {
                siguienteMision = mision;

            }
        }
    }

    // Activar la misión encontrada
    if (siguienteMision) {
        siguienteMision.estado = "activa";
        MisionOsoActual = siguienteMision.id;
    }
}
function extraerPolen(PolenV) {
    // Buscar el campo activo
    let campoActivo = null;
    for (const key in Campos) {
        if (Campos[key].Activo) {
            campoActivo = Campos[key];
            break;
        }
    }
    // Determinar cuánto polen de cada tipo se extrajo del campo activo
    const polenExtraido = {
        Rojo: PolenV.polenR,
        Azul: PolenV.polenA,
        Blanco: PolenV.polenB
    };

    // Procesar el progreso de las misiones
    actualizarProgresoMisiones(polenExtraido, campoActivo);
}
function actualizarProgresoMisiones(polenExtraido, campo) {
    for (const key in misionesOso) {
        const mision = misionesOso[key];
        if (mision.estado === "activa") {
            mision.objetivos.forEach((objetivo) => {
                if (objetivo.Terminda) return;

                if (objetivo.Campo !== "NP" && objetivo.Campo !== campo.Nombre) return;

                // Verificar si el color cumple con el objetivo
                if (objetivo.ColorPolen !== "NP") {
                    if (objetivo.ColorPolen === "Rojo") {
                        objetivo.Progreso += polenExtraido.Rojo;
                    } else if (objetivo.ColorPolen === "Azul") {
                        objetivo.Progreso += polenExtraido.Azul;
                    } else if (objetivo.ColorPolen === "Blanco") {
                        objetivo.Progreso += polenExtraido.Blanco;
                    }
                } else {
                    // Si no importa el color, suma todo el polen
                    objetivo.Progreso += polenExtraido.Rojo + polenExtraido.Azul + polenExtraido.Blanco;
                }

                // Verificar si el objetivo se completó
                if (objetivo.Progreso >= objetivo.Meta) {
                    objetivo.Terminda = true;
                    objetivo.Meta = objetivo.Progreso;

                }
            });

            // Marcar la misión como completada si todos los objetivos están terminados
            if (mision.objetivos.every(obj => obj.Terminda)) {
                mision.estado = "completada";
                const texto = `La mision "${mision.Nombre}" hacido completada✅`
                AgregarNotificacion("azul", texto) 
            }
        }
    }
}
let intervarMision = []
function mostrarMisiones() {
    const ZonaMision = document.querySelector('.ZonaMision');
    ZonaMision.innerHTML = ""


    if (SistemaBool.MisionOpen) {
        SistemaBool.MisionOpen = false
        if (intervarMision.length > 0) {
            console.log(intervarMision)
            intervarMision.forEach(element => {
                clearInterval(element)
            });
            intervarMision = []
        }
        return
    } else {
        SistemaBool.MisionOpen = true;
    }



    ZonaMision.appendChild(MisionEspesifica(misionesOso));

}

function MisionEspesifica(Mision) {
    for (const key in Mision) {
        const mision = Mision[key];
        if (mision.estado === "activa") {
            const MisionDispleter = CrearDiv("Mision-displeter")
            const MisionTitular = TitularMision(mision)

            const DivObjetivos = CrearDiv("mision-objetivos")

            mision.objetivos.forEach((objetivo) => {
                const Divobjetivo = CrearDiv("mision-objetivo")
                const DivBarra = CrearDiv("barra-progreso-relleno")
                const DivSub = CrearDiv("Sub")

                const objetivoTitular = CrearDiv("")
                const DivPorcentaje = CrearDiv("")

                if (objetivo.Tipo === "Polen") {
                    objetivoTitular.textContent = 'Recolecta ' + ForNu(objetivo.Meta)
                    if (objetivo.ColorPolen === 'NP') { objetivoTitular.textContent += " Polen" } else { objetivoTitular.textContent += " Polen " + objetivo.ColorPolen }
                    if (objetivo.Campo !== 'NP') {
                        objetivoTitular.textContent += " Del " + objetivo.Campo
                    }
                }

                AutoFontSize(objetivoTitular, 16, 1, 213)

                ActualizarBarra(objetivo, DivBarra, DivPorcentaje)

                Divobjetivo.appendChild(DivBarra);
                DivSub.appendChild(objetivoTitular);
                DivSub.appendChild(DivPorcentaje);
                Divobjetivo.appendChild(DivSub);
                DivObjetivos.appendChild(Divobjetivo);


            });

            MisionDispleter.appendChild(MisionTitular);
            MisionDispleter.appendChild(DivObjetivos);
            return MisionDispleter
            //ESTA PARTE AUN HACIDO COMENZADA :#
        } else if (MisionOsoActual === mision.id && mision.estado === "completada") {

            mision.estado === "recompesa reclamada"//Cambia el estado

            const MisionDispleter = CrearDiv("Mision-displeter")
            const MisionTitular = TitularMision(mision)
            MisionDispleter.appendChild(MisionTitular);

            const DivRecompensa = CrearDiv("mision-objetivos")


            const DivBoton = CrearDiv("Mision-Completada")
            DivBoton.innerHTML = `<div>Reclamar Remcopesa </div>`
            DivRecompensa.appendChild(DivBoton);

            const DivItems = CrearDiv("Mision-Items");

            const divMiel = CrearDiv("Mision-Item")

            divMiel.textContent = "🍯+" + ForNu(mision.Recompensa.miel);
            DivItems.appendChild(divMiel);

            if (mision.Recompensa.items && mision.Recompensa.items.length > 0) {
                mision.Recompensa.items.forEach((item) => {
                    const DivItem = CrearDiv("Mision-Item");
                    const itemdata = gameItems.find(obj => obj.Nombre === item.Nombre);

                    DivItem.textContent = `${itemdata.emoji} x${item.Cantidad}`;
                    DivItems.appendChild(DivItem);
                });
            }
            DivRecompensa.appendChild(DivItems);

            DivBoton.addEventListener("click", () => {

                Miel += mision.Recompensa.miel;

                // Añadir items al inventario
                mision.Recompensa.items.forEach((item) => {
                    SumarItem(item.Nombre, item.Cantidad);
                });

                // Feedback visual (por ejemplo, deshabilitar botón o mostrar mensaje)
                DivBoton.style.pointerEvents = "none"; // Deshabilitar clic
                DivBoton.style.opacity = 0; // Cambiar apariencia
                DivRecompensa.style.opacity = 0
                setTimeout(() => {
                    activarSiguienteMision()
                    mostrarMisiones()
                    mostrarMisiones()
                }, 500);
            });

            MisionDispleter.appendChild(DivRecompensa);

            return MisionDispleter

        }
    }
}
activarSiguienteMision()

function TitularMision(mision) {
    const DivMisiontitular = CrearDiv("Misiontitular")
    const Divmisiontitulo = CrearDiv("mision-titulo")
    const misionComprobante = CrearDiv("misionComprobante")

    Divmisiontitulo.textContent = `${mision.id}. ${mision.Nombre}`
    //misionComprobante.textContent = `${mision.id}. ${mision.Nombre}`
    if (mision.objetivos.every(obj => obj.Terminda)) {
        misionComprobante.textContent = `✅`

    } else {
        misionComprobante.textContent = `❌`
    }
    if (mision.objetivos.every(obj => obj.Terminda)) {
        DivMisiontitular.appendChild(Divmisiontitulo);
        DivMisiontitular.appendChild(misionComprobante);
        AutoFontSize(Divmisiontitulo, 28, 1, 170)

        return DivMisiontitular
    }
    const iterval2 = setInterval(() => {
        if (mision.objetivos.every(obj => obj.Terminda)) {
            misionComprobante.textContent = `✅`
            mostrarMisiones()
            mostrarMisiones()
            console.log("sad")
            clearInterval(iterval2)
        } else {
            misionComprobante.textContent = `❌`
        }
    }, 500);

    intervarMision.push(iterval2)
    AutoFontSize(Divmisiontitulo, 28, 1, 170)

    DivMisiontitular.appendChild(Divmisiontitulo);
    DivMisiontitular.appendChild(misionComprobante);
    return DivMisiontitular
}
function ActualizarBarra(objetivo, DivBarra, DivPorcentaje) {
    const porcentajeLlenado = (objetivo.Progreso / objetivo.Meta) * 100;
    DivBarra.style.width = `${porcentajeLlenado}%`;
    if (objetivo.Terminda) {
        DivPorcentaje.textContent = " (Compleatado)";
    } else {
        DivPorcentaje.textContent = ForNu(objetivo.Progreso) + "/" + ForNu(objetivo.Meta)
    }
    AutoFontSize(DivPorcentaje, 16, 13, 213)

    const iterval1 = setInterval(() => {
        const porcentajeLlenado = (objetivo.Progreso / objetivo.Meta) * 100;
        DivBarra.style.width = `${porcentajeLlenado}%`;
        if (objetivo.Terminda) {
            DivPorcentaje.textContent = " (Compleatado)";
            clearInterval(iterval1);
        } else {
            DivPorcentaje.textContent = ForNu(objetivo.Progreso) + "/" + ForNu(objetivo.Meta)
        }
        AutoFontSize(DivPorcentaje, 16, 13, 213)

    }, 100);
    intervarMision.push(iterval1)

}