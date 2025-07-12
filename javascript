let carrito = [];
let cantidades = {};

function cambiarCantidad(id, cambio) {
  if (!cantidades[id]) cantidades[id] = 1;
  cantidades[id] += cambio;
  if (cantidades[id] < 1) cantidades[id] = 1;
  document.getElementById('cantidad-' + id).innerText = cantidades[id];
}

function agregarAlCarrito(nombre, precio, id) {
  const cantidad = cantidades[id] || 1;
  const existente = carrito.find(item => item.nombre === nombre);
  
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }
  
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const contenedor = document.getElementById('carrito-contenido');
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  carrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${item.nombre} - S/. ${item.precio} x ${item.cantidad} = <strong>S/. ${item.precio * item.cantidad}</strong></p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  contenedor.innerHTML += `<h3>Total: S/. ${total}</h3>`;
}

function enviarPedido() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let mensaje = "Hola! Quiero realizar el siguiente pedido:%0A";
  carrito.forEach(item => {
    mensaje += `• ${item.nombre} - S/. ${item.precio} x ${item.cantidad}%0A`;
  });
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  mensaje += `%0ATotal: S/. ${total}`;

  window.open(`https://api.whatsapp.com/send?phone=51932023344&text=${mensaje}`, "_blank");
}

