function GenerarFichas(color, icon, DatoFicha, funcion, tiempo) {
    // Crear un nuevo elemento div para la ficha
    const divFicha = document.createElement("div");
    divFicha.className = "Filla";
    divFicha.innerHTML = `${color}<div class="icon">${icon}</div>`;

    // Asignar el evento onclick
    divFicha.onclick = () => funcion(DatoFicha, divFicha);

    // Obtener la ubicación y ajustar las coordenadas
    let lugar = Ubicacion(DatoFicha.div);
    divFicha.style.left = `${lugar.x - 30}px`;
    divFicha.style.top = `${lugar.y - 30}px`;

    // Agregar el elemento al documento
    mundo.appendChild(divFicha);

    // Remover el elemento después del tiempo especificado
    setTimeout(() => {
        divFicha.classList.add("parpadeo");
    }, (tiempo - 3) * 1000);
    setTimeout(() => {
        divFicha.remove();
    }, tiempo * 1000);
}
function Generalcon(icon, acumalacion, ID) {
    const divFicha = document.createElement("div");
    divFicha.className = "Cuadro";
    divFicha.id = ID;
    divFicha.innerHTML = `    <div class="TiempoFaltante"></div>
                                <div class="icon">${icon}</div>
                                <div class="acumulaciones">x${acumalacion}</div>`;
    return divFicha;
}




function FichaAmorAbeja(DatoFicha) {
    GenerarFichas("⚪", '💖', DatoFicha, AmorAbeja, 4)
}
function FichaMasAzul(DatoFicha) {
    GenerarFichas("🔵", '💠', DatoFicha, MasAzul, 4)
}
function FichaMasRojal(DatoFicha) {
    GenerarFichas("🔴", '.🌹', DatoFicha, MasRojo, 4)
}
function FichaGlobo(DatoFicha) {
    GenerarFichas("🔵", '.🎈', DatoFicha, GloboExplosivo, 5)
}
function FichaPertado(DatoFicha) {
    GenerarFichas("🔴", '🧨', DatoFicha, Pertado, 5)
}
function FichaFoto(DatoFicha) {
    GenerarFichas("⚪", '📷', DatoFicha, Foto, 5)
}
function FichaLagrima(DatoFicha) {
    GenerarFichas("🔵", '.💧', DatoFicha, LagrimaBuff, 5)
}
function FichaChapuson(DatoFicha) {
    GenerarFichas("🔵", '🧺', DatoFicha, Chapunchon, 4)
}
function FichaMasCritico(DatoFicha) {
    GenerarFichas("🔴", '💢', DatoFicha, MasCritico, 4)
}
function FichaFuego(DatoFicha) {
    GenerarFichas("🔴", '🔥', DatoFicha, Fuego, 4)
}
function FichaConver(DatoFicha) {
    GenerarFichas("⚪", '💱', DatoFicha, Convertidor, 4)
}
function FichaAmplificador(DatoFicha) {
    GenerarFichas("⚪", '🔍', DatoFicha, Amplificador, 4)
}






//Colmena.push({ id: Colmena.length + 1, abeja: null, Nombre: "", nivel: 0, xp: 0, xpMax: 100 });
Colmena.forEach(panal => {
    if (panal.id === (Colmena.length)) {
        GenerarAbeja(panal)
        AbrirColmena()
        AbrirColmena()
        RestarItem("Huevo", 1);
    }
});