// Lista de tablas de surf disponibles
const tablas = [
  { id: 1, 
    nombre: "Shortboard Pro", 
    precio: 120000 },
  { id: 2, 
    nombre: "Longboard Classic", 
    precio: 150000 },
  { id: 3, 
    nombre: "Fish Retro", 
    precio: 130000 },
  { id: 4, 
    nombre: "Funboard School", 
    precio: 110000 },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar productos
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

// Agregar al carrito
function agregarAlCarrito(id) {
  const tabla = tablas.find((item) => item.id === id);
  carrito.push(tabla);
  guardarCarrito();
  actualizarCarrito();
}

// Actualizar el carrito
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
  total.textContent = sumaTotal;
}

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar carrito
document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
});

// Inicializar app
mostrarTablas();
actualizarCarrito();

let descuento = document.getElementById("descuento");
descuento.addEventListener("click", function(){
  let input = document.getElementById("cupon");
  let codigoValido = "CODER-SURFEA";

  let totalTexto = document.getElementById("total");
  let totalNumero = parseFloat(totalTexto.textContent);

  if (input.value.toLowerCase() === codigoValido.toLowerCase()) {
    let totalConDescuento = totalNumero * 0.65;
totalTexto.innerHTML = `${totalConDescuento.toFixed(2)} <span class="descuento-aplicado">35% OFF aplicado</span>`;
  } else {
    alert("Código incorrecto");
  }
});
