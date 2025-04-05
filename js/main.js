// ========== LÓGICA PARA OFERTAS (Agregar al carrito) ==========

document.addEventListener("DOMContentLoaded", function () {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
  
    botonesAgregar.forEach(boton => {
      boton.addEventListener("click", function () {
        const curso = {
          nombre: this.dataset.nombre,
          precio: parseFloat(this.dataset.precio),
          cantidad: 1
        };
  
        agregarAlCarrito(curso);
      });
    });
  
    function agregarAlCarrito(curso) {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
      const existe = carrito.find(item => item.nombre === curso.nombre);
      if (existe) {
        existe.cantidad += 1;
      } else {
        carrito.push(curso);
      }
  
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert("Curso agregado al carrito 🛒");
    }
  });
  
  // ========== LÓGICA PARA CARRITO.HTML ==========
  
  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("lista-carrito")) {
      mostrarCarrito();
    }
  });
  
  function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const tabla = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
  
    tabla.innerHTML = "";
    let total = 0;
  
    carrito.forEach((curso, index) => {
      const subtotal = curso.precio * curso.cantidad;
      total += subtotal;
  
      const fila = `
        <tr>
          <td>${curso.nombre}</td>
          <td>$${curso.precio}</td>
          <td>${curso.cantidad}</td>
          <td>$${subtotal}</td>
          <td><button onclick="eliminarCurso(${index})">❌</button></td>
        </tr>
      `;
  
      tabla.innerHTML += fila;
    });
  
    totalElemento.textContent = total.toFixed(2);
  }
  
  function eliminarCurso(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }
  