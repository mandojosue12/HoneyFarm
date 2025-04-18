const RarezaFicha = {
    //LA PRObilida la pososibildiad que toque un item es (1 entre Probalida)
    //el nombre del item
    //y si te encuentra en campo para qu toque y si pone "all" no importa el campo
    Normal: {
        Probalida: 250, item: [
            { Nombre: "Galleta", Campo: "all" },
            { Nombre: "Piña", Campo: ["Campo De Piñas"]}
        ]
    },
    Comun: {
        Probalida: 750, item: [
            { Nombre: "Uvas", Campo: ["Campo De Agucante, Campo De Sandia", "Campo De Flores"] },
            { Nombre: "Frezas", Campo: ["Campo De Tomate", "Campo De Cerezas", "Campo De Flores"]},
            { Nombre: "Piña", Campo: ["Campo De Ajo", "Campo De Papa"]},

        ]
    },
    PocoComun: {
        Probalida: 2000, item: [
            { Nombre: "Royal", Campo: "all"}
        ]
    },
    Raro: {
        Probalida: 5000, item: [
            { Nombre: "", Campo: "" }
        ]
    },
    Epico: {
        Probalida: 10000, item: [
            { Nombre: "", Campo: "" }
        ]
    },
    Lendario: {
        Probalida: 50000, item: [
            { Nombre: "", Campo: "" }
        ]
    },
}
