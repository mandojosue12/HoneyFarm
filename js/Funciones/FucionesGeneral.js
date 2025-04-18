function AutoFontSize(elemento, maximo, minimo, width) {
    if (!elemento) return; // Si no encuentra el elemento, termina la función
    //Poner este estilo white-space: nowrap;
    elemento.style.whiteSpace = "nowrap";
    setTimeout(() => {
        let fontSize = maximo; // Comienza con el tamaño máximo
        elemento.style.fontSize = `${fontSize}px`;
        // Reduce el tamaño hasta que el ancho del texto sea menor o igual al permitido
        while (elemento.scrollWidth > width && fontSize > minimo) {
            
            fontSize--;
            elemento.style.fontSize = `${fontSize}px`;
        }
    }, 0);
}
function ForNu(texto) {
    return texto.toLocaleString()
}
function CrearDiv(clase) {
    const divdisplay = document.createElement('div');
    divdisplay.className = clase;
    return divdisplay;
}