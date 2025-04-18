const gameItems = [
    {
        Nombre: "ejemplo",
        emoji: "🔴",
        cantidad: 0,
        Uso: "",
        maxcantidad: Infinity,
        descripcion: "ejemplo",
        funcion: function () { console.log("ejemplo") }
    },
    {
        Nombre: "Galleta",
        emoji: "🍪",
        cantidad: 0,
        Uso: "abejas",
        maxcantidad: Infinity,
        descripcion: "Da 10 Experiecia a tu abeja",
        funcion: function (contexto) {
            ExperiaciaInput("Galleta", contexto, 10)
          }
    },
    {
        Nombre: "Frezas",
        emoji: "🍓",
        cantidad: 0,
        Uso: "abejas",
        maxcantidad: Infinity,
        descripcion: "Da 25 Experiecia a tu abeja",
        funcion: function (contexto) {
            ExperiaciaInput("Frezas", contexto, 25)
          }
    },
    {
        Nombre: "Uvas",
        emoji: "🍇",
        cantidad: 0,
        Uso: "abejas",
        maxcantidad: Infinity,
        descripcion: "Da 25 Experiecia a tu abeja",
        funcion: function (contexto) {
            ExperiaciaInput("Uvas", contexto, 25)
          }
    },
    {
        Nombre: "Piña",
        emoji: "🍍",
        cantidad: 0,
        Uso: "abejas",
        maxcantidad: Infinity,
        descripcion: "Da 25 Experiecia a tu abeja",
        funcion: function (contexto) {
            ExperiaciaInput("Piña", contexto, 25)
          }
    },
    {
        Nombre: "Huevo Basico",
        emoji: "🥚",
        cantidad: 0,
        Uso: "Colmena",
        maxcantidad: Infinity,
        descripcion: "Genera una abeja alatoria",
        funcion: function (Contexto) {
            if (Contexto >= 1) {
                Colmena.forEach(panal => {
                    if (panal.id === Contexto) {
                        panal.abeja.DivAbeja.remove();
                        GenerarAbeja(panal, "Basica")
                        AbrirColmena()
                        AbrirColmena()
                        RestarItem("Huevo Basico", 1);
                    }
                });
            } else if (Contexto === 0) {
                    const newItem = { ...dataColmena };

                Colmena.push(newItem);
                Colmena.forEach(panal => {
                    if (panal.id === 0) {
                        panal.id = Colmena.length

                        GenerarAbeja(panal, "Basica")
                        AbrirColmena()
                        AbrirColmena()
                        RestarItem("Huevo Basico", 1);
                    }
                });
            }
        }
    },
    {
        Nombre: "Royal",
        emoji: "👑",
        cantidad: 0,
        Uso: "abejas",
        maxcantidad: Infinity,
        descripcion: "Cambia tu abeja a otra abeja alatoria",
        funcion: function (Contexto) {
            if (Contexto >= 1) {
                Colmena.forEach(panal => {
                    if (panal.id === Contexto) {
                        panal.abeja.DivAbeja.remove();
                        GenerarAbeja(panal, "Royal")
                        AbrirColmena()
                        AbrirColmena()
                        RestarItem("Royal", 1);
                    }
                });
            } 
        }
    }
];

let inventory = [];

function displayInventory() {
    const inventarioContainer = document.querySelector(".inventario-items");

    // Limpia el contenido anterior para evitar duplicados.
    inventarioContainer.innerHTML = "";

    if (inventory.length === 0) return;

    inventory.forEach((item) => {
        // Crea un elemento HTML para cada item.
        const cartItem = document.createElement("div");
        cartItem.className = "item";
        cartItem.onclick = () =>
            mostrarInformacion(
                item.emoji,
                item.Nombre,
                item.descripcion,
                VerificacionUso(item.Uso, "inventario"),
                item.funcion,
                0
            );

        cartItem.innerHTML = `
            <div class="item-icon">${item.emoji}</div>
            <div class="item-cantidad">x${item.cantidad}</div>
        `;

        // Añade el item al contenedor del inventario.
        inventarioContainer.appendChild(cartItem);
    });
}

function BuscarItem(Nombre) {
    return gameItems.find((item) => item.Nombre === Nombre);
}
function SumarItem(NombreItem, cantidad = 1, var1 = true) {
    let item = inventory.find(obj => obj.Nombre === NombreItem);
    if (item) {
        if (item.cantidad + cantidad > item.maxcantidad) { cantidad = item.maxcantidad - item.cantidad }
        item.cantidad += cantidad;
        if(var1){
            const texto = `+${ForNu(cantidad)} ${item.Nombre} ${item.emoji}`
            AgregarNotificacion("azul", texto, "itemmas" + NombreItem)
        }
    } else {
        item = gameItems.find(obj => obj.Nombre === NombreItem);
        if (item) {
            const newItem = { ...item };
            inventory.push(newItem);
            SumarItem(NombreItem, cantidad, var1)
        }
    }
}
function RestarItem(NombreItem, cantidad) {
    const item = inventory.find(obj => obj.Nombre === NombreItem);
    if (item) {
        item.cantidad -= cantidad;
        const texto = `-${ForNu(cantidad)} ${item.Nombre} ${item.emoji}`
        AgregarNotificacion("rojo", texto, "itemmenos")
        if (item.cantidad <= 0) {
            inventory = inventory.filter(obj => obj.Nombre !== NombreItem);

        }
    }
}

function mostrarInformacion(emoji, Nombre, descripcion, usable, funcion, id) {
    const infoContainer = document.querySelector(".informacion-item");

    // Limpia el contenido anterior.
    infoContainer.innerHTML = "";

    // Añade los detalles del item.
    infoContainer.innerHTML = `
        <div class="item-detalle-icon">${emoji}</div>
        <div class="item-detalle-Nombre">${Nombre}</div>
        <div class="item-detalle-descripcion">${descripcion}</div>
    `;

    if (usable) {
        const divUso = document.createElement("div");
        divUso.className = "item-detalle-uso";
        divUso.textContent = "Usar";
        divUso.onclick = () => funcion(id);  // Asigna directamente la función.
        infoContainer.appendChild(divUso);
    }
}
function VerificacionUso(valor1, valor2, valor3 = "") {
    if (valor1 === valor2 || valor1 === valor3) {
        return true
    }
    return false
}

function AbriryCerrarInventario() {
    const SecionDiv = document.querySelector('.Secion');
    if (SistemaBool.inventoryOpen) {
        SistemaBool.inventoryOpen = false
        AbriryCerraSecionA(true)
    } else {
        SistemaBool.inventoryOpen = true;
        AbriryCerraSecionA(false)

        const inventario = ` <div class="Titulo">Inventario</div>
        <div class="inventario-container">
            <!-- Sección de los ítems -->
            <div class="inventario-items">
    
            </div>
          
            <!-- Sección de información detallada -->
            <div class="informacion-item">
            </div>
          </div>`;
        SecionDiv.innerHTML = inventario;
        displayInventory()
    }
}