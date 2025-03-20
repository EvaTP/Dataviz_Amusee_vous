// LES VARIABLES : ---------------------------------------------------------------

const findMuseum = document.querySelector("#findMuseum");
const museumMap = document.querySelector("#museumMap");

const listMuseum = document.querySelector("#museumsList");



// LES FONCTIONS : ---------------------------------------------------------------

  // Fonction qui affiche tous les musées (API muséophile) :
async function getMuseums() {
  const response = await fetch("https://www.data.gouv.fr/fr/datasets/r/a5c5d76e-979a-4073-ba0d-0844bb3c1398");
  const data = await response.json();
  showMuseum(data);
}
  // Appel de cette fonction : 
getMuseums();

  // Fonction qui intègre dans le HTML nom du musée + ville + code postal + image générale :
function showMuseum(musee) {
  listMuseum.innerHTML = "";
  for (let i = 0; i < musee.length; i++) {
    const newDiv = document.createElement("div");
    const museumName = document.createElement("h3");
    const museumCity = document.createElement("h3");
    const newImage = document.createElement("img");

    newDiv.classList.add("museumDiv");
    museumName.classList.add("museumName");
    museumCity.classList.add("museumCity");
    newImage.classList.add("museumImage");

    museumName.innerText = musee[i].nom_officiel;
    museumCity.innerText = `${musee[i].ville} (${musee[i].code_postal})`;
    newImage.src = "./images/ticket_musee.png";
    listMuseum.appendChild(newDiv);
    newDiv.appendChild(museumName);
    newDiv.appendChild(museumCity);
    newDiv.appendChild(newImage);
  }
}

  // Fonction qui affiche tous les artistes (API joconde) :
