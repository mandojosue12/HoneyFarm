class Abeja {
    constructor(Dato) {

        this.recoleccion = Dato.Recolecion;
        this.velocidad = Dato.Velocidad;
        this.conversion = Dato.Convercion;
        this.polen = 0;

        this.DivAbeja = Dato.DivAbeja;
        this.colmena = document.querySelector(".colmena");
        this.Almacen = document.querySelector(".mochila");
        this.PanelID = Dato.PanelID;

        this.color = Dato.Color;
        this.nivel = Dato.Nivel;

        this.Acciones = [];
        this.Muerte2 = setInterval(() => this.Hacerabeja(), 300);
        this.Muerte3 = false;
        this.Fillas = Dato.Fichas;

        this.farmeado = false;
        this.Convirtiendo = false;
        this.lleno = false;
    }
    Frecolecion() {
        return parseFloat(((this.recoleccion + (this.recoleccion * (this.nivel * 0.5))) * EstRecolecionAbeja()).toFixed(2));
    }
    FCovercion() {
        let BoniAzul = 1;
        if(this.color === "azul") BoniAzul = EstConvercionAzul()
        return Math.round((this.conversion + (this.conversion * (this.nivel * 0.5))) * EstConvercion() * BoniAzul);

    }
    FVelocidad() {
        return parseFloat((this.velocidad + (this.velocidad * (this.nivel * 0.15))).toFixed(2));
    }
    Muerte(){
        clearInterval(this.Muerte2)
        this.Muerte3 = true;
        this.CancelarAcciones()
    }
    Hacerabeja() {
        if(this.Muerte3) return
        if (!this.Convirtiendo) {
            if (ModoCovirtiendo && EspacioActual > 0) {
                this.Convertir();
            } else if (!this.farmeado) {
                this.Farmear();
            }
        }
        if (this.Convirtiendo && EspacioActual === 0 && !this.lleno || !ModoCovirtiendo && EspacioActual > 0 && this.lleno && !ModoCovirtiendo2|| !ModoCovirtiendo && this.Convirtiendo && !this.lleno) {
            this.cancelarMovimiento()
            this.CancelarAcciones()
        }
    }


    Farmear() {
        if (!this.farmeado && EspacioActual < EspacioMaximo()) {
            this.farmeado = true;
            const flor = this.BuscarFlor();
            if (flor) {
                let tiempollegar = this.Moverabeja(Ubicacion(flor));

                const timeoutId = setTimeout(() => {
                    this.RecolectarPolen(flor);
                    this.RemoverAccion(timeoutId); // Remover el temporizador después de ejecutarse
                }, tiempollegar * 1000);

                this.Acciones.push(timeoutId);

            }
        }
    }
    RecolectarPolen(flor) {
        recolectarPolenDeFlor([flor], 1, Ubicacion(this.DivAbeja), `Polen: *${this.Frecolecion()}`);
        Colmena.forEach(element => {
            if (element.id === this.PanelID) {
                element.xp += 1;
                if (element.xp >= element.xpMax) {
                    element.xpMax *= 2
                    element.nivel += 1
                    this.nivel += 1
                    const texto = `🎉Tu ${element.Nombre} a subido al nivel ${element.nivel}🎉`
                    AgregarNotificacion("azul", texto) 
                }
                return
            }
        });

        this.GenerarFicha()

        setTimeout(() => {
            this.farmeado = false;
            this.Hacerabeja()

        }, 1000);

    }
    GenerarFicha() {
        let abejadata = {
            nivel: this.nivel,
            div: this.DivAbeja
            
        };
        let index = this.Fillas.findIndex(element => element.usable);

        if (index !== -1) {
            let element = this.Fillas[index];
            element.funcion(abejadata);
            element.usable = false;
            setTimeout(() => {
                element.usable = true;
            }, element.tiempo * 1000);
        
        }
        
    }
    BuscarFlor() {
        const flores = document.querySelectorAll('.flores');

        const abejaPos = Ubicacion(this.DivAbeja);
        const radio = 150;

        let floresEnRango = [];
        let florMasElejir = null;

        flores.forEach((flor) => {
            const florPos = Ubicacion(flor);
            const distancia = calcularDistancia(abejaPos, florPos);

            if (distancia < radio) {
                floresEnRango.push(flor);
            }

            florMasElejir = flores[Math.floor(Math.random() * flores.length)]
        });
        return floresEnRango.length > 0 ?
            floresEnRango[Math.floor(Math.random() * floresEnRango.length)] :
            florMasElejir;
    }
    Moverabeja(lugar) {

        const distancia = calcularDistancia(lugar, Ubicacion(this.DivAbeja));

        const duracionTransicion = distancia / this.velocidad;
        const direccionX = lugar.x > parseFloat(this.DivAbeja.style.left) ? 'derecha' : 'izquierda';

        // Activar transición
        this.DivAbeja.style.transition = `left ${duracionTransicion}s linear, top ${duracionTransicion}s linear`;
        this.DivAbeja.style.left = `${lugar.x - 12.5}px`;
        this.DivAbeja.style.top = `${lugar.y - 12.5}px`;
        this.DivAbeja.style.transform = direccionX === 'derecha' ? 'scaleX(-1)' : 'scaleX(1)';



        return duracionTransicion;
    }

    cancelarMovimiento() {
        const estilo = getComputedStyle(this.DivAbeja); // Estilo actual de la abeja

        // Extrae la posición real actual desde el estilo computado
        const leftActual = parseFloat(estilo.left);
        const topActual = parseFloat(estilo.top);

        // Detener la transición para evitar movimientos adicionales
        this.DivAbeja.style.transition = 'none';

        // Fija la posición actual para que no salte a su destino original
        this.DivAbeja.style.left = `${leftActual}px`;
        this.DivAbeja.style.top = `${topActual}px`;
    }

    CancelarAcciones() {
        // Recorre el arreglo y cancela cada temporizador
        this.Acciones.forEach(timeoutId => clearTimeout(timeoutId));
        this.Acciones = []; // Limpia el arreglo después de cancelar

        if (this.farmeado && this.Convirtiendo) { this.farmeado = false }
        if (EspacioActual === 0 && this.Convirtiendo) { this.Convirtiendo = false; this.lleno = false; }
        if (!ModoCovirtiendo && this.Convirtiendo) { this.Convirtiendo = false; this.lleno = false; }

        EspacioActual += this.polen
        this.polen = 0
        this.DivAbeja.innerHTML = '🐝';
        ActulizarHUB()
    }
    RemoverAccion(timeoutId) {
        // Elimina un temporizador específico del arreglo
        this.Acciones = this.Acciones.filter(id => id !== timeoutId);
    }
    Convertir() {
        if (!ModoCovirtiendo) { return }
        this.Convirtiendo = true;
        this.cancelarMovimiento()
        this.CancelarAcciones()
        //paso1
        let tiempollegar = this.Moverabeja(Ubicacion(this.Almacen));

        //paso 2
        const timeoutId2 = setTimeout(() => {
            this.lleno = true

            if (this.FCovercion(

            ) > EspacioActual) {
                this.polen = EspacioActual;
                EspacioActual = 0
            } else {
                this.polen = this.FCovercion()
                EspacioActual -= this.FCovercion()
            }
            ActulizarHUB()

            let tiempollegar2 = this.Moverabeja(Ubicacion(this.colmena));
            //paso 3
            const timeoutId3 = setTimeout(() => {
                this.Convertir2(this.polen)
                this.RemoverAccion(timeoutId3);
            }, (tiempollegar2 * 1000) + 1000);

            const timeoutId4 = setTimeout(() => {

                this.DivAbeja.innerHTML = '';
                this.RemoverAccion(timeoutId4);
            }, (tiempollegar2 * 1000));

            this.Acciones.push(timeoutId3);
            this.Acciones.push(timeoutId4);
            this.RemoverAccion(timeoutId2); // Remover el temporizador después de ejecutarse
        }, tiempollegar * 1000);
        this.Acciones.push(timeoutId2);
    }
    Convertir2(cantida) {
        this.lleno = false
        this.Convirtiendo = false;
        this.DivAbeja.innerHTML = '🐝';
        let Polen = JSON.parse(JSON.stringify(PolenV));
        
        AumentarMiel(cantida)
        Polen.Miel += cantida

        Polen.coordenadas = Ubicacion(this.DivAbeja)

        GenerarTextoDeFlotante(Polen)


        this.polen = 0


        ActulizarHUB()
        this.Hacerabeja()
    }
}
///Aparte








