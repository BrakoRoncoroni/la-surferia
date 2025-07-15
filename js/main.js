let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let tablas = [];

// Cargar datos desde JSON simulado
fetch("../data/tablas.json")
  .then((res) => res.json())
  .then((data) => {
    tablas = data;
    mostrarTablas();
    actualizarCarrito();
  })
  .catch(() => {
    Swal.fire("Error", "No se pudieron cargar los productos", "error");
  });

// Mostrar productos dinámicamente
function mostrarTablas() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  tablas.forEach((tabla) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h3>${tabla.nombre}</h3>
      <p>Precio: $${tabla.precio}</p>
      <button onclick="agregarAlCarrito(${tabla.id})">Agregar al Carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const tabla = tablas.find((item) => item.id === id);
  carrito.push(tabla);
  guardarCarrito();
  actualizarCarrito();

  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: `${tabla.nombre} se agregó al carrito.`,
    timer: 1500,
    showConfirmButton: false
  });
}

// Actualizar carrito en HTML
function actualizarCarrito() {
  const lista = document.getElementById("carrito");
  const total = document.getElementById("total");
  lista.innerHTML = "";

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    lista.appendChild(li);
  });

  const sumaTotal = carrito.reduce((acc, item) => acc + item.precio, 0);
  total.textContent = sumaTotal.toFixed(2);
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar carrito
document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();

  Swal.fire("Carrito vacío", "Se han eliminado todos los productos.", "info");
});

// Aplicar descuento
document.getElementById("descuento").addEventListener("click", () => {
  const input = document.getElementById("cupon").value.trim();
  const codigoValido = "CODER-SURFEA";
  const totalTexto = document.getElementById("total");
  const totalNumero = parseFloat(totalTexto.textContent);

  if (input.toLowerCase() === codigoValido.toLowerCase()) {
    const totalConDescuento = totalNumero * 0.65;
    totalTexto.innerHTML = `${totalConDescuento.toFixed(2)} <span class="descuento-aplicado">35% OFF aplicado</span>`;

    Swal.fire({
      icon: "success",
      title: "¡Descuento aplicado!",
      text: "Obtuviste un 35% de descuento.",
      timer: 2000,
      showConfirmButton: false
    });
  } else {
    Swal.fire("Código inválido", "El código ingresado no es correcto.", "warning");
  }
});
