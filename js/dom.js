//VARIABLES QUE TRAEMOS DEL DOM
const imgCarrito = document.getElementById("imgCarrito");
const footer = document.getElementById("footer");
const body = document.getElementById("body");
const container = document.getElementById("container");
const inputSearch = document.querySelector("input#inputSearch");

const btnTotal = document.getElementById("btnTotal");
const btnCalcular = document.getElementById("btnCalcular");
const btnSeguir = document.getElementById("btnSeguir");
const btnCheckout = document.getElementById("btnCheckout");

const productos = [];
const betons = [];
const mockApiURL = "https://638d2050d2fc4a058a670274.mockapi.io/productos";

fetch(mockApiURL) //PIDO LOS DATOS A LA API CON LA INFO DE MIS PRODUCTOS
  .then((response) => (data = response.json()))
  .then((data) => betons.push(...data)) //RECIBO LOS DATOS EN FORMATO TEXTO, Y LOS CONVIERTO EN ARRAY OBJETOS LITERALES
  .then(() => {
    //LOS CONVIERTO EN OBJETOS PRODUCTO
    betons.forEach((prod) => {
      productos.push(
        new Producto(prod.id, prod.imagen, prod.nombre, prod.precio)
      );
    });
  }) //INCORPORO EL ARRAY A MI ARRAY DE OBJETOS ORIGINAL
  .then(() => cargarProductos(productos)) //CARGO LOS PRODUCTOS Y LOS MUESTRO
  .then(() => {
    //ACTIVAMOS LOS BOTONES
    activarClickBotonesAdd(), activarClickBotonesRemove();
  })
  .catch((error) => (container.innerHTML = retornoError())); //SI NO CARGA LOS PRODUCTOS POR ERROR DE CONEXION NOS MUESTRA CARD INFORMANDO ERROR

imgCarrito.src = "images/cart-1.png";
footer.innerHTML =
  "<p>Copyright 2022 - <strong>@Pantuliano Alejandro</strong></p>";

//UTILIZAMOS OPERADOR LOGICO OR : SI HAY ALGO EN EL CARRITO NOS LO DEVUELVE SINO NOS ARMA UN ARRAY VACIO
const carrito = JSON.parse(localStorage.getItem("carritoAuxB")) || [];

//RECORRER ARRAY DE PRODUCTOS Y ARMAR LAS CARDS
function cargarProductos(array) {
  let contenido = "";
  if (array.length > 0) {
    array.forEach((producto) => {
      contenido += retornoCard(producto);
    });
    container.innerHTML = contenido;
  } else {
    retornoError();
  }
}
//cargarProductos(productos) //CARGAMOS LOS PRODUCTOS EN EL HTML

//CARGAMOS LOS BOTONES ADD Y REMOVE
function activarClickBotonesAdd() {
  const botonesAdd = document.querySelectorAll(
    "button.button.button-outline.button-add"
  );
  botonesAdd.forEach((btn) => {
    btn.addEventListener("click", () => {
      let resultado = productos.find((prod) => prod.id === parseInt(btn.id));
      carrito.push(resultado);
      toast(
        "Producto " + `${resultado.nombre}` + " agregado al carrito",
        "lightgreen"
      );
    });
  });
}

//FUNCION QUE ACTIVA LOS BOTONES PARA REMOVER PRODUCTOS DEL CARRITO
function activarClickBotonesRemove() {
  const botonesRemove = document.querySelectorAll(
    "button.button.button-outline.button-remove"
  );
  botonesRemove.forEach((btn) => {
    btn.addEventListener("click", () => {
      let resultado = carrito.findIndex((prod) => prod.id === parseInt(btn.id));
      resultado !== -1
        ? carrito.splice(resultado, 1)
        : toast("El producto no esta en el carrito", "red");
    });
  });
}

//FILTRAR PRODUCTOS SEGUN LO QUE SE ESCRIBA EN EL IMPUT SEARCH , UNA VEZ QUE ENCUENTRA DEBEMOS RECARGAR LOS BOTONS ADD Y REMOVE
inputSearch.addEventListener("search", () => {
  inputSearch.value.trim() !== ""
    ? filtrarProductos()
    : cargarProductos(productos);
  activarClickBotonesAdd();
  activarClickBotonesRemove();
});

function filtrarProductos() {
  let resultado = productos.filter((producto) =>
    producto.nombre
      .toUpperCase()
      .includes(inputSearch.value.toUpperCase().trim())
  );
  resultado.length > 0
    ? cargarProductos(resultado)
    : toast("No hay coincidencias");
}

//CUANDO PASAMOS EL MOUSE SOBRE EL ICONO DEL CARRITO NOS DICE CUANTOS PRODUCTOS HAY EN EL
imgCarrito.addEventListener("mousemove", () => {
  let totalProductos = carrito.length;
  imgCarrito.title = `${totalProductos} productos en el carrito`;
});

//AL HACER CLICK EN EL CARRITO OCULTAMOS LOS PRODUCTOS , LLENAMOS LA TABLA DE PRODUCTOS ELEGIDOS , MOSTRAMOS EL CARRITO Y EL BOTON PARA CALCULAR EL TOTAL
imgCarrito.addEventListener("click", () => {
  if (carrito.length > 0) {
    localStorage.setItem("carritoBetons", JSON.stringify(carrito));
    window.location.href = "checkout.html";
  } else {
    alerta(
      true,
      0,
      "warning",
      "center",
      "CARRITO VACIO",
      "No hay productos seleccionados"
    );
  }
});
