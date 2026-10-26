var area   = document.getElementById("pg-area");
var codigo = document.getElementById("pg-codigo");

var rangeCols  = document.getElementById("pg-cols");
var saidaCols  = document.getElementById("pg-cols-valor");
var rangeGap   = document.getElementById("pg-gap");
var saidaGap   = document.getElementById("pg-gap-valor");
var selJustify = document.getElementById("pg-justify");
var selAlign   = document.getElementById("pg-align");
var chkAutofit = document.getElementById("pg-autofit");
var chkSpan    = document.getElementById("pg-span");

var MIN_ITENS = 1;
var MAX_ITENS = 18;
var itens = 7;

function desenharItens() {
  area.innerHTML = "";
  for (var i = 1; i <= itens; i++) {
    var div = document.createElement("div");
    div.className = "cel";
    div.textContent = i;
    area.appendChild(div);
  }
  destacarPrimeiro();
}

function destacarPrimeiro() {
  var primeiro = area.firstElementChild;
  if (!primeiro) return;
  primeiro.style.gridColumn = chkSpan.checked ? "span 2" : "";
  primeiro.style.background = chkSpan.checked ? "#ffd700" : "";
}

function atualizar() {
  var colunas = rangeCols.value;
  var gap     = rangeGap.value + "px";
  var justify = selJustify.value;
  var align   = selAlign.value;

  var template = chkAutofit.checked
    ? "repeat(auto-fit, minmax(110px, 1fr))"
    : "repeat(" + colunas + ", 1fr)";

  area.style.gridTemplateColumns = template;
  area.style.gap                 = gap;
  area.style.justifyItems        = justify;
  area.style.alignItems          = align;

  saidaCols.textContent = chkAutofit.checked ? "auto" : colunas;
  rangeCols.disabled    = chkAutofit.checked;
  saidaGap.textContent  = gap;

  destacarPrimeiro();

  var texto =
    ".container {\n" +
    "  display: grid;\n" +
    "  grid-template-columns: " + template + ";\n" +
    "  grid-auto-rows: 70px;\n" +
    "  gap: " + gap + ";\n" +
    "  justify-items: " + justify + ";\n" +
    "  align-items: " + align + ";\n" +
    "}";

  if (chkSpan.checked) {
    texto += "\n\n.item-1 {\n  grid-column: span 2;\n}";
  }

  codigo.textContent = texto;
}

function restaurar() {
  rangeCols.value     = 3;
  rangeGap.value      = 10;
  selJustify.value    = "stretch";
  selAlign.value      = "stretch";
  chkAutofit.checked  = false;
  chkSpan.checked     = false;
  itens = 7;
  desenharItens();
  atualizar();
}

[rangeCols, rangeGap, selJustify, selAlign, chkAutofit, chkSpan].forEach(function (el) {
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
