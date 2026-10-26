var area      = document.getElementById("pg-area");
var codigo    = document.getElementById("pg-codigo");

var selDirection = document.getElementById("pg-direction");
var selJustify   = document.getElementById("pg-justify");
var selAlign     = document.getElementById("pg-align");
var selWrap      = document.getElementById("pg-wrap");
var rangeGap     = document.getElementById("pg-gap");
var saidaGap     = document.getElementById("pg-gap-valor");

var MIN_ITENS = 1;
var MAX_ITENS = 12;
var itens = 4;

function desenharItens() {
  area.innerHTML = "";
  for (var i = 1; i <= itens; i++) {
    var div = document.createElement("div");
    div.className = "item a" + (((i - 1) % 3) + 1);
    div.textContent = i;
    area.appendChild(div);
  }
}

function atualizar() {
  var direction = selDirection.value;
  var justify   = selJustify.value;
  var align     = selAlign.value;
  var wrap      = selWrap.value;
  var gap       = rangeGap.value + "px";

  area.style.flexDirection  = direction;
  area.style.justifyContent = justify;
  area.style.alignItems     = align;
  area.style.flexWrap       = wrap;
  area.style.gap            = gap;

  saidaGap.textContent = gap;

  codigo.textContent =
    ".container {\n" +
    "  display: flex;\n" +
    "  flex-direction: " + direction + ";\n" +
    "  justify-content: " + justify + ";\n" +
    "  align-items: " + align + ";\n" +
    "  flex-wrap: " + wrap + ";\n" +
    "  gap: " + gap + ";\n" +
    "}";
}

function restaurar() {
  selDirection.value = "row";
  selJustify.value   = "flex-start";
  selAlign.value     = "stretch";
  selWrap.value      = "nowrap";
  rangeGap.value     = 10;
  itens = 4;
  desenharItens();
  atualizar();
}

[selDirection, selJustify, selAlign, selWrap, rangeGap].forEach(function (el) {
  el.addEventListener("input", atualizar);
});

document.getElementById("pg-mais").addEventListener("click", function () {
  if (itens < MAX_ITENS) {
    itens++;
    desenharItens();
  }
});

document.getElementById("pg-menos").addEventListener("click", function () {
  if (itens > MIN_ITENS) {
    itens--;
    desenharItens();
  }
});

document.getElementById("pg-reset").addEventListener("click", restaurar);

restaurar();
