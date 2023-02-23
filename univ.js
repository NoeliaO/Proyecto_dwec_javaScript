window.onload = function () {
  //funcion que crea los elementos
  setElementos();
  //funcion del reloj cada segundo para que se actualice
  setInterval(() => {
    setHora();
  }, 1000);
  petiJSON("star_wars.json");
};

//crea los elementos una vez
function setElementos() {
  let form = document.querySelector("form");

  //parrafo para guardar el reloj
  let p = document.createElement("p");
  p.id = "reloj";
  form.before(p);

  //div para la tabla
  let divTabla = document.createElement("div");
  divTabla.id = "divtabla";
  form.after(divTabla);
}

//recoge la hora actual
function setHora() {
  let horaActual = new Date();
  const ahora =
    horaActual.getHours() +
    ":" +
    horaActual.getMinutes() +
    ":" +
    horaActual.getSeconds();
  //parrafo con id reloj
  document.querySelector("#reloj").textContent = ahora;
}

//recoge el json con el evento
function petiJSON(file) {
  fetch(file)
    //recogemos json
    .then((response) => response.json())
    //enviamos los datos a la función set tabla
    .then((data) => {
      setSelect(data);
    });
}

//da valores al select
function setSelect(data) {
  //select en una variable
  let select = document.querySelector("#planeta");
  //
  let lista = new Array();
  let planetas = data.UNIVERSO;

  //por cada elemento creamos una opción nueva cuyo valor será el texto introducido
  planetas.forEach((elemento) => {
    let opcion = document.createElement("option");
    opcion.value = elemento.PLANETA;
    opcion.textContent = elemento.PLANETA;
    //lo añadimos al select
    select.appendChild(opcion);
  });

  //
  select.addEventListener("change", (event) => {
    setTabla(event, planetas);
  });
}

//rellena la tabla
function setTabla(e, planetas) {
  // console.log(e.target.value);

  //borramos la tabla
  if (document.querySelector('table')) {
      document.querySelector('table').remove();
  }

  //Elemento tabla
  let tabla = document.createElement("table");
  tabla.style.border = "1px solid black";
  document.body.appendChild(tabla);
  let pl = tabla.appendChild(document.createElement("th"));
  pl.style.border = "1px solid black";
  let desc = tabla.appendChild(document.createElement("th"));
  desc.style.border = "1px solid black";
  let hab = tabla.appendChild(document.createElement("th"));
  hab.style.border = "1px solid black";

  //El texto será el valor del option correspondiente
  for (let i = 0; i <= planetas.length; i++) {
    if (planetas[i].PLANETA == e.target.value) {
      let tr = tabla.appendChild(document.createElement("tr"));
      let habitantes = document.createElement("td");
      habitantes.style.border = "1px solid black";
      let descripcion = document.createElement("td");
      descripcion.style.border = "1px solid black";
      let planet = document.createElement("td");
      planet.style.border = "1px solid black";

      //texto con los datos del array del json
      habitantes.textContent = planetas[i].HABITANTES;
      descripcion.textContent = planetas[i].DESCIPCION;
      planet.textContent = planetas[i].PLANETA;

      //add tabla
      pl.textContent='PLANETA';
      desc.textContent="DESCRIPCION";
      hab.textContent="HABITANTES";
      tr.appendChild(planet);
      tr.appendChild(descripcion);
      tr.appendChild(habitantes);
    }
  }


  tabla.addEventListener("click", cookie(e.target.value))
}

function cookie(planeta){
    localStorage.setItem("nombre",planeta);
    window.open("planeta.html");
}
