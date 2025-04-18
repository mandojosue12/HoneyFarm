const ProbabilidadesBase = {
    //Basica: { Basica: 30, Comun: 20, Epica: 5, Lengendaria: 1 },
    Basica: { Basica: 100, Comun: 20, Epica: 5, Lengendaria: 1},
    Royal: { Basica: 0, Comun: 100, Epica: 30, Lengendaria: 5 },
    Default: { Basica: 0, Comun: 0, Epica: 0, Lengendaria: 100 }
};


function GenerarAbeja(Panel, provedor) {
    const posibilidades = Vericadordevariables(provedor);
    const alatorio = Math.random() * 100;
    let acumulado = 0;

    if ((acumulado += posibilidades.Lengendaria) >= alatorio) {
        elegirAbeja(Panel, null, "epica")

        // Ejemplo: Abeja legendaria
    } else if ((acumulado += posibilidades.Epica) >= alatorio) {
        elegirAbeja(Panel, null, "epica")

    } else if ((acumulado += posibilidades.Comun) >= alatorio) {
        elegirAbeja(Panel)
    } else {
        elegirAbeja(Panel, "basica"); // Abeja básica por defecto
    }
}

function Vericadordevariables(provedor) {
    if (!provedor || typeof provedor !== "string") {
        provedor = "Default";
    }
    return ProbabilidadesBase[provedor] || ProbabilidadesBase.Default;
}

function crearAbeja(Datos) {
    const Panel = Colmena.find(obj => obj.id === Datos.PanelID);
    let DatoExtra = {
        abeja: Datos.id
    }
    const varAbeja = styloabeja();
    Datos.DivAbeja = varAbeja
    if(Panel.abeja !== null){Panel.abeja.Muerte()}
    const nuevaAbeja = new Abeja(Datos);
    Panel.abeja = nuevaAbeja;
    Panel.Nombre = Datos.Nombre;
    
    Panel.DatoAbeja = DatoExtra;
    mundo.appendChild(varAbeja);

    const texto = `Tienes tu nueva abeja llamada ` + Datos.Nombre;
    AgregarNotificacion("azul", texto)
}

const Abejas = {
        Prueba(Panel) {
        const datos = {
            Recolecion: 10, // Capacidad de recolección de recursos
            Convercion: 100, // Velocidad de conversión de recursos
            Velocidad: 200, // Velocidad de movimiento
            PanelID: Panel.id, // Identificador del panel asignado
            Nivel: Panel.nivel, // Nivel del panel asignado
            DivAbeja: null, // Elemento HTML asociado (inicialmente null)
            Nombre: "Abeja Prueba", // Nombre de la abeja
            Color: "blanca", // Color representativo de la abeja
            Fichas: [{ funcion: FichaAmplificador, tiempo: 3, usable: true }], // Habilidades especiales
            id: "Prueba" // Identificador único
        };
        crearAbeja(datos); // Llama a la función para crear la abeja
    },
    Amplicadora(Panel) {
        const datos = {
            Recolecion: 7,
            Convercion: 60, 
            Velocidad: 70, 
            PanelID: Panel.id,
            Nivel: Panel.nivel, 
            DivAbeja: null,
            Nombre: "Abeja Amplicadora", 
            Color: "blanca",
            Fichas: [{ funcion: FichaAmplificador, tiempo: 18, usable: true }, { funcion: FichaAmorAbeja, tiempo: 14, usable: true }], // Habilidades especiales
            id: "Amplicadora"
        };
        crearAbeja(datos); 
    },
    Miel(Panel) {
        const datos = {
            Recolecion: 2,
            Convercion: 100, 
            Velocidad: 75, 
            PanelID: Panel.id,
            Nivel: Panel.nivel, 
            DivAbeja: null,
            Nombre: "Abeja De Miel", 
            Color: "blanca",
            Fichas: [{ funcion: FichaConver, tiempo: 18, usable: true }], // Habilidades especiales
            id: "Miel"
        };
        crearAbeja(datos); 
    },
    Fuego(Panel) {
        const datos = {
            Recolecion: 3,
            Convercion: 55, 
            Velocidad: 87, 
            PanelID: Panel.id,
            Nivel: Panel.nivel, 
            DivAbeja: null,
            Nombre: "Abeja De Fuego", 
            Color: "roja",
            Fichas: [{ funcion: FichaPertado, tiempo: 20, usable: true }, { funcion: FichaFuego, tiempo: 13, usable: true }], // Habilidades especiales
            id: "Fuego"
        };
        crearAbeja(datos); 
    },
    Critica(Panel) {
        const datos = {
            Recolecion: 3,
            Convercion: 60, 
            Velocidad: 84, 
            PanelID: Panel.id, 
            Nivel: Panel.nivel, 
            DivAbeja: null,
            Nombre: "Abeja Critica",
            Color: "roja", 
            Fichas: [{ funcion: FichaMasRojal, tiempo: 21, usable: true }, { funcion: FichaMasCritico, tiempo: 33
                , usable: true }],
            id: "Critica" 
        };
        crearAbeja(datos); 
    },
    Derrame(Panel) {
        const datos = {
            Recolecion: 4,
            Convercion: 80,
            Velocidad: 76,
            PanelID: Panel.id,  
            Nivel: Panel.nivel, 
            DivAbeja: null, 
            Nombre: "Abeja Derrame",
            Color: "azul",
            Fichas: [{ funcion: FichaGlobo, tiempo: 18, usable: true }, { funcion: FichaChapuson, tiempo: 13, usable: true }], // Habilidades especiales
            id: "Derrame" 
        };
        crearAbeja(datos);
    },
    Triste(Panel) {
        const datos = {
            Recolecion: 2,
            Convercion: 100,
            Velocidad: 70,
            PanelID: Panel.id,  
            Nivel: Panel.nivel, 
            DivAbeja: null, 
            Nombre: "Abeja Triste",
            Color: "azul",
            Fichas: [{ funcion: FichaMasAzul, tiempo: 20, usable: true }, { funcion: FichaLagrima, tiempo: 25, usable: true }], // Habilidades especiales
            id: "Triste" 
        };
        crearAbeja(datos);
    },

    fotografa(Panel) {
        const datos = {
            Recolecion: 2,
            Convercion: 63, 
            Velocidad: 50,
            PanelID: Panel.id,
            Nivel: Panel.nivel, 
            Nombre: "Abeja Fotografa",
            Color: "blanco", 
            Fichas: [{ funcion: FichaFoto, tiempo: 20, usable: true }], 
            id: "fotografa" 
        };
        crearAbeja(datos); // Llama a la función para crear la abeja
    },
    // Función para crear una abeja pertado con sus datos específicos
    pertado(Panel) {
        const datos = {
            Recolecion: 3,
            Convercion: 80,
            Velocidad: 30,
            PanelID: Panel.id,
            Nivel: Panel.nivel,
            DivAbeja: null,
            Nombre: "Abeja Pertado",
            Color: "rojo",
            Fichas: [{ funcion: FichaPertado, tiempo: 20, usable: true }],
            id: "pertado"
        };
        crearAbeja(datos);
    },
    // Función para crear una abeja Bob con sus datos específicos
    bob(Panel) {
        const datos = {
            Recolecion: 3,
            Convercion: 60,
            Velocidad: 40,
            PanelID: Panel.id,
            Nivel: Panel.nivel,
            DivAbeja: null,
            Nombre: "Abeja Bob",
            Color: "azul",
            Fichas: [{ funcion: FichaGlobo, tiempo: 18, usable: true }],
            id: "bob"
        };
        crearAbeja(datos);
    },
    // Función para crear una abeja básica con sus datos específicos
    basica(Panel) {
        const datos = {
            Recolecion: 1,
            Convercion: 50,
            Velocidad: 30,
            PanelID: Panel.id,
            Nivel: Panel.nivel,
            DivAbeja: null,
            Nombre: "Abeja Basica",
            Color: "incolor",
            Fichas: [], // No tiene habilidades especiales
            id: "basica"
        };
        crearAbeja(datos);
    },
    // Función para crear una abeja roja con sus datos específicos
    roja(Panel) {
        const datos = {
            Recolecion: 2,
            Convercion: 70,
            Velocidad: 35,
            PanelID: Panel.id,
            Nivel: Panel.nivel,
            DivAbeja: null,
            Nombre: "Abeja Roja",
            Color: "rojo",
            Fichas: [{ funcion: FichaMasRojal, tiempo: 21, usable: true }],
            id: "roja"
        };
        crearAbeja(datos);
    },
    // Función para crear una abeja azul con sus datos específicos
    azul(Panel) {
        const datos = {
            Recolecion: 2,
            Convercion: 55,
            Velocidad: 60,
            PanelID: Panel.id,
            Nivel: Panel.nivel,
            DivAbeja: null,
            Nombre: "Abeja Azul",
            Color: "azul",
            Fichas: [{ funcion: FichaMasAzul, tiempo: 21, usable: true }],
            id: "azul"
        };
        crearAbeja(datos);
    },
    blanca(Panel) {
        const datos = {
            Recolecion: 4,
            Convercion: 60,
            Velocidad: 45,
            PanelID: Panel.id,
            Nivel: Panel.nivel,
            DivAbeja: null,
            Nombre: "Abeja Blanca",
            Color: "blanco",
            Fichas: [{ funcion: FichaAmorAbeja, tiempo: 14, usable: true }],
            id: "blanca"
        };
        crearAbeja(datos);
    }
};

// Función para elegir una abeja común al azar
function elegirAbeja(Panel, Obligatoria = null, tipo = "comun") {
    if (Obligatoria) {
        if (Abejas[Obligatoria]) {
            Abejas[Obligatoria](Panel); // Llama directamente a la abeja obligatoria
        } else {
            console.error(`Abeja obligatoria "${Obligatoria}" no existe.`);
        }
        return;
    }

    // Listas de claves de abejas
    const abejasComun = ["fotografa", "pertado", "bob", "roja", "azul", "blanca"];
    const abejasEpicas = ["Triste", "Derrame", "Critica", "Fuego", "Miel", "Amplicadora"];

    // Seleccionar lista según el tipo
    const clavesAbejas = tipo === "epica" ? abejasEpicas : abejasComun;

    // Elegir una abeja al azar
    const indiceAleatorio = Math.floor(Math.random() * clavesAbejas.length);
    const abejaSeleccionada = clavesAbejas[indiceAleatorio];

    // Crear la abeja seleccionada desde el objeto Abejas
    if (Abejas[abejaSeleccionada]) {
        Abejas[abejaSeleccionada](Panel);
    } else {
        console.error(`Abeja seleccionada "${abejaSeleccionada}" no existe en el objeto Abejas.`);
    }
}




function styloabeja() {
    const varAbeja = document.createElement('div');
    const colmena = document.querySelector(".colmena");
    varAbeja.innerHTML = '🐝';
    varAbeja.className = 'abejas';
    varAbeja.style.left = `${Ubicacion(colmena).x}px`;
    varAbeja.style.top = `${Ubicacion(colmena).y}px`;
    varAbeja.style.fontSize = "25px";
    varAbeja.style.zIndex = "2";
    varAbeja.style.position = "absolute";
    return varAbeja;
}
