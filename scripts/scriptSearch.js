// LES VARIABLES : ---------------------------------------------------------------

const selectRegion = document.querySelector("#recherche-region");
const selectTheme = document.querySelector("#recherche-thematique");
const listMuseum = document.querySelector("#museumsList");
const url = "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records";

// LES FONCTIONS : ---------------------------------------------------------------


// fonction afficher les résultats des menus déroulants REGION et THEMATIQUE

async function showSearchResults(){
  let regionQuery = selectRegion.value;
  let themeQuery = selectTheme.value;
  let fullUrl = url;

  if(regionQuery || themeQuery){
    fullUrl += "?";
    if(regionQuery){
      fullUrl += regionQuery;
      if(themeQuery){
        fullUrl += "&" + themeQuery;
      }
    }else if(themeQuery){
      fullUrl += themeQuery;
    }
  }
  const response = await fetch(fullUrl);

  if (!response.ok) {
    console.error("Erreur lors de la récupération des données :", response.status);
    listMuseum.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
    return; // Arrête l'exécution de la fonction en cas d'erreur
  }

  const data = await response.json();
  // Appel à une fonction dans script.js pour afficher les résultats
  window.showMuseum(data.results);
}

selectRegion.addEventListener("change", showSearchResults);
selectTheme.addEventListener("change", showSearchResults);
  // selectRegion.addEventListener('change', async function() {
  //     const url = this.options[this.selectedIndex].dataset.url;
  //     if (selectRegion.value) {
  //       const response = await fetch(url);
  //       if (response.ok) {
  //           const data = await response.json();
  //           showSearchResults(data.results);
  //       } else {
  //           console.error("Erreur lors de la récupération des données :", response.status);
  //           listMuseum.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
  //       }
  //     }
  //   });

//}




// RECHERCHE PAR REGION
// --------------------
// selectRegion.addEventListener('change', async function() {
//   const url = this.options[this.selectedIndex].dataset.url;
//   if (url) {
//     const response = await fetch(url);
//     if (response.ok) {
//         const data = await response.json();
//         showByRegion(data.results);
//     } else {
//         console.error("Erreur lors de la récupération des données :", response.status);
//         listMuseum.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
//     }
//   }
// });


// function showByRegion(region){
// 	listMuseum.innerHTML = "";

//   for (let i = 0; i < region.length; i++) {
//     const divRegion = document.createElement("div");
//     const museName = document.createElement("h3");
//     const museCity = document.createElement("h3");
//     const newImageRegion = document.createElement("img");
//     const moreInfoButton = document.createElement("button");

    // const divRegion = document.createElement("div");
    // const museName = document.createElement("h3");
    // const adresse = document.createElement("p");
    // const telephone = document.createElement("p");
    // const siteWeb = document.createElement("p");
    // const resume = document.createElement("p");
    // const themes = document.createElement("p");
    
    // divRegion.classList.add("museumDiv");
    // museName.classList.add("museumName");
    // museCity.classList.add("museumCity");
    // newImageRegion.classList.add("museumImage");
    // moreInfoButton.classList.add("moreInfoButton");

    // adresse.classList.add("museumAddress");
    // telephone.classList.add("museumCity");
    // siteWeb.classList.add("museumCity");
    // resume.classList.add("museumResume");
    // themes.classList.add("themesMusees");

    museName.innerText = region[i].nom_officiel;
    museCity.innerText = region[i].ville;
    newImageRegion.src = "./images/ticket_musee.png";
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
    divRegion.appendChild(museCity);
    divRegion.appendChild(newImageRegion);
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

// Fonction pour ouvrir la MODALE REGION
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



// RECHERCHE PAR THEMATIQUE
// ------------------------

// selectTheme.addEventListener('change', async function() {
//   const url = this.options[this.selectedIndex].dataset.url;
//   if (url) {
//     const response = await fetch(url);
//     if (response.ok) {
//         const data = await response.json();
//         showByTheme(data.results);
//     } else {
//         console.error("Erreur lors de la récupération des données :", response.status);
//         listMuseum.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
//     }
//   }
// });


// function showByTheme(theme){
// 	listMuseum.innerHTML = "";

//   for (let i = 0; i < theme.length; i++) {
//     const divTheme = document.createElement("div");
//     const museNameTheme = document.createElement("h3");
//     const museCityTheme = document.createElement("h3");
//     const newImageTheme = document.createElement("img");
//     const moreInfoButtonTheme = document.createElement("button");
    
//     divTheme.classList.add("museumDiv");
//     museNameTheme.classList.add("museumName");
//     museCityTheme.classList.add("museumCity");
//     newImageTheme.classList.add("museumImage");
//     moreInfoButtonTheme.classList.add("moreInfoButton");

//     museNameTheme.innerText = theme[i].nom_officiel;
//     museCityTheme.innerText = theme[i].ville;
//     newImageTheme.src = "./images/ticket_musee.png";
//     moreInfoButtonTheme.innerText = "En savoir +";


//   // Ajouter un gestionnaire d'événements pour le bouton "En savoir plus"
//   moreInfoButtonTheme.addEventListener("click", () => {
//     openModal(domaine_thematique[i]);
//   });
//     listMuseum.appendChild(divTheme);
//     divTheme.appendChild(museNameTheme);
//     divTheme.appendChild(moreInfoButtonTheme);
 // }
// }

