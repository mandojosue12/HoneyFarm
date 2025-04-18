// Variables de desplazamiento suave
let targetScrollX = window.scrollX;
let targetScrollY = window.scrollY;
let currentScrollX = window.scrollX;
let currentScrollY = window.scrollY;

function smoothScroll() {
    if (Math.abs(targetScrollX - currentScrollX) < 0.5 && Math.abs(targetScrollY - currentScrollY) < 0.5) {
        currentScrollX = targetScrollX;
        currentScrollY = targetScrollY;
    } else {
        currentScrollX += (targetScrollX - currentScrollX) * 0.1;
        currentScrollY += (targetScrollY - currentScrollY) * 0.1;
        window.scrollTo(currentScrollX, currentScrollY);
        requestAnimationFrame(smoothScroll);
    }
}

// Manejar teclas WASD para desplazamiento
const keySpeed = 50; // Velocidad del desplazamiento con teclas
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    switch (key) {
        case 'w': // Arriba
            targetScrollY -= keySpeed;
            break;
        case 'a': // Izquierda
            targetScrollX -= keySpeed;
            break;
        case 's': // Abajo
            targetScrollY += keySpeed;
            break;
        case 'd': // Derecha
            targetScrollX += keySpeed;
            break;
    }
    smoothScroll(); // Activar el desplazamiento suave
});

// Eventos de desplazamiento y coordenadas
const mundo = document.getElementById('Mundo');
const coordenadasDisplay = document.getElementById('coordenadas');
let mausPosition = { x: 0, y: 0 };
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

document.addEventListener('mousemove', (e) => {
    // Muestra las coordenadas del mouse
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    mausPosition = { x: mouseX + 5, y: mouseY - 10}
    coordenadasDisplay.textContent = `X: ${mouseX}, Y: ${mouseY}`;
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - mundo.offsetLeft;
    const y = e.pageY - mundo.offsetTop;
    const walkX = (x - startX) * 1.1;
    const walkY = (y - startY) * 1.1;

    targetScrollX = scrollLeft - walkX;
    targetScrollY = scrollTop - walkY;

    smoothScroll();
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

/// Variables para controlar el movimiento del desplazamiento por bordes
let edgeScrollInterval = null;
let isMoving = false;


// Configuración de los bordes y la velocidad
const screenMargin = 50; // Distancia al borde para activar el movimiento
const speed = 10; // Velocidad del desplazamiento

document.addEventListener('mousemove', (e) => {
    return
    if (e.clientX < screenMargin) {
        if (!isMoving) startEdgeScroll("left");
    } else if (e.clientX > window.innerWidth - screenMargin) {
        if (!isMoving) startEdgeScroll("right");
    } else if (e.clientY < screenMargin) {
        if (!isMoving) startEdgeScroll("up");
    } else if (e.clientY > window.innerHeight - screenMargin) {
        if (!isMoving) startEdgeScroll("down");
    } else {
        stopEdgeScroll();
    }
});

// Función para iniciar el desplazamiento continuo en una dirección
function startEdgeScroll(direction) {
    isMoving = true;
    edgeScrollInterval = setInterval(() => {
        switch (direction) {
            case "left":
                window.scrollBy(-speed, 0);
                break;
            case "right":
                window.scrollBy(speed, 0);
                break;
            case "up":
                window.scrollBy(0, -speed);
                break;
            case "down":
                window.scrollBy(0, speed);
                break;
        }
    }, 16); // Aproximadamente 60 FPS
}

// Función para detener el desplazamiento
function stopEdgeScroll() {
    if (edgeScrollInterval) {
        clearInterval(edgeScrollInterval);
        edgeScrollInterval = null;
        isMoving = false;
    }
}

// Detener el desplazamiento si el mouse abandona la ventana
document.addEventListener('mouseleave', () => {
    stopEdgeScroll();
});
