let rebanadas = 8;
let radios = 80;
let input, boton;

function setup() {
    createCanvas(900, 300);
    background(255);
    textFont("Arial"); // <- Aplica Arial a todo el texto

    createP("Ingrese número de rebanadas:");
    input = createInput('8');
    boton = createButton("Actualizar");
    boton.mousePressed(actualizarRebanadas);
}

function draw() {
    background(255); // <- Limpia el canvas para evitar superposición

    fill(0);
    textSize(16);
    text("Integrantes: Ayón Camacho Nedel, Ignación Sanchez Zulidany", width / 2, 25);

    noFill(0);
    stroke(0);

    // Coordenadas 
    let centros = [
        createVector(150, 150),
        createVector(450, 150),
        createVector(750, 150)
    ];

    PizzaPuntoPendiente(centros[0], radios, rebanadas);
    PizzaDDA(centros[1], radios, rebanadas);
    PizzaBresenham(centros[2], radios, rebanadas);
}

function actualizarRebanadas() {
    let valor = int(input.value());
    if (valor > 0 && valor <= 360) {
        rebanadas = valor;
    }
}

function PizzaPuntoPendiente(centro, r, slices) {
    ellipse(centro.x, centro.y, r * 2, r * 2);
    text("Punto-Pendiente", centro.x - 40, centro.y + r + 20);
    for (let i = 0; i < slices; i++) {
        let angle = TWO_PI * i / slices;
        let x = centro.x + r * cos(angle);
        let y = centro.y + r * sin(angle);
        lineaPuntoPendiente(centro.x, centro.y, x, y);
    }
}

function PizzaDDA(centro, r, slices) {
    ellipse(centro.x, centro.y, r * 2, r * 2);
    text("DDA", centro.x - 20, centro.y + r + 20);
    for (let i = 0; i < slices; i++) {
        let angle = TWO_PI * i / slices;
        let x = centro.x + r * cos(angle);
        let y = centro.y + r * sin(angle);
        lineaDDA(centro.x, centro.y, x, y);
    }
}

function PizzaBresenham(centro, r, slices) {
    ellipse(centro.x, centro.y, r * 2, r * 2);
    text("Bresenham", centro.x - 35, centro.y + r + 20);
    for (let i = 0; i < slices; i++) {
        let angle = TWO_PI * i / slices;
        let x = centro.x + r * cos(angle);
        let y = centro.y + r * sin(angle);
        lineaBresenham(int(centro.x), int(centro.y), int(x), int(y));
    }
}

function lineaPuntoPendiente(x0, y0, x1, y1) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let m = dy / dx;

    if (abs(dx) > abs(dy)) {
        if (x0 > x1) {
            [x0, x1] = [x1, x0];
            [y0, y1] = [y1, y0];
        }
        for (let x = x0; x <= x1; x++) {
            let y = y0 + m * (x - x0);
            point(x, y);
        }
    } else {
        if (y0 > y1) {
            [x0, x1] = [x1, x0];
            [y0, y1] = [y1, y0];
        }
        for (let y = y0; y <= y1; y++) {
            let x = x0 + (y - y0) / m;
            point(x, y);
        }
    }
}

function lineaDDA(x0, y0, x1, y1) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let steps = max(abs(dx), abs(dy));
    let xInc = dx / steps;
    let yInc = dy / steps;

    let x = x0;
    let y = y0;

    for (let i = 0; i <= steps; i++) {
        point(x, y);
        x += xInc;
        y += yInc;
    }
}

function lineaBresenham(x0, y0, x1, y1) {
    let dx = abs(x1 - x0);
    let dy = abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        point(x0, y0);
        if (x0 === x1 && y0 === y1) break;
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}
