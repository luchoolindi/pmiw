//el laberinto

// link Olindi Luciano https://youtu.be/j0lLm6yfOA8

// ---------- Variables globales ----------
let game;

//-----preload----
//carga de imaneges
let imgTeseo;
let imgMinotauro;
let imgEspada;
let imgCura;

//----carga de sonids--

let curaSound;
let powerUpSound;

function preload() {
  imgTeseo = loadImage("data/teseo1.png");
  imgMinotauro = loadImage("data/minotauro1.png");
  imgEspada = loadImage("data/espadita1.png");
  imgCura = loadImage("data/cura.png");
  curaSound = loadSound("data/curasound.mp3");
  powerUpSound = loadSound("data/powerup.mp3");
}

// ------- Setup y Draw ----------
function setup() {
  createCanvas(640, 480);
  textFont("monospace");
  game = new Game();
}


//()()())())()()
//lucho ()()()()))989()(
//()()()()()())()() LOOp+-+-+-+


function draw() {
  background(0);
  game.update();
  game.display();
}

// ------ Estados de la partida -------
function keyPressed() {
  // Iniciar juego con ESPACIO (de paso se activan los sonidos tambien)
  if (game.state === "inicio" && key === " ") {
    game.state = "jugando";

    // desbloquear audio
    if (typeof userStartAudio === 'function') {
      userStartAudio().then(() => {
        console.log("Audio habilitado!");
      }).catch(e => console.warn("No se pudo habilitar audio:", e));
    }

  } else if ((game.state === "victoria" || game.state === "derrota") && (key === 'r' || key === 'R')) {
    game.reset();
  }
}

// ===================================
// CLASE: Game 
// ===============================
class Game {
  constructor() {
    this.tileSize = 32; this.cols = 20; this.rows = 15;
    this.state = "inicio";
    this.map = this._createMap();

    this.jugador = new Jugador(this.tileSize * 1.5, this.tileSize * 1.5, this.tileSize * 0.6, this);
    this.enemigo = new Enemigo(this._tileCenterX(18), this._tileCenterY(13), this.tileSize * 0.7, this);

    this.punto = new Item(this, "punto", 10);
    this.powerUp = null;
    this.cura = null;

    this.puntaje = 0; this.vidas = 3;
    this.nextPowerThreshold = 5; this.nextHealAt = 10; this.winScore = 25;
    this.stunsRealizados = 0;
  }

  colisiona(a, b) {
    return dist(a.x, a.y, b.x, b.y) < (a.size / 2 + b.size / 2);
  }
//()())))())(98989)()(
// PARTE LUCHO()()()()()()()()()(9
//()()()()()()()()))98 p2
  update() {
    if (this.state !== "jugando") return;

    this.jugador.update();
    this.enemigo.update();
    this.punto?.update();
    this.powerUp?.update();
    this.cura?.update();

    // recoger punto
    if (this.punto && this.colisiona(this.jugador, this.punto)) {
      this.puntaje++;
      this.punto = new Item(this, "punto", 10);

      if (this.puntaje >= this.nextPowerThreshold) { 
        this.powerUp = new Item(this, "power", 14); 
        this.nextPowerThreshold += 5; 
      }
      if (this.puntaje >= this.nextHealAt) { 
        this.cura = new Item(this, "cura", 12); 
        this.nextHealAt += 10; 
      }
    }

    // colision con el minotauro
    if (this.enemigo.alive && this.colisiona(this.jugador, this.enemigo)) {
      if (this.jugador.powerActive) {
        this.jugador.powerActive = false;

        if (!this.enemigo.aturdido) {
          this.enemigo.stun();
          this.stunsRealizados++;

          this.jugador.hurtCooldown = 30;
          if (this.stunsRealizados >= 3) this.state = "victoria";

        } else {
          this.jugador.hurtCooldown = 30;
        }

      } else if (!this.jugador.hurtCooldown) {
        this.vidas = max(0, this.vidas - 1);
        this.jugador.hurtCooldown = 60;
        this.jugador.knockbackFrom(this.enemigo.x, this.enemigo.y);
        if (this.vidas === 0) this.state = "derrota";
      }
    }

    // cuando agarras el powerUp
    if (this.powerUp && !this.powerUp.consumed && this.colisiona(this.jugador, this.powerUp)) {
      this.jugador.powerActive = true;
      if (powerUpSound.isLoaded()) powerUpSound.play(); 
      this.powerUp.consume();
      this.powerUp = null;
    }

    // agarras la curita
    if (this.cura && !this.cura.consumed && this.colisiona(this.jugador, this.cura)) {
      this.vidas = min(3, this.vidas + 1);
      if (curaSound.isLoaded()) curaSound.play(); 
      this.cura.consume();
      this.cura = null;
    }

    if (this.puntaje >= this.winScore) this.state = "victoria";
  }

  display() {
    const pantallas = {
      inicio: () => this._pantallaInicio(),
      jugando: () => this._pantallaJuego(),
      victoria: () => this._pantallaVictoria(),
      derrota: () => this._pantallaDerrota()
    };
    (pantallas[this.state] || pantallas.inicio)();
  }

  _pantallaInicio() {
    background(10, 10, 20);
    fill(255); textAlign(CENTER, CENTER);
    textSize(32); text("TESEO EN EL LABERINTO", width / 2, height / 2 - 60);
    textSize(16); text("Presioná ESPACIO para comenzar", width / 2, height / 2);
    textSize(14); fill(180);
    text("Trabajo Práctico Final — Taller de Diseño Digital", width / 2, height / 2 + 60);
    text("Olindi Luciano y Haedo Lorenzo", width / 2, height / 2 + 80);
  }

  _pantallaJuego() {
    const wallColor = color(60, 70, 90);
    const floorColor = color(25, 30, 40);

    noStroke();

    for (let r = 0; r < this.rows; r++) for (let c = 0; c < this.cols; c++) {
      fill(this.map[r][c] === 1 ? wallColor : floorColor);
      rect(c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize);
    }

    this.punto?.display();
    this.powerUp?.display();
    this.cura?.display();
    this.jugador.display();
    this.enemigo.display();

    fill(255); textSize(16); textAlign(LEFT, TOP);
    text("Puntos: " + this.puntaje, 10, 10);

    for (let i = 0; i < 3; i++) {
      fill(i < this.vidas ? color(90, 180, 255) : color(50, 50, 70));
      noStroke(); ellipse(60 + i * 20, 35, 10);
    }

    fill(255); textSize(16); textAlign(LEFT, TOP);
    text("Golpes: ", 10, 60);
    for (let i = 0; i < 3; i++) {
      fill(i < this.stunsRealizados ? color(255, 210, 80) : color(100, 100, 60));
      ellipse(70 + i * 18, 68, 12);
    }

    if (this.jugador.powerActive) {
      fill(255, 215, 0);
      textSize(12); text("Poder listo (1 impacto)", 10, 50);
    }
  }

  _pantallaVictoria() {
    background(0, 150, 0); fill(255); textAlign(CENTER, CENTER);
    textSize(28); text("¡Victoria!", width / 2, height / 2 - 20);
    textSize(16); text("Presioná R para reiniciar", width / 2, height / 2 + 20);
  }

  _pantallaDerrota() {
    background(150, 0, 0); fill(255); textAlign(CENTER, CENTER);
    textSize(28); text("Has sido derrotado", width / 2, height / 2 - 20);
    textSize(16); text("Presioná R para reiniciar", width / 2, height / 2 + 20);
  }

  _tileCenterX(c) { return c * this.tileSize + this.tileSize / 2; }
  _tileCenterY(r) { return r * this.tileSize + this.tileSize / 2; }
  _distance(x1, y1, x2, y2) { return dist(x1, y1, x2, y2); }

  _createMap() {
    let m = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    for (let i = 0; i < this.cols; i++) { m[0][i] = 1; m[this.rows - 1][i] = 1; }
    for (let j = 0; j < this.rows; j++) { m[j][0] = 1; m[j][this.cols - 1] = 1; }

    for (let [r, c] of [[2,2],[2,3],[2,6],[2,10],[2,14],[2,15],[3,6],[3,10],[3,14],[4,4],[4,5],[4,6],[4,12],[4,13],[5,8],[5,9],[6,2],[6,3],[6,4],[6,14],[6,15],[7,7],[7,8],[7,9],[8,5],[8,6],[8,10],[8,11],[9,3],[9,4],[9,15],[10,7],[10,8],[10,9],[11,2],[11,13],[11,14],[12,4],[12,10],[13,5],[13,6],[13,7],[13,11],[13,12]]) {
      if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) m[r][c] = 1;
    }
    return m;
  }

  isTileFree(r, c) {
    return !(r < 0 || r >= this.rows || c < 0 || c >= this.cols) && this.map[r][c] === 0;
  }

  _allFreeTileCenters() {
    const arr = [];
    for (let r = 1; r < this.rows - 1; r++)
      for (let c = 1; c < this.cols - 1; c++)
        if (this.map[r][c] === 0)
          arr.push({ x: c * this.tileSize + this.tileSize / 2, y: r * this.tileSize + this.tileSize / 2, row: r, col: c });
    return arr;
  }

  getRandomFreeTileCenterAvoid(minDist = 24, avoid = []) {
    const tiles = this._allFreeTileCenters();
    shuffle(tiles, true);
    for (let t of tiles) {
      if (this._distance(t.x, t.y, this.jugador.x, this.jugador.y) < minDist) continue;
      if (this.enemigo && this._distance(t.x, t.y, this.enemigo.x, this.enemigo.y) < minDist) continue;
      let ok = true;
      for (let o of avoid)
        if (o && !o.consumed && this._distance(t.x, t.y, o.x, o.y) < minDist)
          { ok = false; break; }
      if (ok) return t;
    }
    return { x: this.tileSize * 2, y: this.tileSize * 2, row: 1, col: 1 };
  }

  reset() {
    this.state = "inicio";
    this.map = this._createMap();
    this.jugador = new Jugador(this.tileSize * 1.5, this.tileSize * 1.6, this.tileSize * 0.6, this);
    this.enemigo = new Enemigo(this._tileCenterX(18), this._tileCenterY(13), this.tileSize * 0.7, this);
    this.punto = new Item(this, "punto", 10);
    this.powerUp = null; this.cura = null;
    this.puntaje = 0; this.vidas = 3;
    this.nextPowerThreshold = 5; this.nextHealAt = 10;
    this.stunsRealizados = 0;
  }
}

// =================================================
// CLASE: Jugador
// ==============================================
class Jugador {
  constructor(x, y, s, g) {
    this.x = x; this.y = y; this.size = s; this.vel = 2.2; this.game = g;
    this.powerActive = false;
    this.hurtCooldown = 0;
  }

  update() {
    let nx = this.x, ny = this.y;
    if (keyIsDown(LEFT_ARROW)) nx -= this.vel;
    if (keyIsDown(RIGHT_ARROW)) nx += this.vel;
    if (keyIsDown(UP_ARROW)) ny -= this.vel;
    if (keyIsDown(DOWN_ARROW)) ny += this.vel;

    if (!this._collidesWithWalls(nx, this.y)) this.x = nx;
    if (!this._collidesWithWalls(this.x, ny)) this.y = ny;

    if (this.hurtCooldown > 0) this.hurtCooldown--;
  }

  display() {
    push();
    imageMode(CENTER);
    image(imgTeseo, this.x, this.y, this.size * 2, this.size * 2);

    if (this.powerActive) {
      noFill();
      stroke(255, 215, 0);
      strokeWeight(2);
      ellipse(this.x, this.y, this.size * 2 + 10);
    }
    pop();
  }

  _collidesWithWalls(px, py) {
    const h = this.size / 2;
    for (let [cx, cy] of [[px - h, py - h], [px + h, py - h], [px - h, py + h], [px + h, py + h]]) {
      let c = floor(cx / this.game.tileSize), r = floor(cy / this.game.tileSize);
      if (!this.game.map[r] || this.game.map[r][c] === 1) return true;
    }
    return false;
  }

  knockbackFrom(sx, sy) {
    let a = atan2(this.y - sy, this.x - sx);
    this.x += cos(a) * 8; this.y += sin(a) * 8;
    this.x = constrain(this.x, this.size / 2 + 2, width - this.size / 2 - 2);
    this.y = constrain(this.y, this.size / 2 + 2, height - this.size / 2 - 2);
  }
}

// ====================================================
// CLASE: Item
// ======================================================
class Item {
  constructor(game, tipo = "punto", size = 10) {
    this.game = game;
    this.tipo = tipo;
    this.size = size;
    this.consumed = false;
    this.blinkTimer = 0;
    this._place();
  }

  _place() {
    const avoidList = [this.game.punto, this.game.powerUp, this.game.cura];
    const t = this.game.getRandomFreeTileCenterAvoid(
      (this.tipo === "punto") ? 20 : 24, avoidList
    );
    this.x = t.x; this.y = t.y;
  }

  update() { this.blinkTimer = (this.blinkTimer + 1) % 60; }

  display() {
    push(); translate(this.x, this.y);

    if (this.tipo === "punto") {
      noStroke(); fill(120, 255, 120); ellipse(0, 0, this.size);

    } else if (this.tipo === "power") {
      imageMode(CENTER);
      image(imgEspada, 0, 0, this.size * 2, this.size * 2);

    } else if (this.tipo === "cura") {
      imageMode(CENTER);
      image(imgCura, 0, 0, this.size * 3, this.size * 3);
    }
    pop();
  }

  consume() { this.consumed = true; }
}

// ====================================================
// CLASE: Enemigo
// ======================================================
class Enemigo {
  constructor(x, y, s, g) {
    this.x = x; this.y = y;
    this.initX = x; this.initY = y;
    this.size = s;
    this.game = g;

    this.alive = true;
    this.vel = 1.6;
    this.radioDeteccion = 200;

    this.estado = 'patrulla';
    this.direccionPatrulla = this._direccionAleatoria();
    this.changeDirTimer = floor(random(30, 90));

    this.aturdido = false;
    this.tiempoReaparicion = 0;
  }

  update() {
    if (this.aturdido) {
      this.tiempoReaparicion--;
      if (this.tiempoReaparicion <= 0) this._reaparecer();
      return;
    }
    
//()()())()
//LUCHO()()()()(
//()()())()())


    const d = this.game._distance(this.x, this.y, this.game.jugador.x, this.game.jugador.y);
    this.estado = d < this.radioDeteccion ? 'persecucion' : 'patrulla';

    if (this.estado === 'persecucion') this._comportamientoPersecucion();
    else this._comportamientoPatrulla();
  }

  display() {
    push();
    imageMode(CENTER);

    if (this.aturdido) {
      tint(200, 200, 200, 150);
      image(imgMinotauro, this.x, this.y, this.size * 1.8, this.size * 1.8);
    } else {
      noTint();
      image(imgMinotauro, this.x, this.y, this.size * 1.8, this.size * 1.8);
    }

    pop();
  }

  stun() { this.aturdido = true; this.tiempoReaparicion = 120; }
  _reaparecer() { this.aturdido = false; this.x = this.initX; this.y = this.initY; }

  _comportamientoPersecucion() {
    let angle = atan2(this.game.jugador.y - this.y, this.game.jugador.x - this.x);
    let nx = this.x + cos(angle) * this.vel;
    let ny = this.y + sin(angle) * this.vel;

    if (!this._collidesWithWalls(nx, this.y)) this.x = nx;
    if (!this._collidesWithWalls(this.x, ny)) this.y = ny;
  }

  _comportamientoPatrulla() {
    this.changeDirTimer--;
    if (this.changeDirTimer <= 0) {
      this.direccionPatrulla = this._direccionAleatoria();
      this.changeDirTimer = floor(random(30, 90));
    }

    let nx = this.x + cos(this.direccionPatrulla) * this.vel;
    let ny = this.y + sin(this.direccionPatrulla) * this.vel;

    if (!this._collidesWithWalls(nx, this.y)) this.x = nx;
    if (!this._collidesWithWalls(this.x, ny)) this.y = ny;
    else this.direccionPatrulla += PI;
  }

  _direccionAleatoria() { return random(TWO_PI); }

  _collidesWithWalls(px, py) {
    const h = this.size / 2;
    for (let [cx, cy] of [[px - h, py - h], [px + h, py - h], [px - h, py + h], [px + h, py + h]]) {
      let c = floor(cx / this.game.tileSize), r = floor(cy / this.game.tileSize);
      if (!this.game.map[r] || this.game.map[r][c] === 1) return true;
    }
    return false;
  }
}
