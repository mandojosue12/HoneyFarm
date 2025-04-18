const Campos = {
    //🥔🍍🍅🥑💐🍒🧄🍉
    Papas: {
        Nombre: 'Campo De Papas',
        icon: '🥔',
        Activo: true,
        Rojo: 0.25,
        Azul: 0.25,
        Blanco: 0.5,
        Flores: { N2: 0.1 },
        zona: 0
    },
    Piñas: {
        Nombre: 'Campo De Piñas',
        icon: '🍍',
        Activo: false,
        Rojo: 0.1,
        Azul: 0.1,
        Blanco: 0.8,
        Flores: { N2: 0.15 },
        zona: 0
    },
    Tomate: {
        Nombre: 'Campo De Tomate',
        icon: '🍅',
        Activo: false,
        Rojo: 0.7,
        Azul: 0,
        Blanco: 0.3,
        Flores: { N2: 0.15 },
        zona: 0
    },
    Agucante: {
        Nombre: 'Campo De Agucante',
        icon: '🥑',
        Activo: false,
        Rojo: 0,
        Azul: 0.7,
        Blanco: 0.3,
        Flores: { N2: 0.15 },
        zona: 0
    },
    Flores: {
        Nombre: 'Campo De Flores',
        icon: '💐',
        Activo: false,
        Rojo: 0.4,
        Azul: 0.4,
        Blanco: 0.2,
        Flores: { N2: 0.4 },
        zona: 4
    },
    Cerezas: {
        Nombre: 'Campo De Cerezas',
        icon: '🍒',
        Activo: false,
        Rojo: 0.8,
        Azul: 0,
        Blanco: 0.2,
        Flores: { N2: 0.6, N3: 0.1 },
        zona: 6
    },
    Ajo: {
        Nombre: 'Campo De Ajo',
        icon: '🧄',
        Activo: false,
        Rojo: 0,
        Azul: 0,
        Blanco: 1,
        Flores: { N2: 0.6, N3: 0.1 },
        zona: 6
    },
    Sandia: {
        Nombre: 'Campo De Sandia',
        icon: '🍉',
        Activo: false,
        Rojo: 0,
        Azul: 0.8,
        Blanco: 0.2,
        Flores: { N2: 0.6, N3: 0.1 },
        zona: 6
    }

}


function obtenerFlor(campo) {
    // Generar un número aleatorio entre 0 y 1
    const aleatorioColor = Math.random();
    let color;

    // Determinar el color basado en las probabilidades
    if (aleatorioColor < campo.Rojo) {
        color = '🌹';
    } else if (aleatorioColor < campo.Rojo + campo.Azul) {
        color = '💠';
    } else {
        color = '🌼';
    }

    // Determinar el nivel de la flor
    const aleatorioNivel = Math.random();
    let nivel = 1; // Nivel por defecto es 1 si no se cumple ninguna condición superior

    // Revisar niveles definidos en el campo
    for (let key in campo.Flores) {
        const probabilidad = campo.Flores[key];
        const nivelActual = parseInt(key.slice(1)); // Extraer el número del nivel (e.g., "N2" => 2)

        if (aleatorioNivel < probabilidad) {
            nivel = nivelActual; // Actualizar el nivel si el número aleatorio es menor a la probabilidad
        }
    }
    // Retornar el resultado.
    return { color, nivel };
}


// Mostrar y ocultar el menú
function toggleMenu(cerrar = false) {
    const interfaz = document.getElementById('interfaz-campos');
    if (interfaz.style.display === 'none' && !cerrar) {
        interfaz.style.display = 'block';
        AbriryCerraSecionA(true)
        cargarCamposEnMenu(); // Actualizar la lista de campos al abrir
    } else {
        interfaz.style.display = 'none';
    }
}
let TiempoCampo = 0;
// Cargar los campos en el menú
function cargarCamposEnMenu(no = false) {
    const lista = document.getElementById('campos-lista');
    lista.innerHTML = ''; // Limpiar contenido previo
    const ahora = Date.now();

    if (ahora >= TiempoCampo + 90000) {
        for (const key in Campos) {
            const campo = Campos[key];
            if (campo.zona <= Colmena.length && !campo.Activo) {
                const boton = document.createElement('button');
                boton.textContent = `${campo.Nombre} ${campo.icon}`;
                boton.onclick = () => seleccionarCampo(key, no); // Asignar evento de clic
                lista.appendChild(boton);
            }
        }
    } else {
        // Tiempo restante en segundos
        const TiempoEspera = Math.ceil((TiempoCampo + 90000 - ahora) / 1000);
        const boton = document.createElement('button');
        boton.textContent = `Espera ${TiempoEspera}s para cambiar de campo`;
        lista.appendChild(boton);
    }
}

// Cambiar el campo activo
function seleccionarCampo(campoSeleccionado, no) {
    // Primero, activar todos los campos
    for (const key in Campos) {
        Campos[key].Activo = true;
    }

    // Luego, seleccionar el campo especificado como único activo
    for (const key in Campos) {
        Campos[key].Activo = key === campoSeleccionado;
        if(!no){
            TiempoCampo = Date.now()
        }

    }

    generarFlores(Cantflor ** 2)
    toggleMenu();
}


// Detectar la tecla "M"
