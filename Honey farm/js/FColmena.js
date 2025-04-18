const dataColmena = {
    id: 0,
    abeja: null,
    Nombre: "",
    nivel: 0,
    xp: 0,
    xpMax: 100,
    DatosAbeja: null
}
let Colmena = [];
let limite = 10;
let CostePanel = 100000;
// Función para generar la interfaz de la colmena
function AbrirColmena() {
    const SecionDiv = document.querySelector('.Secion');

    if (SistemaBool.HiveOpen) {
        SistemaBool.HiveOpen = false
        AbriryCerraSecionA(true)

        return
    } else {
        SistemaBool.HiveOpen = true;
        AbriryCerraSecionA(false)

    }
    // Plantilla inicial de la colmena
    const divColmena = `
        <div class="Titulo">Colmena</div>
        <div class="inventario-container">
            <div class="inventario-items"></div>
            <div class="informacion-item"></div>
        </div>
    `;
    SecionDiv.innerHTML = divColmena;

    const inventarioContainer = SecionDiv.querySelector('.inventario-items');

    // Renderizar los ítems de la colmena
    Colmena.forEach(panal => {
        inventarioContainer.appendChild(crearItemAbeja(panal));
    });

    // Límite alcanzado: agregar ítem de bonus o botón de añadir
    if (Colmena.length >= limite) {
        inventarioContainer.appendChild(crearItemExtra("💲", "$" + CostePanel));
    } else {

        inventarioContainer.appendChild(crearItemExtra("➕", "Añadir"));

    }
}

// Función para crear un ítem de abeja
function crearItemAbeja(panal) {
    const item = document.createElement("div");
    item.className = "item";
    item.setAttribute(
        "onclick",
        `DetallesAbeja('🐝', '${panal.Nombre}', '${panal.abeja.Frecolecion()}', '${panal.abeja.FCovercion()}', '${panal.abeja.FVelocidad()}', ${panal.xp}, ${panal.xpMax}, ${panal.id})`
    );

    // Crear contenido
    item.innerHTML = `
        <div class="item-icon">🐝</div>
        <div class="item-Nivel">${panal.nivel}</div>
        <div class="Nombre">${panal.Nombre}</div>
    `;

    // Manipular el div Nombre antes de devolver
    const divNombre = item.querySelector(".Nombre");
    AutoFontSize(divNombre, 10, 1, 88);

    return item;

}

// Función para crear ítems extra (por ejemplo, botón de añadir o ítem de bonus)
function crearItemExtra(icono, texto) {

        const cartItem = document.createElement("div");
        cartItem.className = "item";
        if(icono === "➕"){
            cartItem.onclick = () => ModificarAbeja(0);
        }else{ 
            cartItem.onclick = () => ComprarEspacio(texto);
        }
    
        cartItem.innerHTML = `
            <div class="item">
                <div class="item-icon">${icono}</div>
                <div class="Nombre">${texto}</div>
            </div>
        `;


    return cartItem;
}
function ComprarEspacio(texto) {
    const Cantidad = texto.replace(/\D/g, "")
    if(Miel < Cantidad){
     alert("No tienes La Miel Suficiente");
     return;
    }
    const confirmacion = confirm("¿Estás seguro de que quieres comprar espacio? por " + texto);
    if (confirmacion) {
        Miel -= Cantidad;
        limite++;
        AbrirColmena();
        AbrirColmena();
        const texto = `Tienes un espacio nuevo`
        AgregarNotificacion("azul", texto) 
    }
}
function DetallesAbeja(icon, Nombre, recoleccion, conversion, velocidad, exp, expmax, id) {
    const informacionAbeja = body.querySelector('.informacion-item');
    const porcentajexp = (exp / expmax) * 100;
    const var1 = "abejas";
    informacionAbeja.innerHTML = `
        <div class="item-detalle-icon">${icon}</div>
        <div class="abeja-detalle-Nombre">${Nombre}</div>
        <div class="abeja-detalle-Recolecion">Recolección: ${recoleccion}</div>
        <div class="abeja-detalle-Convercion">Conversión: ${conversion}</div>
        <div class="abeja-detalle-Velocida">Velocidad: ${velocidad}</div>
        <div class="abeja-detalle-Eperiencia">
            <div class="abeja-detalle-BarraExp" style="width: ${porcentajexp}%"></div>
            <div class="abeja-detalle-TexEXP">${ForNu(exp)}/${ForNu(expmax) }Exp </div>
        </div>
        
        <div class="item-detalle-uso" onclick=" ModificarAbeja(${id}, '${var1}') ">Modificar</div>
        </div>

    `;  

}
function ModificarAbeja(id, extra) {
    const inventarioContainer = document.querySelector(".inventario-items");
    document.body.querySelector('.informacion-item').innerHTML = "";
    // Limpia el contenido anterior para evitar duplicados.
    inventarioContainer.innerHTML = "";

    if (inventory.length === 0) return;

    inventory.forEach((item) => {
        if(item.Uso !== "Colmena" && item.Uso !== extra) {return}

        // Crea un elemento HTML para cada item.
        const cartItem = document.createElement("div");
        cartItem.className = "item";
        cartItem.onclick = () =>
            mostrarInformacion(
                item.emoji,
                item.Nombre,
                item.descripcion,
                VerificacionUso(item.Uso, "Colmena", extra),
                item.funcion,
                id
            );

        cartItem.innerHTML = `
            <div class="item-icon">${item.emoji}</div>
            <div class="item-cantidad">x${item.cantidad}</div>
        `;

        // Añade el item al contenedor del inventario.
        inventarioContainer.appendChild(cartItem);
    });

}
function AumentarExp(panelNombre, unused, itemNombre, Exp) {
    const input = document.getElementById("cantidad");
    const item = inventory.find(obj => obj.Nombre === itemNombre);
    let panel = Colmena.find(obj => obj.id === panelNombre);
    let valor = unused
    if (unused === 0){
        valor = parseInt(input.value, 10);
        if (valor < 1) {valor = 1} else if (valor > item.cantidad) {
            valor = item.cantidad; // Ajustar automáticamente al máximo
    
        }
    }
    const ExperieciaDar = valor * Exp;
    panel.xp += ExperieciaDar;
    const texto2 = `Tu abeja acaba de recibir +${ForNu(ExperieciaDar)} de experiecia`
    AgregarNotificacion("azul", texto2) 
    while (panel.xp >= panel.xpMax) {
        panel.xpMax *= 2
        panel.nivel += 1
        panel.abeja.nivel += 1
        const texto = `🎉Tu ${panel.Nombre} a subido al nivel ${panel.nivel}🎉`
        AgregarNotificacion("azul", texto) 
    }
    RestarItem(itemNombre, valor)
    AbrirColmena()
    AbrirColmena()
        const texto = `El Campo a Cambiado`
    AgregarNotificacion("azul", texto) 
}





