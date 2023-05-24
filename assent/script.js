document.addEventListener("DOMContentLoaded", function() {
  const api = "https://digimon-api.vercel.app/api/digimon";

  fetch(api)
    .then(response => response.json())
    .then(data => {
      const apiDataContainer = document.getElementById("apiData");

      data.forEach(item => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.style.width = "18rem";

        const imagenElement = document.createElement("img");
        imagenElement.src = item.img;
        imagenElement.classList.add("card-img-top");
        imagenElement.alt = "Digimon";

        const cardBodyElement = document.createElement("div");
        cardBodyElement.classList.add("card-body");

        const nombreElement = document.createElement("p");
        nombreElement.classList.add("card-text");
        nombreElement.textContent = "Nombre: " + item.name;

        const nivelElement = document.createElement("p");
        nivelElement.classList.add("card-text");
        nivelElement.textContent = "Nivel: " + item.level;

        cardBodyElement.appendChild(nombreElement);
        cardBodyElement.appendChild(nivelElement);
        cardElement.appendChild(imagenElement);
        cardElement.appendChild(cardBodyElement);

        apiDataContainer.appendChild(cardElement);
      });
    })
    .catch(error => {
      console.log("No se puede obtener la información:", error);
    });
});

// elija un Digimon

function mostrarNombres(nombres) {
  const dropdown = document.getElementById("nombre");

  nombres.forEach(nombre => {
    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    dropdown.appendChild(option);
  });
}

function mostrarNiveles(niveles) {
const dropdown = document.getElementById("nivel");

niveles.forEach(nivel => {
  const option = document.createElement("option");
  option.value = nivel;
  option.textContent = nivel;
  dropdown.appendChild(option);
});
}

function buscarPorNombre(nombre) {
const url = `https://digimon-api.vercel.app/api/digimon/name/${nombre}`;



fetch(url)
  .then(response => response.json())
  .then(data => {
    const informacionDiv = document.getElementById("informacion");
    informacionDiv.innerHTML = "";

    if (data.length > 0) {
      data.forEach(digimon => {
        const card = createCard(digimon);
        informacionDiv.appendChild(card);
      });
    } else {
      informacionDiv.innerHTML = "No se encontraron Digimon con ese nombre";
    }
  })
  .catch(error => console.error(error));
}

function buscarPorNivel(nivel) {
const url = `https://digimon-api.vercel.app/api/digimon/level/${nivel}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const informacionDiv = document.getElementById("informacion");
    informacionDiv.innerHTML = "";

    if (data.length > 0) {
      data.forEach(digimon => {
        const card = createCard(digimon);
        informacionDiv.appendChild(card);
      });
    } else {
      informacionDiv.innerHTML = "No se encontraron Digimon con ese nivel";
    }
    
  })
  .catch(error => console.error(error));
}

function createCard(digimon) {
const card = document.createElement("div");
card.classList.add("card", "text-center");

const image = document.createElement("img");
image.classList.add("card-img-top");
image.src = digimon.img;
image.alt = digimon.name;
card.appendChild(image);

const cardBody = document.createElement("div");
cardBody.classList.add("card-body");
card.appendChild(cardBody);

const name = document.createElement("h5");
name.classList.add("card-title");
name.textContent = digimon.name;
cardBody.appendChild(name);

const level = document.createElement("p");
level.classList.add("card-text");
level.textContent = `Nivel: ${digimon.level}`;
cardBody.appendChild(level);

return card;
}

function obtenerNombres() {
const url = "https://digimon-api.vercel.app/api/digimon";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const nombres = data.map(item => item.name);
    mostrarNombres(nombres);
  })
  .catch(error => console.error(error));
}

function obtenerNiveles() {
const url = "https://digimon-api.vercel.app/api/digimon";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const niveles = [...new Set(data.map(item => item.level))];
    mostrarNiveles(niveles);
  })
  .catch(error => console.error(error));
}

obtenerNombres();
obtenerNiveles();