const carritoAuxB = localStorage.getItem("carritoBetons"); //TRAEMOS LO QUE GUARDAMOS EN EL STORAGE
const carrito2 = JSON.parse(carritoAuxB); //LO CONVERTIMOS EN OBJETOS

const btnTotal = document.getElementById("btnTotal");
const btnCalcular = document.getElementById("btnCalcular");
const btnSeguir = document.getElementById("btnSeguir");
const btnCheckout = document.getElementById("btnCheckout");
const btnCotizador = document.getElementById("btnCotizador");

const lista = document.getElementById("lista");

const seccionCarrito = document.getElementById("carrito");
const seccionCotizador = document.getElementById("financiacion");

const importe = document.getElementById("total");
const cuotas = document.getElementById("cuotas");

const checkout = document.getElementById("tarjeta");

const mostrarTotal = document.getElementById("total")

//const seccionTarjeta = document.getElementById("tarjeta")
const btnComprar = document.getElementById("botonComprar");
const digitos1 = document.getElementById("card-number");
const digitos2 = document.getElementById("card-number1");
const digitos3 = document.getElementById("card-number2");
const digitos4 = document.getElementById("card-number3");

const titularTarjeta = document.getElementById("titularTarjeta");
const clave = document.getElementById("tarjeta-ccv");

//SETEAMOS UNOS DATOS POR DEFAULT EN LA TARJETA PARA QUE EL CORRECTOR DEL PROYECTO NO DEBA HACERLO
digitos1.value = 1234;
digitos2.value = 5678;
digitos3.value = 4321;
digitos4.value = 8765;
titularTarjeta.value = "Alejandro Pantuliano";
clave.value = 213;

ocultar(btnCalcular);
ocultar(btnCheckout);
ocultar(seccionCotizador);
ocultar(checkout);

//LLENA LA TABLA CON TODOS LOS ELEMENTOS DEL CARRITO
function llenarTabla() {
  lista.innerHTML = "";
  if (carrito2 !== null && carrito2.length > 0) {
    carrito2.forEach((item) => {
      const tr = retornoLista(item);
      lista.innerHTML += tr;
    });
  } else {
    ocultar(btnTotal);
  }
}
llenarTabla();
const botonesRemove = document.querySelectorAll(
  "button.button.button-outline.button-remove"
);

//CALCULA EL TOTAL DE LA COMPRA Y NOS LO MUESTRA EN UN SWEETALERT
btnTotal.addEventListener("click", () => {
  if (carrito2.length > 0) {
    total = calcularTotal(carrito2);

    alerta(true, 0, "success", "center", "TOTAL", "$ " + `${total}`);
    mostrar(btnCotizador);
    mostrar(btnCheckout);
    mostrarTotal.innerHTML = "Total:  $"+`${total}`
  }
});

//LLAMA AL SIMULADOR DE CUOTAS
btnCalcular.addEventListener("click", () => {
  calcular(importe.value);
  ocultar(seccionCotizador);
  ocultar(btnCalcular);
});

//BOTON SEGUIR COMPRANDO , VOLVEMOS A LA PAGINA PRINCIPAL Y NOS GUARDAMOS EL CARRITO
btnSeguir.addEventListener("click", () => {
  localStorage.setItem("carritoAuxB", JSON.stringify(carrito2));
  window.location.href = "index.html";
});

//BOTON QUE NOS MUESTRA EL FORMULARIO PARA INGRESAR DATOS DE LA TARJETA
btnCheckout.addEventListener("click", () => {
  if (carrito2.length > 0) {
    checkout.scrollIntoView();
    mostrar(checkout);
  }
});

//BOTON PAGAR , REALIZA VERIFICACION QUE ESTEN COMPLETOS TODOS LOS DATOS , Y ENVIA LA SOLICITUD

btnComprar.addEventListener("click", () => {
  const datosCorrectos = datosCompletos();

  if (datosCorrectos) {
    Swal.fire({
      toast: false,
      position: "center",
      icon: "success",
      title: "GRACIAS POR SU COMPRA",
      text: "El pedido sera procesado",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      timer: 0,
    }).then(() => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  } else {
    Swal.fire({
      toast: false,
      position: "center",
      icon: "warning",
      title: "ERROR",
      text: "Verifique los datos",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      timer: 0,
    });
  }
});

//FUNCIONES PARA VALIDAR LOS DATOS DEL FORM DE LA TARJETA DE CREDITO
const datosCompletos = () =>
  numerosTarjeta() && titularCorrecto() && ccv() ? true : false;

const numerosTarjeta = () =>
  digitosCorrectos(digitos1.value) &&
  digitosCorrectos(digitos2.value) &&
  digitosCorrectos(digitos3.value) &&
  digitosCorrectos(digitos4.value)
    ? true
    : false;

const digitosCorrectos = (digitos) =>
  digitos !== "" && !isNaN(digitos) && digitos.length == 4 ? true : false;

const titularCorrecto = () => (titularTarjeta.value !== "" ? true : false);

const ccv = () =>
  clave.value != "" &&
  !isNaN(clave.value) &&
  (clave.value.length == 3 || clave.value.length == 4)
    ? true
    : false;

//BOTON QUE NOS MUESTRA SECCION PARA USAR EL COTIZADOR
btnCotizador.addEventListener("click", () => {
  mostrar(seccionCotizador);
  mostrar(btnCalcular);
});

//FUNCION QUE ACTIVA LOS BOTONES PARA REMOVER PRODUCTOS DEL CARRITO
function activarClickBotonesRemove(botones) {
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      let resultado = carrito2.findIndex(
        (prod) => prod.id === parseInt(btn.id)
      );
      if (resultado !== -1) {
        carrito2.splice(resultado, 1);
        localStorage.setItem("carritoBetons", JSON.stringify(carrito2));
      }
      window.location.reload();
    });
  });
}
activarClickBotonesRemove(botonesRemove);
