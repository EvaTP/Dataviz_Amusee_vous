// LES VARIABLES : ---------------------------------------------------------------

const selectRegion = document.querySelector("#recherche-region");
// const listMuseum = document.querySelector("#museumsList");
// const outputSearchRegion = document.querySelector("#outputSearchByRegion")


// LES FONCTIONS : ---------------------------------------------------------------

selectRegion.addEventListener('change', async function() {
  const url = this.options[this.selectedIndex].dataset.url;
  if (url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        showByRegion(data.results);
    } else {
        console.error("Erreur lors de la récupération des données :", response.status);
        listMuseum.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
    }
  }
});


// recherche par région
function showByRegion(region){
	listMuseum.innerHTML = "";

  for (let i = 0; i < region.length; i++) {
    
    const divRegion = document.createElement("div");
    const museName = document.createElement("h3");
    const moreInfoButton = document.createElement("button");

    // const divRegion = document.createElement("div");
    // const museName = document.createElement("h3");
    // const adresse = document.createElement("p");
    // const telephone = document.createElement("p");
    // const siteWeb = document.createElement("p");
    // const resume = document.createElement("p");
    // const themes = document.createElement("p");
    
    divRegion.classList.add("museumDiv");
    museName.classList.add("museumName");
    moreInfoButton.classList.add("moreInfoButton");

    // adresse.classList.add("museumAddress");
    // telephone.classList.add("museumCity");
    // siteWeb.classList.add("museumCity");
    // resume.classList.add("museumResume");
    // themes.classList.add("themesMusees");

    museName.innerText = region[i].nom_officiel;
    moreInfoButton.innerText = "En savoir +";


    // museName.innerText = region[i].nom_officiel;
    // adresse.innerText = `${region[i].adresse},${region[i].code_postal}, ${region[i].ville}`;
    // telephone.innerText = `Téléphone :  ${region[i].telephone}`;
    // siteWeb.innerText = `Site web :  ${region[i].url}`;
    // resume.innerText = `Histoire : ${region[i].histoire}`;
    // themes.innerText = `Thématiques associées : ${region[i].themes}`;

  // Ajouter un gestionnaire d'événements pour le bouton "En savoir plus"
  moreInfoButton.addEventListener("click", () => {
    openModal(region[i]);
  });

    listMuseum.appendChild(divRegion);
    divRegion.appendChild(museName);
    divRegion.appendChild(moreInfoButton);
 

    // listMuseum.appendChild(divRegion);
    // divRegion.appendChild(museName);
    // divRegion.appendChild(adresse);
    // divRegion.appendChild(telephone);
    // divRegion.appendChild(siteWeb);
    // divRegion.appendChild(resume);
    // divRegion.appendChild(themes);
  }
}



// Fonction pour ouvrir la modale
function openModal(museum) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";

  const museumDetails = document.createElement("div");
  museumDetails.innerHTML = `

    <h3 class="museumName">${museum.nom_officiel}</h3>
    <p class="museumAddress">Adresse: ${museum.adresse}, ${museum.code_postal}, ${museum.ville}</p>
    <p class="museumCity">Téléphone: ${museum.telephone || "Non disponible"}</p>
    <p class="museumCity">Site web: ${museum.url || "Non disponible"}</p>
    <p class="museumResume">Histoire: ${museum.histoire || "Non disponible"}</p>
    <p class="themesMusees">Thèmes: ${museum.themes || "Non disponible"}</p>
  `;

  closeButton.addEventListener("click", () => {
    modal.remove();
  });

  modalContent.appendChild(closeButton);
  modalContent.appendChild(museumDetails);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

