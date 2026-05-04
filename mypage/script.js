const canvas = document.querySelector("#math-canvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let dpr = 1;
let t = 0;

const formulas = [
  { text: "Ax = b", x: 0.08, y: 0.18, size: 30, speed: 0.18, tint: "teal", phase: 0.4 },
  { text: "A = UΣVᵀ", x: 0.66, y: 0.15, size: 34, speed: 0.12, tint: "gold", phase: 1.7 },
  { text: "det(A)", x: 0.38, y: 0.28, size: 26, speed: 0.16, tint: "ink", phase: 2.9 },
  { text: "rank(A)", x: 0.78, y: 0.36, size: 22, speed: 0.2, tint: "teal", phase: 4.1 },
  { text: "λv = Av", x: 0.16, y: 0.44, size: 28, speed: 0.14, tint: "gold", phase: 5.3 },
  { text: "QᵀQ = I", x: 0.52, y: 0.52, size: 24, speed: 0.1, tint: "teal", phase: 6.4 },
  { text: "N(A)", x: 0.86, y: 0.62, size: 20, speed: 0.17, tint: "ink", phase: 7.5 },
  { text: "tr(A) = Σλᵢ", x: 0.24, y: 0.68, size: 27, speed: 0.13, tint: "gold", phase: 8.8 },
  { text: "A⁻¹b", x: 0.58, y: 0.78, size: 31, speed: 0.15, tint: "teal", phase: 9.9 },
  { text: "col(A)", x: 0.08, y: 0.86, size: 21, speed: 0.19, tint: "ink", phase: 10.7 },
  { text: "projᵤ(v)", x: 0.72, y: 0.9, size: 24, speed: 0.11, tint: "gold", phase: 11.8 },
  { text: "[ 1 0 ; 0 1 ]", x: 0.42, y: 0.94, size: 19, speed: 0.16, tint: "teal", phase: 12.4 },
];

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawGrid() {
  ctx.save();
  ctx.strokeStyle = "rgba(244, 241, 231, 0.035)";
  ctx.lineWidth = 1;

  const spacing = 42;
  const drift = (t * 3) % spacing;

  for (let x = -spacing + drift; x < width + spacing; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = -spacing + drift; y < height + spacing; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.restore();
}

function formulaColor(tint, alpha) {
  const palette = {
    teal: `rgba(88, 214, 197, ${alpha})`,
    gold: `rgba(242, 200, 107, ${alpha})`,
    ink: `rgba(244, 241, 231, ${alpha})`,
  };

  return palette[tint] || palette.ink;
}

function drawFormulaField() {
  const driftDistance = Math.max(width, height) * 0.08;

  formulas.forEach((formula, index) => {
    const wave = Math.sin(t * formula.speed + formula.phase);
    const float = Math.cos(t * formula.speed * 0.7 + formula.phase);
    const x = formula.x * width + wave * driftDistance;
    const y = formula.y * height + float * driftDistance * 0.45;
    const alpha = 0.105 + (Math.sin(t * 0.35 + index) + 1) * 0.025;
    const angle = Math.sin(t * 0.12 + formula.phase) * 0.035;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.font = `600 ${formula.size}px Cambria Math, STIX Two Math, Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = formulaColor(formula.tint, 0.16);
    ctx.shadowBlur = 18;
    ctx.fillStyle = formulaColor(formula.tint, alpha);
    ctx.fillText(formula.text, 0, 0);
    ctx.restore();
  });
}

function draw() {
  t += 0.006;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(7, 17, 22, 0.96)";
  ctx.fillRect(0, 0, width, height);
  drawGrid();
  drawFormulaField();
  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
draw();
