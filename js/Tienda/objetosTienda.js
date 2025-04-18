let RecolectoresUsuarios = {
    Cuchillo: { 
        icon: "🔪", 
        Tipo: "Basico", 
        ESTA: { Re: 1, Hit: "A", Time: 0.7}, 
        Precio: 0, 
        Comprado: true, 
        Equipado: true,
        descripcion: "1 por segundo"
    },
    Pala: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Re: 1, Hit: "BAB", Time: 1 }, 
        Precio: 200, 
        Comprado: false, 
        Equipado: false,
        descripcion: "3 por segundo"
    },
    Raztrillo: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Re: 2, Hit: "BCBCB\\nBCACA", Time: 1.5 }, 
        Precio: 1200, 
        Comprado: false, 
        Equipado: false,
        descripcion: "7-10 por segundo"
    },
    Tijeras: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Re: 7, Hit: "A", Time: 0.5 }, 
        Precio: 5000, 
        Comprado: false, 
        Equipado: false,
        descripcion: "14 por segundo"
    },
    Martillo: { 
        icon: "🔨", 
        Tipo: "Basico", 
        ESTA: { Re: 4, Hit: "BBB\\nBAB\\nBBB", Time: 1 }, 
        Precio: 11200, 
        Comprado: false, 
        Equipado: false,
        descripcion: "36 por segundo"
    },
    Esponja: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Re: 2, Hit: "BBB\\nBAB\\nBBB", Time: 0.2 }, 
        Precio: 50000, 
        Comprado: false, 
        Equipado: false,
        descripcion: "46 por segundo",
        zona: 8
    },
    Soplador: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Re: 4, Hit: "BBBBB\\nBBBABBB\\nBBBBB", Time: 1 }, 
        Precio: 172500, 
        Comprado: false, 
        Equipado: false,
        descripcion: "68 por segundo",
        zona: 8
    },
    Cortadora: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Re: 999, Hit: "A", Time: 0.6 }, 
        Precio: 560000, 
        Comprado: false, 
        Equipado: false,
        descripcion: "24 por segundo",
        zona: 8
    },
    Rastre: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Re: 7, Hit: "BCCCB\\nCBCBC\\nCCACC\\nCBCBC\\nBCCCB", Time: 0.5 }, 
        Precio: 940000, 
        Comprado: false, 
        Equipado: false,
        descripcion: "100 por segundo",
        zona: 8
    },
    Haspiradora: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Re: 7, Hit: "BBBBB\\nBBBBB\\nBBABB\\nBBBBB\\nBBBBB", Time: 1 }, 
        Precio: 2230000, 
        Comprado: false, 
        Equipado: false,
        descripcion: "178 por segundo",
        zona: 8
    },
    
};

let MochilaUsuarios = {
    Bolso: { 
        icon: "👝", 
        Tipo: "Basico", 
        ESTA: { Espacio: 300 }, 
        Precio: 0, 
        Comprado: true, 
        Equipado: true, 
        descripcion: "+300 de espacio"
    },
    Caja: { 
        icon: "📦", 
        Tipo: "Basico", 
        ESTA: { Espacio: 900 }, 
        Precio: 800, 
        Comprado: false, 
        Equipado: false, 
        descripcion: "+900 de espacio"
    },
    Mochila: { 
        icon: "🎒", 
        Tipo: "Basico", 
        ESTA: { Espacio: 3900 }, 
        Precio: 4500, 
        Comprado: false, 
        Equipado: false, 
        descripcion: "+3,900 de espacio"
    },
    Capsula: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Espacio: 9000 , ConvercionMas: 0.15}, 
        Precio: 12000, 
        Comprado: false, 
        Equipado: false, 
        descripcion: "+9,000 de espacio\n+15% de conversion"
    },
    Aislador: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Espacio: 30500, ConvercionMas: 0.30}, 
        Precio: 37300, 
        Comprado: false, 
        Equipado: false, 
        descripcion: "+30,500 de espacio\n+30% de convercion"
    },
    Cofre: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Espacio: 90000, ConvercionMas: 0.60}, 
        Precio: 180000, 
        Comprado: false, 
        Equipado: false, 
        descripcion: "+90,000 de espacio\n+60% de convercion",
        zona: 8

    },
    Canasta: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Espacio: 200000, ConvercionMas: 1}, 
        Precio: 500000, 
        Comprado: false, 
        Equipado: false, 
        descripcion: "+200,000 de espacio\n+100% de convercion",
        zona: 8

    },
    Etheria: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Espacio: 450000, ConvercionMas: 1.2}, 
        Precio: 1300000, 
        Comprado: false, 
        Equipado: false, 
        descripcion: "+450,000 de espacio\n+120% de convercion",
        zona: 8
    },
    Relicor: { 
        icon: "🚫", 
        Tipo: "Basico", 
        ESTA: { Espacio: 750000, ConvercionMas: 1.5}, 
        Precio: 4500000, 
        Comprado: false, 
        Equipado: false, 
        descripcion: "+750,000 de espacio\n+150% de convercion",
        zona: 8
    },
};

let AcesoriosAbeja = {
    HuevoBasico: { icon: "🥚", item: "Huevo Basico", Precio: 300, Inflacion: 2.15, maximo: 10000000},
    Royal: { icon: "👑", item: "Royal", Precio: 500, Inflacion: 2.5, maximo: 10000000},
    Galleta: { icon: "🍪", item: "Galleta", Precio: 100, Inflacion: 1.7, maximo: 10000}
}

let MejorasItem = {
    Campo: { icon: "🌼", descripcion: "Aumenta la cantidad de flores que hay en el campo", function: MejorarCantFlor, Precio: 100000, Inflacion: 10, Maximo: false},
    //MuasHover: { icon: "🌼", descripcion: "Aumenta la cantidad de flores que hay en el campo", function: MejorarCantFlor, Precio: 100000, Inflacion: 10, Maximo: false,
    //     Materiales: []},
}