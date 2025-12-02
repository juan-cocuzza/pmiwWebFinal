// -----------------------------
// "El destino de Sísifo" - p5.js
// Resolución: 640x480
// 15 escenas + 3 finales - Interactivo textual
// -----------------------------

let escenas = [];       // ARREGLO escenas
let imgs = {};          // OBJETO para imagenes
let sonidos = {};       // OBJETO para sonidos
let escenaIndex = 0;    
let mostrarCreditosFlag = false;
let muteado = false;
let botonAreas = [];    
let fuente;             

function preload() {
   imgs['s1'] = loadImage('data/s1.png');
   imgs['s2'] = loadImage('data/s2.png');
   imgs['s3'] = loadImage('data/s3.png');
   imgs['s4'] = loadImage('data/s4.png');
   imgs['s5'] = loadImage('data/s5.png');
   imgs['s6'] = loadImage('data/s6.png');
   imgs['s7'] = loadImage('data/s7.png');
   imgs['s8'] = loadImage('data/s8.png');
   imgs['s9'] = loadImage('data/s9.png');
   imgs['s10'] = loadImage('data/s10.png');
   //imgs['s11'] = loadImage('data/s11.png');
   imgs['s12'] = loadImage('data/s12.png');
   imgs['s13'] = loadImage('data/s13.png');
   imgs['s14'] = loadImage('data/s14.png');
   imgs['s15'] = loadImage('data/s15.png');
   imgs['end1'] = loadImage('data/end1.png');
   imgs['end2'] = loadImage('data/end2.png');
   imgs['end3'] = loadImage('data/end3.png');
    
   sonidos['amb'];
   sonidos.amb = loadSound("data/amb.mp3");
}

function setup() {
  createCanvas(640, 480);
  textFont("Georgia");
  textAlign(LEFT, TOP);
  rectMode(CORNER);
  noStroke();
  frameRate(60);

  // Construcción del ARREGLO de escenas (cada escena: id, title, text[], imageName, choices [{label, to}], soundName)
  escenas = [
    { id: "intro", title: "Comienzo", text: ["Te despiertas en la ladera de una montaña. Una roca inmensa está a tu lado, fría y firme.", "Recuerdas fragmentos: un juicio, la cólera de los dioses, y el empuje interminable."], image: "s1", choices: [{l:"Levantar la roca y mirar", to:1}, {l:"Ponerse en marcha colina abajo", to:2}], sound: "amb" },

    { id: "s1", title: "La roca", text: ["La roca parece pesar el mundo. Cuando intentas moverla, notas una inscripción apenas legible.", "\"Quien desafía a los dioses, tendrá su tarea\"."], image: "s2", choices: [{l:"Leer la inscripción", to:3}, {l:"Ignorar y empujar", to:4}], sound: "pass" },

    { id: "s2", title: "Valle", text: ["Bajas por la ladera y atraviesas un valle cubierto de niebla. Ecos de voces antiguas te rodean."], image: "s3", choices: [{l:"Escuchar los ecos", to:5}, {l:"Seguir el sendero", to:6}], sound: "amb" },

    { id: "s3", title: "Inscripción", text: ["Las letras hablan de juicio y astucia. Recuerdas la noche de tu ofensa: engañaste a los dioses y robaste su confianza."], image: "s4", choices: [{l:"Arrepentirte", to:7}, {l:"Sonreír y seguir", to:4}], sound: "amb" },

    { id: "s4", title: "Primer intento", text: ["Empujas. La cuesta resiste. Un jadeo, un paso. La roca rueda, pero no sube: cae y te obliga a volver.", "La sensación de futilidad te golpea."], image: "s9", choices: [{l:"Reintentar con furia", to:8}, {l:"Buscar una estrategia", to:9}], sound: "pass" },

    { id: "s5", title: "Ecos del valle", text: ["De las sombras emergen seres diminutos que observan tu castigo con curiosidad. Te ofrecen una palabra: 'Significado'."], image: "s6", choices: [{l:"Preguntar qué significa", to:10}, {l:"Correr sin detenerte", to:6}], sound: "amb" },

    { id: "s6", title: "Sendero", text: ["El sendero te lleva a un antiguo altar cubierto de musgo. Hay restos de viejas ofrendas."], image: "s5", choices: [{l:"Investigar el altar", to:11}, {l:"Volver a la roca", to:4}], sound: "amb" },

    { id: "s7", title: "Arrepentimiento", text: ["Por un momento piensas en la vida que pudiste haber llevado. Pero el orgullo asoma y te sientes vivo al desafiar."], image: "s7", choices: [{l:"Aceptar el castigo", to:12}, {l:"Rehusar y planear fuga", to:13}], sound: "amb" },

    { id: "s8", title: "Furia", text: ["Con furia empujas sin pensar. La roca cae más veces. Tus manos sangran. Un susurro: '¿Valió la pena?'" ], image: "s8", choices: [{l:"Seguir empujando", to:14}, {l:"Detenerte y observar", to:5}], sound: "pass" },

    { id: "s9", title: "Estrategia", text: ["Buscas palancas, formas, ángulos. Reduces esfuerzo. Cada empujón es distinto; el ciclo parece menos absurdo."], image: "s10", choices: [{l:"Probar nueva técnica", to:4}, {l:"Compartir la estrategia con otros", to:16}], sound: "pass" },

    { id: "s10", title: "La palabra", text: ["'Significado' repiten. Comprendes que la experiencia y el acto mismo pueden ser la recompensa.", "No todo triunfo necesita ser escapar."], image: "s13", choices: [{l:"Aceptar significado", to:12}, {l:"Buscar la liberación", to:13}], sound: "amb" },

    { id: "s11", title: "Altar", text: ["En el altar hay una pequeña llave forjada en sombras. Quizá abre algo que desconoces."], image: "s12", choices: [{l:"Tomar la llave", to:13}, {l:"Dejarla", to:4}], sound: "amb" },

    { id: "s12", title: "Aceptar", text: ["Decides aceptar la tarea. Le das sentido: cada empuje es tu propio juramento. El esfuerzo te define."], image: "s4", choices: [{l:"Subir la colina", to:14}, {l:"Meditar junto a la roca", to:7}], sound: "amb" },

    { id: "s13", title: "Plan de fuga", text: ["Buscas rutas, convences a sombras, intentas burlar la vigilancia divina. Pero cada intento despierta castigos nuevos."], image: "s14", choices: [{l:"Arriesgar la fuga definitiva", to:17}, {l:"Rendirse a la evidencia", to:12}], sound: "portal" },

    { id: "s14", title: "Momento de calma", text: ["En un crepúsculo encuentras belleza: la piedra, el sudor, las constelaciones. Hay paz en la repetición."], image: "s15", choices: [{l:"Seguir con paz", to:15}, {l:"Intentar escapar", to:17}], sound: "amb" },

    // FINALES:
    // end1: Final A — Castigo eterno (trágico pero fiel al mito)
    { id: "end1", title: "Final A — Eterno", text: ["Has sido fiel a tu tarea. La rueda del mundo gira y la piedra cae siempre. Eres Sísifo, símbolo de la condena.", "Fin."], image: "end1", choices: [{l:"Volver al inicio", to:0}], sound: "end1" },

    // end2: Final B — Liberación simbólica (reflexivo)
    { id: "end2", title: "Final B — Sentido", text: ["Al encontrar significado en el esfuerzo, tu castigo cambia de forma: ya no es solo tormento, sino oficio. Tu historia inspira a otros.", "Fin."], image: "end2", choices: [{l:"Volver al inicio", to:0}], sound: "end2" },

    // end3: Final C — Rebelión (oscuro)
    { id: "end3", title: "Final C — Castigo agravado", text: ["Intentaste escapar y desafiaste demasiado. Los dioses te multiplicaron la carga: rocas por doquier, voces por siempre. Aprendiste lo que cuesta desafiar lo divino.", "Fin."], image: "end3", choices: [{l:"Volver al inicio", to:0}], sound: "end3" }
  ];

}

function draw() {
  background(30);

  let esc = escenas[escenaIndex];
  let imgName = esc.image || "placeholder";
  if (imgs[imgName]) {
    image(imgs[imgName], 0, 0, width, 320);
  } else {
    fill(20);
    rect(0, 0, width, 320);
    fill(200);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Imagen: " + imgName + ".png faltante", width/2, 160);
    textAlign(LEFT, TOP);
    textSize(16);
  }

  // PANEL DE TEXTO
  fill(0, 180);
  rect(0, 320, width, 160);

  // TÍTULO
  fill(255);
  textSize(20);
  textStyle(BOLD);
  text(esc.title, 18, 330);

  // TEXTO NARRATIVO
  textSize(14);
  textStyle(NORMAL);
  let y = 360;
  for (let i = 0; i < esc.text.length; i++) {
    text(esc.text[i], 18, y, width - 36, 100);
    y += 20;
  }

  // DIBUJAR OPCIONES
  botonAreas = [];
  let btnX = 18;
  let btnW = 280;
  let btnH = 32;
  for (let i = 0; i < esc.choices.length; i++) {
    let bx = btnX + (i % 2) * (btnW + 12);
    let by = 430 + Math.floor(i/2) * (btnH + 8);
    
    if (by + btnH > height - 6) by = height - btnH - 6;

    fill(71, 187, 178);
    rect(bx, by, btnW, btnH, 6);
    fill(20);
    textSize(14);
    textAlign(LEFT, CENTER);
    text(esc.choices[i].l, bx + 10, by + btnH/2);
    textAlign(LEFT, TOP);

    botonAreas.push({ x: bx, y: by, w: btnW, h: btnH, to: esc.choices[i].to });
  }

  // CONTROLES INFO
  fill(255);
  textSize(12);
  textAlign(RIGHT, TOP);
  text("m = mute | c = créditos", width - 12, 6);
  textAlign(LEFT, TOP);

  // SI están los créditos activados, dibujarlos sobre todo
  if (mostrarCreditosFlag) {
    dibujarCreditos();
  }
  
  console.log(sonidos.amb);
}

// -----------------------------
// CLICK: detectar botón pulsado
// -----------------------------
function mousePressed() {
  if (mostrarCreditosFlag) {
    // si clic en créditos, ocultar
    mostrarCreditosFlag = false;
    return;
  }
  for (let a of botonAreas) {
    if (mouseX >= a.x && mouseX <= a.x + a.w && mouseY >= a.y && mouseY <= a.y + a.h) {
      cambiarEscena(a.to);
      return;
    }
  }
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

// -----------------------------
// CAMBIAR ESCENA (función con parámetro)
// -----------------------------
function cambiarEscena(nueva) {
  // Si 'nuevoIndice' es 15/16/17 según los finales; adaptá si cambias orden del array
  escenaIndex = nueva;
  reproducirSonidoEscena();
}

// --- Reproduce el sonido asociado a la escena actual ---
function reproducirSonidoEscena() {
  // detener todos los sonidos que estén sonando
  for (let s in sonidos) {
    if (sonidos[s] && sonidos[s].isPlaying && sonidos[s].isPlaying()) {
      sonidos[s].stop();
    }
  }

  // obtener el nombre del sonido asociado a la escena actual
  let sname = escenas[escenaIndex].sound;

  // si está muteado o no hay sonido, salir
  if (muteado || !sname || !sonidos[sname]) return;

  // desbloquear el contexto de audio (por si aún no fue activado)
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  // reproducir según el tipo (ambiente = loop, otros = play normal)
  if (sname === "amb") {
    sonidos[sname].loop();
  } else {
    sonidos[sname].play();
  }
}
// -----------------------------
// TECLAS: mute y créditos
// -----------------------------
function keyPressed() {
  if (key === 'm' || key === 'M') {
    muteado = !muteado;
  }
  if (key === 'c' || key === 'C') {
    mostrarCreditosFlag = !mostrarCreditosFlag;
  }
}

// -----------------------------
// DIBUJAR CRÉDITOS (función independiente)
// -----------------------------
function dibujarCreditos() {
  fill(0, 220);
  rect(40, 60, width - 80, height - 120, 12);
  fill(255);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("CRÉDITOS", width/2, 80);
  textStyle(NORMAL);
  textSize(14);
  textAlign(LEFT, TOP);
  let y = 120;
  text("- Alumno : Cocuzza Juan Cruz", 80, y); y += 22;
  text("- Alumno : Jones Tomas", 80, y); y += 22;
  text("- Autor de la obra: Equipo (basado en el mito de Sísifo)", 80, y); y += 22;
  text("- Entrega: TPfinalParte1 - rama: tpfinalparte1", 80, y); y += 22;
  text("- Instrucciones: presiona cualquier parte para volver", 80, y);
  textAlign(LEFT, TOP);
}

// -----------------------------
// UTILS (opcional): reiniciar juego
// -----------------------------
function reiniciar() {
  escenaIndex = 0;
  mostrarCreditosFlag = false;
}
