const Textmiel = document.getElementById("textmiel");
const ButonCover = document.getElementById("ButonCover");
const texButonCover = document.getElementById("texButonCover");
const Texpolen = document.getElementById("Texpolen");
const Barrrapolen = document.getElementById("Barrapolen");

function ActulizarHUB() {

    // Actualiza el texto de la mochila y el dinero
    const PolenPromedio = obtenerPromedioPorSegundo(HistorialPolen)
    const MielPromedio = obtenerPromedioPorSegundo(HistorialMiel)


    if (PolenPromedio > 0) {
        Texpolen.textContent = `${ForNu(EspacioActual)}/${ForNu(EspacioMaximo())} (+${ForNu(PolenPromedio)}Seg)`;
    } else {
        Texpolen.textContent = `${ForNu(EspacioActual)}/${ForNu(EspacioMaximo())}`;
    }
    if (MielPromedio > 0) {
        Textmiel.textContent = `${ForNu(Miel)} (+${ForNu(MielPromedio)}Seg)`;
    } else {
        Textmiel.textContent = ForNu(Miel);

    }


    AutoFontSize(Texpolen, 15, 1, 200);
    AutoFontSize(Textmiel, 15, 1, 200);

    // Calcula el porcentaje de llenado y actualiza la barra
    const porcentajeLlenado = (EspacioActual / EspacioMaximo()) * 100;
    Barrrapolen.style.width = `${porcentajeLlenado}%`;

}
function ButonConvertir() {
    if (ModoCovirtiendo) {
        ModoCovirtiendo = false
        ModoCovirtiendo2 = false;
        texButonCover.textContent = "Convertir";
        ButonCover.style.background = "#fdff8f";
    }
    else if (EspacioActual > 0) {
        ModoCovirtiendo = true
        ModoCovirtiendo2 = false;
        texButonCover.textContent = "Desactivar";
        ButonCover.style.background = "#f55e5e";
    }
}
function DecConvitiendo() {

    if (EspacioActual === 0) {
        ModoCovirtiendo2 = true;
        ModoCovirtiendo = false;
        texButonCover.textContent = "Convertir";
        ButonCover.style.backgroundColor = "#fdff8f";
    }
}


setInterval(() => {
    DecConvitiendo()
}, 30);


ButonCover.onclick = () => ButonConvertir();

document.addEventListener('mousemove', (event) => {
    document.querySelector('.descricon').style.left = `${event.pageX + 10}px`;  // Centrado del círculo
    document.querySelector('.descricon').style.top = `${event.pageY + 10}px`;
});
function Descrion(Titulo, acu, Variables) {

    // Genera el encabezado del título
    let contenido = `<div class="titulo">${Titulo} x${acu}</div>`;

    // Itera sobre las variables para generar los elementos adicionales
    contenido += Variables.map(element =>
        element.Multi 
            ? `<div class="variable">x${element.valor} ${element.Nombre}</div>` // Caso 1
            : `<div class="variable">+${Math.round(element.valor * 100)}% ${element.Nombre}</div>` // Caso 2
    ).join("");
     // Combina los elementos en una sola cadena

    // Agrega un espacio extra, si es necesario
    contenido += `<span style="display:inline-block; width: 10px;"></span>`;
    document.querySelector('.descricon').innerHTML = contenido;

    const titulo = document.querySelector('.descricon').querySelector('.titulo')
    AutoFontSize(titulo, 20, 5, 120)
    const variables = document.querySelectorAll('.descricon .variable');
    variables.forEach(variable => {
        AutoFontSize(variable, 10, 1, 120);

    });
}
function AbriryCerraSecionA(cerrar) {
    const SecionDiv = document.querySelector('.Secion');
    if (cerrar) {
        SecionDiv.innerHTML = "";
        SecionDiv.style.display === "none"
        SecionDiv.style.visibility = "hidden";
        secionA = false
    } else {
        SecionDiv.style.display === "block"
        SecionDiv.style.visibility = "visible";
        secionA = true
        toggleMenu(true)
    }
}
function ExperiaciaInput(NombreItem, Panelid, Exp) {
    const SecionDiv = document.querySelector('.Secion');
    SecionDiv.innerHTML = "";

    const divcentral = document.createElement("div");
    divcentral.className = "inputlExperiencia";
    const item = inventory.find(obj => obj.Nombre === NombreItem);
    let panel = Colmena.find(obj => obj.id === Panelid);
    const ExperenciaFaltante = Math.abs(panel.xp - panel.xpMax);
    const ExperieciaDar = item.cantidad * Exp;
    divcentral.innerHTML += `<div class="Icon">${item.emoji}</div>`
    divcentral.innerHTML += `<label for="cantidad">${item.Nombre}</label>`
    divcentral.innerHTML += `<label for="cantidad">${item.descripcion}</label>`
    divcentral.innerHTML += `
        <input 
            type="number" 
            id="cantidad" 
            name="cantidad" 
            placeholder="Ingresa una cantidad" 
            min="1" 
            max="${item.cantidad}" 
        >
    
    <button type="button" onclick="AumentarExp(${panel.id}, ${0},'${item.Nombre}',${Exp})">Enviar</button>
    `
        ;
    if (ExperieciaDar > ExperenciaFaltante) {
        const cantidadmaxima = Math.ceil(ExperenciaFaltante / Exp);//el primero es 100 y o=el otro es 10 es resultado deberia ser 10 no?
        divcentral.innerHTML += `<button type="button" onclick="AumentarExp(${panel.id},${cantidadmaxima},'${item.Nombre}',${Exp})">Subir De Nivel(${cantidadmaxima})</button>`
    } else {
        divcentral.innerHTML += `<button type="button" onclick="AumentarExp(${panel.id},${item.cantidad},'${item.Nombre}',${Exp})">Todo(${item.cantidad})</button>`
    }
    SecionDiv.appendChild(divcentral);

}
function AgregarNotificacion(Color, Texto, ID = null) {

    if(!NotificacionActiva) return
    const Notificacion = CrearDiv("Notificacion")
    Notificacion.dataset.ID = ID
    if (ID !== null) {
        const Notificationes = document.querySelectorAll(".Notificacion")
        Notificationes.forEach(element => {
            if (element.dataset.ID === ID) {
                    const num1 = parseInt(element.textContent.match(/\d+/)[0]);
                    const num2 = parseInt(Texto.match(/\d+/)[0]);
                    Texto = Texto.replace(/\d+/, String(num1 + num2));
                    element.remove()
            }
        });
    }
    Notificacion.textContent = Texto
    AutoFontSize(Notificacion, 20, 1, 300)
    setTimeout(() => {
        Notificacion.style.opacity = 0

        setTimeout(() => {
            Notificacion.remove()
        }, 4000);
    }, 3000);
    switch (Color) {
        case "rojo":
            Notificacion.style.backgroundColor = "rgb(255, 112, 112)"; // Color rojo
            break;
        case "azul":
            Notificacion.style.backgroundColor = "rgb(112, 169, 255)"; // Color azul
            break;
        default:
            Notificacion.style.backgroundColor = "rgb(255, 245, 112)"; // Color por defecto (gris)
    }
    document.querySelector(".ZonaNotificaciones").appendChild(Notificacion)
}