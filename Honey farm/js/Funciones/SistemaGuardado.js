function guardarJuego() {

    const datosJuego = {
        inventory: inventory.map(item => ({
            Nombre: item.Nombre,
            cantidad: item.cantidad
        })),
        Miel: Miel,        
        RecolectoresUsuarios: Object.fromEntries(
            Object.entries(RecolectoresUsuarios).map(([key, value]) => [
                key,
                { Comprado: value.Comprado, Equipado: value.Equipado }
            ])
        ),
        MochilaUsuarios: Object.fromEntries(
            Object.entries(MochilaUsuarios).map(([key, value]) => [
                key,
                { Comprado: value.Comprado, Equipado: value.Equipado }
            ])
        ),
        AcesoriosAbeja: Object.fromEntries(
            Object.entries(AcesoriosAbeja).map(([key, value]) => [
                key,
                { Precio: value.Precio }
            ])
        ),
        MejorasItem: Object.fromEntries(
            Object.entries(MejorasItem).map(([key, value]) => [
                key,
                { Precio: value.Precio }
            ])
        ),
        Cantflor: Cantflor,
        limite: limite,
        EspacioActual: EspacioActual,
        Colmena: Colmena,
        CampoActivo: Object.keys(Campos).find(key => Campos[key].Activo),
        TiempoCampo: TiempoCampo,

        //misiones
        MisionesOso: Object.fromEntries(
            Object.entries(misionesOso).map(([key, value]) => [
                key,
                {
                    estado: value.estado,
                    objetivos: value.objetivos.map(obj => ({
                        Progreso: obj.Progreso,
                        Terminda: obj.Terminda
                    }))
                }
            ])
        ),
        MisionOsoActual: MisionOsoActual,
        // Agrega aquí otros datos que quieras guardar
        TiempoJugado: TiempoJugado,
        UltimoTiempoJugado: Date.now(),
        Diario: Diario

    };

    localStorage.setItem('datosJuego', JSON.stringify(datosJuego));
    console.log('Juego guardado exitosamente');
}
function cargarJuego() {
    const datosGuardados = localStorage.getItem('datosJuego');
    NotificacionActiva = false

    if (datosGuardados) {
        const datosJuego = JSON.parse(datosGuardados);
        inventory = []
        datosJuego.inventory.map(item => {
            SumarItem(item.Nombre, item.cantidad, false)
        });

        Miel = datosJuego.Miel       
        Object.entries(datosJuego.RecolectoresUsuarios).forEach(([key, value]) => {
            if (RecolectoresUsuarios[key]) {
                RecolectoresUsuarios[key].Comprado = value.Comprado;
                RecolectoresUsuarios[key].Equipado = value.Equipado;
            }
        });
        Object.entries(datosJuego.MochilaUsuarios).forEach(([key, value]) => {
            if (MochilaUsuarios[key]) {
                MochilaUsuarios[key].Comprado = value.Comprado;
                MochilaUsuarios[key].Equipado = value.Equipado;
            }
        });
        Object.entries(datosJuego.AcesoriosAbeja).forEach(([key, value]) => {
            if (AcesoriosAbeja[key]) {
                AcesoriosAbeja[key].Precio = value.Precio;
            }
        });
        Object.entries(datosJuego.MejorasItem).forEach(([key, value]) => {
            if (MejorasItem[key]) {
                MejorasItem[key].Precio = value.Precio;
            }
        });
        Cantflor = datosJuego.Cantflor;
        Colmena = datosJuego.Colmena

        limite = datosJuego.limite
        EspacioActual = datosJuego.EspacioActual
        console.log('Cargando');

        Object.entries(datosJuego.MisionesOso).forEach(([key, value]) => {
            if (misionesOso[key]) {
                misionesOso[key].estado = value.estado;
                misionesOso[key].objetivos.forEach((obj, index) => {
                    if (value.objetivos[index]) {
                        obj.Progreso = value.objetivos[index].Progreso;
                        obj.Terminda = value.objetivos[index].Terminda;
                    }
                });
            }
        });
        MisionOsoActual = datosJuego.MisionOsoActual

        CargarColmena()
        ActulizarMochila()
        ActulizarHUB() 
        TiempoCampo = datosJuego.TiempoCampo
        seleccionarCampo(datosJuego.CampoActivo, true)
        toggleMenu();

        TiempoJugado = datosJuego.TiempoJugado,
        UltimoTiempoJugado = datosJuego.UltimoTiempoJugado,
        Diario= datosJuego.Diario
    } else {
    }
    NotificacionActiva = true
}



function CargarColmena() {
    Colmena.forEach(element => {
        element.abeja = null
        elegirAbeja(element, element.DatoAbeja.abeja)
    });
}
window.addEventListener("load", cargarJuego);
window.addEventListener("beforeunload", guardarJuego);
SumarItem("Huevo Basico", 1, false)


