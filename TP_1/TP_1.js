// TP#1
//https://youtu.be/6kGJtyxHJYE

// VARIABLES GLOBALES ----------------------------------------------------------
let referencia;
let columnas = 7;           // Cantidad de columnas en la grilla
let filas = 7;              // Cantidad de filas en la grilla
let radio = 15;             // Radio base de los anillos

//variables de interacción
let palpitacion = false;       
let colorRandomizado = false;  
let invertido = false;          

let randomClaro;          
let randomOscuro;         

// SETUP ----------------------------------------------------------------------
function preload() {
  referencia = loadImage("data/F_4.jpg"); // Carga la imagen antes de setup
}

function setup() {
  createCanvas(800, 400);                       
  referencia.resize(width/2, height);  

  reseteo(); // Inicializa variables a estado inicial
}

// DRAW -----------------------------------------------------------------------
function draw() {
  background('#BF0D0D'); // Fondo rojo oscuro
  image(referencia, 0, 0);

  //márgenes donde se dibujan los anillos
  let minX = width / 2 + 30;
  let maxX = width - 30;
  let minY = 30;
  let maxY = height - 30;

  // Grilla de anillos
  for (let i = 0; i < columnas; i++) { // i es para recorrer las columnas
    for (let j = 0; j < filas; j++) {  // j es para recorrer las filas

      // Calcula coordenadas mapeadas para cada anillo
      let cx = map(i, 0, columnas - 1, minX, maxX);
      let cy = map(j, 0, filas - 1, minY, maxY);

      // Verifica si el mouse está sobre el anillo para ajustar transparencia
      let encima = mouseEncima(cx, cy, radio);
      let transparencia = encima
        ? map(dist(mouseX, mouseY, cx, cy), 0, radio, 255, 100)
        : 255;

      // Controla efecto palpitación 
      let tamañoAnillo = radio;
      if (palpitacion) {
        tamañoAnillo += sin(frameCount * 0.1) * 5;  // Oscila entre +5 y -5
      }

      // Establece color y dibuja el anillo
      stroke(colorAnillos(i, j), transparencia);
      noFill();
      strokeWeight(2);
      anillos(cx, cy, tamañoAnillo);
    }
  }
}

// FUNCIONES PROPIAS ----------------------------------------------------------

// Dibuja un anillo
function anillos(x, y, r) {
  ellipse(x, y, r*2, r*2);
}

// Determina el color del anillo según la posición i,j
function colorAnillos(i, j) {
  let claro, oscuro;

  if (colorRandomizado) {
    claro = randomClaro;
    oscuro = randomOscuro;
  } else {
    // Colores base
    claro = color(34, 162, 161);
    oscuro = color(20, 100, 100);
  }

  // Invierte colores si está activo
  if (invertido) {
    let temp = claro;
    claro = oscuro;
    oscuro = temp;
  }

  // Alterna color según suma de índices
  if ((i + j) % 2 == 0) {
    return oscuro;
  } else {
    return claro;
  }
}

// Función para detectar si el mouse está sobre un círculo
function mouseEncima(x, y, r) {
  return dist(mouseX, mouseY, x, y) < r;
}

// Eventos de teclado
function keyPressed() {
  if (key === 'r' || key === 'R') {
    reseteo();
  }
  if (key === 'p' || key === 'P') {
    palpitacion = !palpitacion;
  }
  if (key === 'c' || key === 'C') {
    colorRandomizado = true;
    invertido = false;
    randomClaro = color(random(100, 255), random(100, 255), random(100, 255));
    randomOscuro = color(random(0, 100), random(0, 100), random(0, 100));
  }
  if (key === 'i' || key === 'I') {
    invertido = !invertido;
  }
}

// Función que reinicia las variables a su estado original
function reseteo() {
  palpitacion = false;
  colorRandomizado = false;
  invertido = false;
}
