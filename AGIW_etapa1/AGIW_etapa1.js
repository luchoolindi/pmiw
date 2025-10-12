//https://youtu.be/8h9WSCCrw6E

let pantallas = [];
let pantalla = 0;
let hilo = false;
let esconder = false;

// Dimensiones de los botones
let botonAncho = 200;
let botonAlto = 60;
let margen = 50;

// Dimensiones del botón de reinicio pantalla 12
let botonReinicioAncho = 150;
let botonReinicioAlto = 50;

function preload() {
  for (let i = 0; i <= 12; i++) {
    pantallas[i] = loadImage("data/pantalla" + i + ".png");
  }
}

function setup() {
  createCanvas(640, 480);
  textSize(18);
  fill(255);
  textWrap(WORD);
}

function draw() {
  background(0);
  if (pantallas[pantalla]) image(pantallas[pantalla], 0, 0, width, height);

  // PANTALLA 1
  if (pantalla === 1) {
    drawTextoPantalla1();
    drawBotonesPantalla1();
  }

  // PANTALLA 2
  if (pantalla === 2) {
    drawTextoPantalla2();
    drawBotonContinuar(2);
  }

  // PANTALLA 3
  if (pantalla === 3) {
    drawTextoPantalla3();
    drawBotonContinuar(3);
  }

  // PANTALLA 4
  if (pantalla === 4) {
    drawTextoPantalla4();
    drawBotonesPantalla4();
  }

  // PANTALLA 5
  if (pantalla === 5) {
    drawTextoPantalla5();
    drawBotonContinuar(5);
  }

  // PANTALLA 6
  if (pantalla === 6) {
    drawTextoPantalla6();
    drawBotonPantalla6();
  }

  // PANTALLA 7
  if (pantalla === 7) {
    drawTextoPantalla7();
    drawBotonPantalla7();
  }

  // PANTALLA 8
  if (pantalla === 8) {
    drawTextoPantalla8();
    drawBotonPantalla8();
  }

  // PANTALLA 9
  if (pantalla === 9) {
    drawTextoPantalla9();
    drawBotonPantalla9();
  }

  // PANTALLA 10
  if (pantalla === 10) {
    drawTextoPantalla10();
    drawBotonPantalla10();
  }

  // PANTALLA 11
  if (pantalla === 11) {
    drawTextoPantalla11();
    drawBotonPantalla11();
  }

  // PANTALLA 12
  if (pantalla === 12) drawBotonReinicio();
}

// -----------------------------------------------------
// Textos pantallas
function drawTextoPantalla1() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("Ariadne le ofrece a Teseo un hilo dorado para no perderse", width / 2, 10);
}

function drawTextoPantalla2() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("Teseo utiliza el hilo para trazar un camino", width / 2, 10);
}

function drawTextoPantalla3() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("Teseo, avanza a ciegas por el laberinto", width / 2, 10);
}

function drawTextoPantalla4() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("Seguir es peligroso, hay un monstruo adelante", width / 2, 10);
}

function drawTextoPantalla5() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("Decidiste resguardarte del monstruo", width / 2, 10);
}

function drawTextoPantalla6() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("Lograste derrotar al monstruo sin esfuerzo", width / 2, 10);
}

function drawTextoPantalla7() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("Llegaste hasta la guarida del minotauro...", width / 2, 10);
}

function drawTextoPantalla8() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("La bestia era de un tamaño colosal y parecía muy agresiva", width / 2, 10);
}

function drawTextoPantalla9() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("Lamentablemente no llegaste a defenderte de los ataques del minotauro", width / 2, 10);
}

function drawTextoPantalla10() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("Lograste vencer al minotauro, y gracias al hilo, pudiste salir", width / 2, 10);
}

function drawTextoPantalla11() {
  fill(255);
  textFont('Georgia');
  textSize(20);
  textAlign(CENTER, TOP);
  text("Lograste vencer al minotauro pero a qué precio...", width / 2, 10);
}

// -----------------------------------------------------
// dos opciones
function drawBotonesPantalla1() {
  fill(0, 150, 0);
  rect(margen, height - botonAlto - margen, botonAncho, botonAlto, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Aceptar hilo", margen + botonAncho / 2, height - botonAlto / 2 - margen);

  fill(150, 0, 0);
  rect(width - botonAncho - margen, height - botonAlto - margen, botonAncho, botonAlto, 10);
  fill(255);
  text("Rechazar hilo", width - botonAncho / 2 - margen, height - botonAlto / 2 - margen);
}

function drawBotonesPantalla4() {
  fill(0, 150, 0);
  rect(margen, height - botonAlto - margen, botonAncho, botonAlto, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Pelear", margen + botonAncho / 2, height - botonAlto / 2 - margen);

  fill(150, 0, 0);
  rect(width - botonAncho - margen, height - botonAlto - margen, botonAncho, botonAlto, 10);
  fill(255);
  text("Esconderse", width - botonAncho / 2 - margen, height - botonAlto / 2 - margen);
}

// -----------------------------------------------------
function drawBotonContinuar(p) {
  let w = 160;
  let h = 40;
  let x = width - w - 20;
  let y = height - h - 20;

  fill(0, 150, 150, 200);
  rect(x, y, w, h, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Click para continuar", x + w / 2, y + h / 2);
}

function drawBotonPantalla6() {
  let w = 220;
  let h = 40;
  let x = width - w - 20;
  let y = height - h - 20;

  fill(0, 150, 150, 200);
  rect(x, y, w, h, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Agarrar el escudo y seguir", x + w / 2, y + h / 2);
}

function drawBotonPantalla7() {
  let w = 180;
  let h = 40;
  let x = width - w - 20;
  let y = height - h - 20;

  fill(0, 120, 200, 220);
  rect(x, y, w, h, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Click para entrar", x + w / 2, y + h / 2);
}
//pantalla8boton
function drawBotonPantalla8() {
  let x = width / 2;
  let y = height / 1.5;
  let r = 60;

  fill(120, 30, 30, 230);
  noStroke();
  ellipse(x, y, r * 2, r * 2);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Pelear", x, y + 2);
}

// Botón pantalla 9
function drawBotonPantalla9() {
  let w = 180;
  let h = 40;
  let x = width - w - 20;
  let y = height - h - 20;

  fill(150, 0, 0, 220);
  rect(x, y, w, h, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Moriste", x + w / 2, y + h / 2);
}

// Botón pantalla 10
function drawBotonPantalla10() {
  let w = 220;
  let h = 40;
  let x = width - w - 20;
  let y = height - h - 20;

  fill(0, 150, 150, 200);
  rect(x, y, w, h, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Volver con Ariadna", x + w / 2, y + h / 2);
}

// Botón pantalla 11
function drawBotonPantalla11() {
  let w = 220;
  let h = 40;
  let x = width - w - 20;
  let y = height - h - 20;

  fill(150, 150, 0, 220);
  rect(x, y, w, h, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Te perdiste...", x + w / 2, y + h / 2);
}

// -----------------------------------------------------
// Botón reinicio pantalla 12
function drawBotonReinicio() {
  let x = width / 2 - botonReinicioAncho / 2;
  let y = height - botonReinicioAlto - margen;
  fill(200, 120, 0);
  rect(x, y, botonReinicioAncho, botonReinicioAlto, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Volver al inicio", width / 2, y + botonReinicioAlto / 2);
}

// -----------------------------------------------------
// clic en botones
function mousePressed() {
  // AVANZAR desde la pantalla 0
  if (pantalla === 0) {
    pantalla = 1;
    return;
  }

  // PANTALLA 1
  if (pantalla === 1) {
    if (mouseX >= margen && mouseX <= margen + botonAncho &&
        mouseY >= height - botonAlto - margen && mouseY <= height - margen) {
      hilo = true;
      pantalla = 2;
      return;
    }
    if (mouseX >= width - botonAncho - margen && mouseX <= width - margen &&
        mouseY >= height - botonAlto - margen && mouseY <= height - margen) {
      hilo = false;
      pantalla = 3;
      return;
    }
  }

  // PANTALLA 2
  if (pantalla === 2) {
    let w = 160, h = 40, x = width - w - 20, y = height - h - 20;
    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
      pantalla = 4;
      return;
    }
  }

  // PANTALLA 3
  if (pantalla === 3) {
    let w = 160, h = 40, x = width - w - 20, y = height - h - 20;
    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
      pantalla = 4;
      return;
    }
  }

  // PANTALLA 4
  if (pantalla === 4) {
    if (mouseX >= margen && mouseX <= margen + botonAncho &&
        mouseY >= height - botonAlto - margen && mouseY <= height - margen) {
      esconder = false;
      pantalla = 6;
      return;
    }
    if (mouseX >= width - botonAncho - margen && mouseX <= width - margen &&
        mouseY >= height - botonAlto - margen && mouseY <= height - margen) {
      esconder = true;
      pantalla = 5;
      return;
    }
  }

  // PANTALLA 5
  if (pantalla === 5) {
    let w = 160, h = 40, x = width - w - 20, y = height - h - 20;
    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
      pantalla = 7;
      return;
    }
  }

  // PANTALLA 6
  if (pantalla === 6) {
    let w = 220, h = 40, x = width - w - 20, y = height - h - 20;
    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
      pantalla = 7;
      return;
    }
  }

  // PANTALLA 7
  if (pantalla === 7) {
    let w = 180, h = 40, x = width - w - 20, y = height - h - 20;
    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
      pantalla = 8;
      return;
    }
  }

  // PANTALLA 8 
  if (pantalla === 8) {
    let cx = width / 2;
    let cy = height / 1.5;
    let r = 60;
    let d = dist(mouseX, mouseY, cx, cy);
    if (d < r) {
      if (hilo) {
        pantalla = esconder ? 9 : 10;
      } else {
        pantalla = esconder ? 9 : 11;
      }
      return;
    }
  }

  // PANTALLA 9
  if (pantalla === 9) {
    let w = 180, h = 40, x = width - w - 20, y = height - h - 20;
    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
      pantalla = 12;
      return;
    }
  }

  // PANTALLA 10
  if (pantalla === 10) {
    let w = 220, h = 40, x = width - w - 20, y = height - h - 20;
    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
      pantalla = 12;
      return;
    }
  }

  // PANTALLA 11
  if (pantalla === 11) {
    let w = 220, h = 40, x = width - w - 20, y = height - h - 20;
    if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
      pantalla = 12;
      return;
    }
  }

  // PANTALLA 12 
  if (pantalla === 12) {
    let x = width / 2 - botonReinicioAncho / 2;
    let y = height - botonReinicioAlto - margen;
    if (mouseX >= x && mouseX <= x + botonReinicioAncho &&
        mouseY >= y && mouseY <= y + botonReinicioAlto) {
      pantalla = 0;
      hilo = false;
      esconder = false;
      return;
    }
  }
}
