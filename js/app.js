function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(informacion) {
  let cantidad;
  const base = 2000;
  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
    default:
      break;
  }
  const diferencia = new Date().getFullYear() - this.anio;
  cantidad -= (diferencia * 3 * cantidad) / 100;
  this.tipo === "basico" ? (cantidad *= 1.3) : (cantidad *= 1.5);
  return cantidad;
};

function Interfaz() {}

Interfaz.prototype.mostrarError = function(sms, tipo) {
  const div = document.createElement("div");
  tipo === "error"
    ? div.classList.add("mensaje", "error")
    : div.classList.add("mensaje", "correcto");
  div.innerHTML = `${sms}`;
  formulario.insertBefore(div, document.querySelector(".form-group"));
  setTimeout(() => {
    document.querySelector(".mensaje").remove();
  }, 3000);
};

Interfaz.prototype.mostrarResultado = function(seguro, total) {
  const rest = document.getElementById("resultado");
  let marca;
  switch (seguro.marca) {
    case "1":
      marca = "Americano";
      break;
    case "2":
      marca = "Asiatico";
      break;
    case "3":
      break;
      marca = "Europeo";
    default:
      break;
  }

  const div = document.createElement("div");
  div.innerHTML = `
    <p class="header">Tu resumen:</p>
    <p>Marca: ${marca}</p>
    <p>Año: ${seguro.anio}</p>
    <p>Tipo: ${seguro.tipo}</p>
    <p>Total: $ ${total} </p>
  `;
  const spinner = document.querySelector("#cargando img");
  spinner.style.display = "block";
  setTimeout(() => {
    spinner.style.display = "none";
    rest.appendChild(div);
  }, 3000);
};

// EVENT LISTENER

const formulario = document.getElementById("cotizar-seguro");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const marca = document.getElementById("marca");
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;

  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  const tipo = document.querySelector("input[name='tipo']:checked").value;

  const interfaz = new Interfaz();

  if (marcaSeleccionada === "" || anioSeleccionado === "" || tipo === "") {
    interfaz.mostrarError(
      "Faltan datos, revisar el formulario y prueba de nuevo",
      "error"
    );
  } else {
    const restultados = document.querySelector("#resultado div");
    if (restultados != null) {
      restultados.remove();
    }
    interfaz.mostrarError("Cotizando", "correcto");
    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
    const cantidad = seguro.cotizarSeguro(seguro);
    interfaz.mostrarResultado(seguro, cantidad);
  }
});

const max = new Date().getFullYear();
const min = max - 20;

const anios = document.getElementById("anio");
for (let i = max; i > min; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  anios.appendChild(option);
}
