SistemaBool = [
    inventoryOpen = false,
    HiveOpen = false,
    CampoOpen = false,
    ShopOpen = false,
    MisionOpen = false
]
document.addEventListener("keydown", function (event) {

    if (event.key === "e" || event.key === "E") {
        if (!SistemaBool.inventoryOpen) {
            setAllFalse()
        }
        AbriryCerrarInventario()
    }
    if (event.key === "c" || event.key === "C") {
        if (!SistemaBool.HiveOpen) {
            setAllFalse()
        }
        AbrirColmena()
    }
    if (event.key === "t" || event.key === "T") {
        if (!SistemaBool.ShopOpen) {
            setAllFalse()
        }
        AbrirTienda()
    }

    if (event.key === 'm' || event.key === 'M') {
        if (!SistemaBool.MisionOpen) {
            setAllFalse()
        }
        mostrarMisiones();
    }
    if (event.key === 'z' || event.key === 'Z') {
        if (!SistemaBool.MisionOpen) {
            setAllFalse()
        }
        toggleMenu();
    }
    if (event.key === 'p' || event.key === 'P') {
        if (!SistemaBool.MisionOpen) {
            setAllFalse()
        }
        CargarDiario();
    }
});

function setAllFalse() {
    for (let key in SistemaBool) {
        SistemaBool[key] = false;
    }
}
