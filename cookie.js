window.onload = function () {
  let dato = localStorage.getItem("nombre");

  let h1 = document.createElement("h1");
  h1.textContent(dato);
  document.body.appendChild(h1);
}
