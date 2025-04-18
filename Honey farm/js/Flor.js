function SacarFilla(Extraido = 1) {
    let calidad = null;
    // se saca la calidad
    for (const key in RarezaFicha) {
        const element = RarezaFicha[key];
        const NR = Math.floor(Math.random() * element.Probalida) + 1;
        const RN = Math.floor(Math.random() * element.Probalida);
        
        // Corregimos la condición
        if (RN - (Extraido / 2) <= NR && NR <= RN + (Extraido / 2)) {
            calidad = key;
        }
    }
    //se no hay calidad
    if (calidad === null) return

    //se saca en que campo esta

    const CampoTRUE = Object.keys(Campos).find(key => Campos[key].Activo)
    const Campo = Campos[CampoTRUE];
    let Items = []

    //se filtran las fichas que pueden salir
    for (const key in RarezaFicha[calidad].item) {
        const element = RarezaFicha[calidad].item[key];
        if (element.Campo.includes(Campo.Nombre)|| element.Campo === "all") Items.push(element.Nombre)
    }
    //se manda una Ramdon
    return  Items[Math.floor(Math.random() * Items.length)]
}

function GenearaFichaFlor(Recolecion, flor) {
    const NombreItem = SacarFilla(Recolecion)
    if (NombreItem === undefined) return;
    const item = gameItems.find(obj => obj.Nombre === NombreItem);
    const DatoFicha = {
        div: flor,
        NombreItem: NombreItem,
        EmojiItem: item.emoji
    }
    GenerarFichas("⚫", item.emoji, DatoFicha, DarItem, 4)

}

function DarItem(fichadato, ficha) {
    CrearEffecto("EffectoFuego", fichadato.EmojiItem, Ubicacion(ficha), 12.5, 600);
    ficha.remove()
    SumarItem(fichadato.NombreItem, 1)
}
function Humedo(divflor, Cantidad) {
    // Incrementar la humedad
    divflor.Datos.Humeda += Cantidad;
    if (divflor.Datos.TiempoHumeda) { clearTimeout(divflor.Datos.TiempoHumeda) }

    // Calcular el porcentaje basado en el máximo de 3
    let porcentaje = (divflor.Datos.Humeda / 3) * 100;

    // Ajustar la opacidad del fondo según el porcentaje
    let opacidad = Math.min(porcentaje / 100, 0.8); // Asegurar que no exceda 80%
    divflor.style.backgroundColor = `rgba(83, 83, 255, ${opacidad})`;

    divflor.Datos.TiempoHumeda = setTimeout(() => {
        divflor.Datos.Humeda = 0;
        divflor.Datos.TiempoHumeda = null;
        
        let porcentaje = (divflor.Datos.Humeda / 3) * 100;
        let opacidad = Math.min(porcentaje / 100, 0.8);
        divflor.style.backgroundColor = `rgba(83, 83, 255, ${opacidad})`;
    }, 11000);;
    
}