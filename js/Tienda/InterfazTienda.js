const Botones = {
    Recolectores: { icon: "🔪", funcion: MochilaZona, contexto: "RecolectoresUsuarios" },
    Mochilas: { icon: "🎒", funcion: MochilaZona, contexto: "MochilaUsuarios" },
    Abejas: { icon: "🐝", funcion: MochilaZona, contexto: "AcesoriosAbeja" },
    Mejoras: { icon: "⏫", funcion: MochilaZona, contexto: "Mejoras" },
}
let contextoTienda = {
    RecolectoresUsuarios: false,
    MochilaUsuarios: false,
    Mejoras: false,
    AcesoriosAbeja: false
}
function AbrirTienda() {
    const SecionDiv = document.querySelector('.Secion');

    if (SistemaBool.ShopOpen) {
        SistemaBool.ShopOpen = false
        AbriryCerraSecionA(true)
        return
    } else {
        SistemaBool.ShopOpen = true;
        AbriryCerraSecionA(false)
    }
    // Plantilla inicial de la colmena
    const divTienda = `
        <div class="Titulo">Tienda</div>
        <div class="inventario-container">
            <div class="inventario-items"></div>
            <div class="informacion-item"></div>
        </div>
    `;
    SecionDiv.innerHTML = divTienda;
    const inventarioContainer = SecionDiv.querySelector('.inventario-items');

    for (const key in Botones) {
        const boton = Botones[key];
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <div class="item-icon">${boton.icon}</div>
            <div class="Nombre">${key}</div>
        `;
        itemDiv.onclick = () => boton.funcion(boton.contexto);

        inventarioContainer.appendChild(itemDiv);
    }

}


function MochilaZona(contexto) {
    cambiarContexto(contexto)
    const var1 = cambiarContexto("llave")

    const SecionDiv = document.querySelector('.Secion');
    const inventarioContainer = SecionDiv.querySelector('.inventario-items');
    inventarioContainer.innerHTML = ""

    let minimo = 0;
    for (const key in var1) {
        const Item = var1[key];

        if (Item?.zona > Colmena.length) {
            if (minimo === 0 || minimo > Item.zona) minimo = Item.zona
            break;
        }
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML += `
            <div class="item-icon">${Item.icon}</div>
        `;
        if (Item.Comprado) {
            itemDiv.innerHTML += `<div class="Nombre">${key}</div>`
        } else {
            if (Item?.Maximo) {
                itemDiv.innerHTML += `<div class="Nombre">Maximo</div>`
            } else {
                itemDiv.innerHTML += `<div class="Nombre">🍯${ForNu(Item.Precio)}</div>`
            }
        }
        if (Item?.Equipado) {
            itemDiv.innerHTML += `<div class="item-Nivel" style="background-color: rgb(134, 243, 101)">Equipado</div>`
        } else if (Item?.Comprado) {
            itemDiv.innerHTML += `<div class="item-Nivel">Comprado</div>`
        }
        //itemDiv.onclick = () => InformacionItenm(key);
        if (Item?.item || Item?.Inflacion) {
            itemDiv.onclick = () => InfromacionItenm2(key);
        } else {
            itemDiv.onclick = () => InformacionItenm(key);
        }

        inventarioContainer.appendChild(itemDiv);
    }

    if(minimo > 0){
        const itemDiv = CrearDiv("item")
        itemDiv.innerHTML += `<div class="item-icon">🔒</div>`;
        const NombreDiv = CrearDiv("item")
        NombreDiv.innerHTML += `<div class="Nombre">${minimo} Abejas Minimo</div>`;

        itemDiv.appendChild(NombreDiv);
        AutoFontSize(NombreDiv, 16, 1, 88)
        inventarioContainer.appendChild(itemDiv);
    }
}
function cambiarContexto(contexto) {
    if (contexto === "llave") {
        for (let key in contextoTienda) {
            if (contextoTienda[key]) {
                AcesoriosAbeja
                if (key === "MochilaUsuarios") { return MochilaUsuarios } else
                    if (key === "RecolectoresUsuarios") { return RecolectoresUsuarios } else
                        if (key === "Mejoras") { return MejorasItem } else
                            if (key === "AcesoriosAbeja") { return AcesoriosAbeja }

            }
        }
    } else {
        for (let key in contextoTienda) {
            contextoTienda[key] = false;
        }
        contextoTienda[contexto] = true;
    }

}
function InformacionItenm(key) {
    const var1 = cambiarContexto("llave")
    const Herramienta = var1[key];
    const infoContainer = document.querySelector(".informacion-item");
    infoContainer.innerHTML = "";

    // Añade los detalles del item.
    infoContainer.innerHTML = `
            <div class="item-detalle-icon">${Herramienta.icon}</div>
            <div class="item-detalle-Nombre">${key}</div>
            <div class="item-detalle-descripcion">🍯${ForNu(Herramienta.Precio)}</div>
            <div class="item-detalle-descripcion">${Herramienta.descripcion}</div>
        `;
    const divUso = document.createElement("div");
    divUso.className = "item-detalle-uso";
    if (Herramienta.Comprado) {
        if (Herramienta.Equipado) {
            divUso.textContent = "Equipado";
            divUso.style.background = "rgb(134, 243, 101)";
        } else {
            divUso.textContent = "Equipar";
            divUso.onclick = () => EquiparItem(key);
            divUso.style.background = "rgb(101, 101, 243)";
        }
        //divUso.onclick = () => funcion(id); 
    } else {
        divUso.textContent = "Comprar";

        divUso.onclick = () => ComprarHerramienta(Herramienta, key);
    }
    infoContainer.appendChild(divUso);
}
function InfromacionItenm2(key) {
    const var1 = cambiarContexto("llave")
    const item = var1[key];

    const infoContainer = document.querySelector(".informacion-item");
    infoContainer.innerHTML = "";
    let DatosItem = BuscarItem(item.item)
    let descripcion = DatosItem?.descripcion || item.descripcion;
    let Nombre = item.item || key;

    // Añade los detalles del item.
    infoContainer.innerHTML = `
            <div class="item-detalle-icon">${item.icon}</div>
            <div class="item-detalle-Nombre">${Nombre}</div>
            <div class="item-detalle-descripcion">🍯${ForNu(item.Precio)}</div>
            <div class="item-detalle-descripcion">${descripcion}</div>
        `;
    const divUso = document.createElement("div");
    divUso.className = "item-detalle-uso";

    divUso.textContent = "Comprar";

    if (item?.function) {
        if (item.Maximo) return

        divUso.onclick = () => item.function();
    } else {
        divUso.onclick = () => ComprarItem(item, key);
    }

    infoContainer.appendChild(divUso);
}
function ComprarHerramienta(herramienta, key) {
    if (herramienta.Precio > Miel) {
        alert("No tienes La Miel Suficiente");
        return;
    }
    const confirmacion = confirm(`¿Estás seguro de que quieres comprar ${key}? por 🍯${ForNu(herramienta.Precio)} `);
    if (confirmacion) {
        Miel -= herramienta.Precio;
        herramienta.Comprado = true
        EquiparItem(key)
    }

}
function ComprarItem(herramienta, key) {
    if (herramienta.Precio > Miel) {
        alert("No tienes La Miel Suficiente");
        return;
    }
    const confirmacion = confirm(`¿Estás seguro de que quieres comprar ${herramienta.item}? por 🍯${ForNu(herramienta.Precio)} `);
    if (confirmacion) {
        Miel -= herramienta.Precio;
        herramienta.Precio = Math.round(herramienta.Inflacion * herramienta.Precio);
        if (herramienta.Precio > herramienta.maximo) { herramienta.Precio = herramienta.maximo }
        SumarItem(herramienta.item, 1)
        MochilaZona("llave");
        InfromacionItenm2(key)
    }

}
function EquiparItem(key) {
    const var1 = cambiarContexto("llave")

    for (const key in var1) {
        const herramienta = var1[key];
        herramienta.Equipado = false;
    }
    const herramienta = var1[key];
    herramienta.Equipado = true;
    MochilaZona("llave");
    InformacionItenm(key)
    ActulizarMochila()
}
