// Integrantes:
// Ayón Camacho Nedel Enrique
// Ignacio Sanchez Zulidany

let radio;
let divisiones;
let inputRadio, inputdivisiones, boton;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES); 
  textAlign(CENTER);
  noLoop();

  inputRadio = createInput();
  inputRadio.position(10, height + 10);
  inputRadio.attribute('placeholder', 'Radio del círculo');

  inputdivisiones = createInput();
  inputdivisiones.position(150, height + 10);
  inputdivisiones.attribute('placeholder', 'Cantidad de divisiones');

  boton = createButton('Dibujar círculo');
  boton.position(320, height + 10);
  boton.mousePressed(redibujar);
}

function redibujar() {
  radio = int(inputRadio.value());
  divisiones = int(inputdivisiones.value());
  redraw();
}

function draw() {
  background(255);
  
  if (!radio || !divisiones) {
    fill(0);
    text('Digite el radio y la cantidad de divisiones', width / 2, height / 2);
    return;
  }

  translate(width / 2, height / 2);
  stroke(0);

s  midpointCircle(0, 0, radio);

  // Dibujar líneas desde el centro
  for (let i = 0; i < divisiones; i++) {
    let angulo = 360 / divisiones * i;
    let x = cos(angulo) * radio;
    let y = sin(angulo) * radio;
    line(0, 0, x, y);
  }
}

function midpointCircle(xc, yc, r) {
  let x = 0;
  let y = r;
  let p = 1 - r;

  while (x <= y) {
    plotCirclePoints(xc, yc, x, y);
    x++;
    if (p < 0) {
      p += 2 * x + 1;
    } else {
      y--;
      p += 2 * (x - y) + 1;
    }
  }
}

function plotCirclePoints(xc, yc, x, y) {
  point(xc + x, yc + y);
  point(xc - x, yc + y);
  point(xc + x, yc - y);
  point(xc - x, yc - y);
  point(xc + y, yc + x);
  point(xc - y, yc + x);
  point(xc + y, yc - x);
  point(xc - y, yc - x);
}
