/*
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
*/
/** Crea nuevo array */
const codigo = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"]
];

/** Define botones y cuadros de texto */
const btnEncriptar = document.querySelector("#btn-encriptar");
const btnDesencriptar = document.querySelector("#btn-desencriptar");
const btnCopiar = document.querySelector("#btn-copiar");
const txtEntrada = document.querySelector("#txt-entrada");
const txtSalida = document.querySelector("#txt-salida");
const error = document.querySelector("#error");
const emptymessage = document.getElementById("emptymessage");

/** Encripta mensaje */
function encriptar(mensaje) {
  let mensajeCodificado = mensaje;
  for (let clave of codigo) {
    mensajeCodificado = mensajeCodificado.replaceAll(clave[0], clave[1]);
  }

  return mensajeCodificado;
}

/**Desencripta Mensaje */
function desencriptar(mensaje) {
  let mensajeCodificado = mensaje;
  for (let clave of codigo) {
    mensajeCodificado = mensajeCodificado.replaceAll(clave[1], clave[0]);
  }
  return mensajeCodificado;
}

/**Valida el Texto para que no tenga minusculas */
function validarTexto(texto) {
  let regMin = new RegExp("^[a-z ]+$");
  return regMin.exec(texto.trim()) ? true : false;
}

/**Muestra resultado de las funciones encriptar y desencriptar  */
function mostrarMensaje(mensaje) {
  txtSalida.innerText = mensaje;
  deactive(true);
  btnCopiar.classList.remove("disabled");
}

/**Oculta la ventana de texto iniciales - activa boton copiar */
const deactive = (d) => {
  if (d) {
    txtSalida.classList.add("active");
    emptymessage.classList.add("deactive");
    btnCopiar.classList.add("active");
  } else {
    txtSalida.classList.remove("active");
    emptymessage.classList.remove("deactive");
    btnCopiar.classList.add("deactive");
  }
};

/**Copia texto seleccionado */
function copiar() {
  let rng = document.createRange();
  rng.selectNode(txtSalida);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(rng);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

/**Asigna el metodo click a las funciones / valida texto ingresado */
btnEncriptar.addEventListener("click", () => {
  error.className = "oculta";
  if (validarTexto(txtEntrada.value))
    mostrarMensaje(encriptar(txtEntrada.value));
  else error.className = "visible";
});

btnDesencriptar.addEventListener("click", () => {
  error.className = "oculta";
  if (validarTexto(txtEntrada.value))
    mostrarMensaje(desencriptar(txtEntrada.value));
  else error.className = "visible";
});

btnCopiar.addEventListener("click", () => {
  if (!btnCopiar.classList.contains("disable")) copiar();
});
