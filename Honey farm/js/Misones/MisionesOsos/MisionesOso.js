let MisionOsoActual = 0

const misionesOso = {
    m1: {
        id: 1,
        Nombre: "Comienzo",
        estado: "inactiva", // Puede ser: "inactiva", "activa", "completada"
        objetivos: [
            {
                Tipo: "Polen",
                Campo: "NP", // Cualquier campo
                ColorPolen: "NP", // Cualquier color
                Meta: 300,
                Progreso: 0,
                Terminda: false
            },
        ],
        Recompensa: { miel: 200, items: [] }
    },
    m2: {
        id: 2,
        Nombre: "Colores Básicos",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "NP", ColorPolen: "Blanco", Meta: 200, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "NP", ColorPolen: "Rojo", Meta: 200, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "NP", ColorPolen: "Azul", Meta: 200, Progreso: 0, Terminda: false },
        ],
        Recompensa: { miel: 400, items: [] }
    },
    m3: {
        id: 3,
        Nombre: "Savor dulce",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "Campo De Piñas", ColorPolen: "NP", Meta: 800, Progreso: 0, Terminda: false }
        ],
        Recompensa: { miel: 600, items: [] }
    },
    m4: {
        id: 4,
        Nombre: "Un Nuevo Campo",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "Campo De Tomate", ColorPolen: "Rojo", Meta: 800, Progreso: 0, Terminda: false }
        ],
        Recompensa: { miel: 700, items: [{ Nombre: "Frezas", Cantidad: 5 }] }
    },
    m5: {
        id: 5,
        Nombre: "Aguacates Verdes",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "Campo De Agucante", ColorPolen: "Azul", Meta: 1000, Progreso: 0, Terminda: false }
        ],
        Recompensa: { miel: 850, items: [{ Nombre: "Uvas", Cantidad: 5 }] }
    },
    m6: {
        id: 6,
        Nombre: "Sabores Frutales",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "Campo De Piñas", ColorPolen: "Azul", Meta: 300, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "Campo De Papas", ColorPolen: "Rojo", Meta: 700, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "Campo De Flores", ColorPolen: "Blanco", Meta: 1000, Progreso: 0, Terminda: false }
        ],
        Recompensa: { miel: 1500, items: [{ Nombre: "Piña", Cantidad: 7 }] }
    },
    m7: {
        id: 7,
        Nombre: "Campos Avanzados",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "Campo De Cerezas", ColorPolen: "NP", Meta: 4500, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "Campo De Ajo", ColorPolen: "NP", Meta: 4500, Progreso: 0, Terminda: false }
        ],
        Recompensa: { miel: 3000, items: [{ Nombre: "Royal", Cantidad: 2 }] }
    },
    m8: {
        id: 8,
        Nombre: "Genaracion",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "Campo De Agucante", ColorPolen: "NP", Meta: 5000, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "Campo De Sandia", ColorPolen: "NP", Meta: 10000, Progreso: 0, Terminda: false },
        ],
        Recompensa: { miel: 7500, items: [{ Nombre: "Galleta", Cantidad: 300 }] }
    },
    m9: {
        id: 9,
        Nombre: "Color mazana",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "Campo De Cerezas", ColorPolen: "NP", Meta: 14000, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "Campo De Tomate", ColorPolen: "NP", Meta: 7500, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "Campo De Flores", ColorPolen: "Rojo", Meta: 4000, Progreso: 0, Terminda: false },
        ],
        Recompensa: { miel: 12000, items: [{ Nombre: "Galleta", Cantidad: 400 }, { Nombre: "Frezas", Cantidad: 10 }] }
    },
    m10: {
        id: 10,
        Nombre: "La fuente",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "Campo De Ajo", ColorPolen: "NP", Meta: 25000, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "Campo De Papas", ColorPolen: "NP", Meta: 10000, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "Campo De Piñas", ColorPolen: "NP", Meta: 10000, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "Campo De Flores", ColorPolen: "NP", Meta: 5000, Progreso: 0, Terminda: false },
        ],
        Recompensa: { miel: 18000, items: [{ Nombre: "Galleta", Cantidad: 600 }, { Nombre: "Royal", Cantidad: 1 }, { Nombre: "Piña", Cantidad: 5 },] }
    },
    m11: {
        id: 11,
        Nombre: "Recopilando",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "NP", ColorPolen: "NP", Meta: 300000, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "NP", ColorPolen: "Rojo", Meta: 75000, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "NP", ColorPolen: "Azul", Meta: 75000, Progreso: 0, Terminda: false },
            { Tipo: "Polen", Campo: "NP", ColorPolen: "Blanco", Meta: 75000, Progreso: 0, Terminda: false },
        ],
        Recompensa: {
            miel: 35000,
            items: [
                { Nombre: "Galleta", Cantidad: 1000 },
                { Nombre: "Piña", Cantidad: 25 },
                { Nombre: "Frezas", Cantidad: 25 },
                { Nombre: "Uvas", Cantidad: 25 },
                { Nombre: "Royal", Cantidad: 5 },
            ]
        }
    },
    m12: {
        id: 12,
        Nombre: "Ya terminaste todas misiones :3 ",
        estado: "inactiva",
        objetivos: [
            { Tipo: "Polen", Campo: "NP", ColorPolen: "NP", Meta: (1 * Infinity) , Progreso: 0, Terminda: false },
        ],
        Recompensa: {
            miel: 1000,
            items: [
                { Nombre: "", Cantidad: NaN },
            ]
        }
    },
};
