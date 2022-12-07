//FUNCION DEL SIMULADOR QUE ARRANCA CON UN MENSAJE DEL TOTAL DE LA COMPRA O PODER INGRESAR OTRO VALOR
function calcular(importe) {
  if (importe != null) {
    importe = parseFloat(importe);

    if (importe != NaN && importe > 0) {
      let programa = seleccionPrograma();

      if (estaEnProgramas(programa)) {
        if (!topeAhora30(importe, programa)) {
          valorCuota = calcularCuota(importe, programa);

          alerta(
            true,
            0,
            "success",
            "center",
            "COTIZACION",
            "El importe total financiado es : $" +
              `${importeTotalFinanciado}` +
              "\n" +
              "Cantidad de cuotas: " +
              `${programa}` +
              "\n" +
              "El valor de la cuota es: $" +
              `${valorCuota}`
          );
        } else {
          alerta(
            true,
            0,
            "warning",
            "center",
            "ERROR",
            "El Programa Ahora 30 solo permite financiar importes iguales o menores a $" +
              `${ahora30Tope}`
          );
        }
      } else {
        alerta(
          true,
          0,
          "warning",
          "center",
          "ERROR",
          "Programa de financiacion incorrecto"
        );
      }
    } else {
      alerta(
        true,
        0,
        "warning",
        "center",
        "ERROR",
        "El importe ingresado es incorrecto"
      );
    }
  }
}

//FUNCION QUE PIDE UN PROGRAMA , LO VERIFICA Y LO RETORNA
function seleccionPrograma() {
  let seleccion = parseInt(cuotas.value);

  if (estaEnProgramas(seleccion)) {
    return parseInt(seleccion);
  }
}

//FUNCION QUE VERIFICA SI EL PROGRAMA ELEGIDO POR EL USUARIO SE ENCUENTRA EN LA LISTA DE PROGRAMAS VALIDOS
function estaEnProgramas(n) {
  let esta = false;
  let i = 0;
  while (!esta && i < programas.length) {
    if (programas[i] === n) {
      esta = true;
    } else {
      i++;
    }
  }
  return esta;
}

//FUNCION QUE ENVIAMOS COMO PARAMETRO IMPORTE Y PROGRAMA , NOS RETORNA EL VALOR DE LA CUOTA
function calcularCuota(imp, prog) {
  let interes = parseFloat(interesDelPrograma(prog));
  importeTotalFinanciado = (imp * interes).toFixed(2);
  return (importeTotalFinanciado / prog).toFixed(2);
}

//FUNCION QUE NOS RETORNA EL INTERES SEGUN EL PROGRAMA
function interesDelPrograma(p) {
  switch (p) {
    case 3:
      return ahora3;
    case 6:
      return ahora6;
    case 12:
      return ahora12;
    case 18:
      return ahora18;
    case 24:
      return ahora24;
    case 30:
      return ahora30;
  }
}

//FUNCION QUE NOS RETORNA TRUE O FALSE SI CUMPLE LA CONDICION QUE NO SE PUEDEN FINANCIAR MAS QUE EL TOPE EN 30 CUOTAS
function topeAhora30(imp, prog) {
  return prog === 30 && imp > ahora30Tope;
}

//FUNCION QUE GENERA LOS CARDS DE LOS PRODUCTOS
function retornoCard(producto) {
  return `<div class="card" id="card${producto.id}">
                <div class="card-image"><img src=${producto.imagen}></div>
                <div class="card-name">${producto.nombre}</div>
                <div class="card-price">$ ${producto.precio.toFixed(2)}</div>
                <div class="card-button">
                    <button class="button button-outline button-add" id="${
                      producto.id
                    }" title="Clic para agregar '${
    producto.nombre
  }' al carrito"><img src=${imageAgregar}></button>
                    <button class="button button-outline button-remove" id="${
                      producto.id
                    }" title="Eliminar '${
    producto.nombre
  }' del carrito"><img src=${imageRemove}></button>
                    
                </div> 
            </div>`;
}

//FUNCION QUE NOS RETORNA ERROR SI NO PUDO CARGAR LOS PRODUCTOS
function retornoError() {
  return `<div class="card-error">
                <h3>No pudimos cargar los productos.</h3>
                <h3>Intenta nuevamente en unos instantes...</h3>
            </div>`;
}

//CALCULA EL TOTAL DE UN ARRAY QUE SUS OBJETOS TENGAN COMO ATRIBUTO "PRECIO"
function calcularTotal(array) {
  let total = 0;
  array.forEach((element) => {
    total += element.precio;
  });

  return total;
}

//RETORNA LOS VALOR DEL ITEM QUE QUEREMOS MOSTRAR EN LA TABLA
function retornoLista(item) {
  return `<tr>
                <th>${item.nombre}</th>
                <th>$${item.precio}</th>
                <th><button class="button button-outline button-remove" id="${item.id}" title="Eliminar '${item.nombre}' del carrito"><img src=${imageRemove}></button></th>
                </tr>`;
}

//FUNCION QUE OCULTA EL ELEMENTO QUE LE PASEMOS COMO PARAMETRO
function ocultar(item) {
  item.style.visibility = "hidden";
}

//FUNCION QUE MUESTRA EL ELEMENTO QUE LE PASEMOS COMO PARAMETRO
function mostrar(item) {
  item.style.visibility = "visible";
}

//CREAMOS FUNCION PARA REALIZAR ALERTAS CON SWEETALERT2
const alerta = (toast, timer, icon, position, title, text) => {
  Swal.fire({
    toast: toast || false,
    position: position || "center",
    icon: icon || "info",
    title: title || "",
    text: text || "",
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
    timer: timer,
  });
};

//CREAMOS FUNCION PARA REALIZAR TOAST CON TEXTO Y CAMBIO DE FONDO
const toast = (text, bgcolor) => {
  Toastify({
    text: text,
    duration: 2000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: { background: bgcolor || "CornFlowerBlue", fontSize: "12px" },
  }).showToast();
};
