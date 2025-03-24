// LES VARIABLES : ---------------------------------------------------------------

const selectRegion = document.querySelector("#recherche-region");
const selectTheme = document.querySelector("#recherche-thematique");
const listMuseum = document.querySelector("#museumsList");
const apiUrl = "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records";

// LES FONCTIONS : ---------------------------------------------------------------

// Fonction qui affiche TOUS LES MUSEES (API muséophile) :
async function getMuseums() {
  const response = await fetch("https://www.data.gouv.fr/fr/datasets/r/a5c5d76e-979a-4073-ba0d-0844bb3c1398");
  const data = await response.json();
  showMuseum(data);
}
// Appel de cette fonction :
getMuseums();

// Fonction qui intègre dans le HTML nom du musée + ville + code postal + image générale :
function showMuseum(museum) {
  listMuseum.innerHTML = "";
  for (let i = 0; i < museum.length; i++) {
      const newDiv = document.createElement("div");
      const museumName = document.createElement("h3");
      const museumCity = document.createElement("h3");
      const newImage = document.createElement("img");
      const moreInfoButton = document.createElement("button");

      newDiv.classList.add("museumDiv");
      museumName.classList.add("museumName");
      museumCity.classList.add("museumCity");
      newImage.classList.add("museumImage");
      moreInfoButton.classList.add("moreInfoButton");

      museumName.innerText = museum[i].nom_officiel;
      museumCity.innerText = `${museum[i].ville} (${museum[i].code_postal})`;
      newImage.src = "./images/ticket_musee.png";
      moreInfoButton.innerText = "En savoir +";

      listMuseum.appendChild(newDiv);
      newDiv.appendChild(museumName);
      newDiv.appendChild(museumCity);
      newDiv.appendChild(newImage);
      newDiv.appendChild(moreInfoButton);

      // Ajouter un gestionnaire d'événements pour le bouton "En savoir plus"
      moreInfoButton.addEventListener("click", () => {
          openModal(museum[i]);
      });
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
  <p class="museumAddress">Adresse : ${museum.adresse}, ${museum.code_postal}, ${museum.ville}</p>
  <p class="museumCity">Téléphone : ${museum.telephone || "Non disponible"}</p>
  <p class="museumCity">Site web : <a href=http://${museum.url}> ${museum.url || "Non disponible"}</a></p>
  <p class="museumResume">Histoire : ${museum.histoire || "Non disponible"}</p>
  <p class="themesMusees">Thèmes : ${museum.themes || "Non disponible"}</p>
  `;

  closeButton.addEventListener("click", () => {
      modal.remove();
  });

  modalContent.appendChild(closeButton);
  modalContent.appendChild(museumDetails);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  document.addEventListener('click', (event) => {
      if (event.target == modal) {
          modal.remove()
      };
  })
}
// ____________________________________________________________

// Fonction afficher les résultats des menus déroulants REGION et THEMATIQUE
// on ajoute l'url de base de l'API (apiUrl) à la châine de requête ("?")

async function showSearchResults(){

  listMuseum.innerHTML = "";   // rajout de ceci pour effacer la précédente recherche

  let regionQuery = selectRegion.value;
  let themeQuery = selectTheme.value;
  let fullUrl = apiUrl;

    // construire l'url avec les filtres sélectionnés
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
  const searchResults = data.results;  // variable qui stocke les résultats de la recherche


  // Affiche le nombre de résultats
  const resultCount = searchResults.length;
  const resultCountElement = document.createElement("p");
  resultCountElement.textContent = `Nombre de résultats : ${resultCount}`;
  resultCountElement.classList.add("compteurReponses");

  // Ajoute le compteur avant la liste des musées
  listMuseum.prepend(resultCountElement);

  if (resultCount === 0) {
    listMuseum.innerHTML += "<p>Aucun résultat pour votre recherche.</p>";
  } else {
    showMuseum(searchResults);
  }

  // Appel à une fonction dans script.js pour afficher les résultats
  // showMuseum(searchResults);
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

//     const divRegion = document.createElement("div");
//     const museName = document.createElement("h3");
//     const adresse = document.createElement("p");
//     const telephone = document.createElement("p");
//     const siteWeb = document.createElement("p");
//     const resume = document.createElement("p");
//     const themes = document.createElement("p");
    
//     divRegion.classList.add("museumDiv");
//     museName.classList.add("museumName");
//     museCity.classList.add("museumCity");
//     newImageRegion.classList.add("museumImage");
//     moreInfoButton.classList.add("moreInfoButton");

//     adresse.classList.add("museumAddress");
//     telephone.classList.add("museumCity");
//     siteWeb.classList.add("museumCity");
//     resume.classList.add("museumResume");
//     themes.classList.add("themesMusees");

//     museName.innerText = region[i].nom_officiel;
//     museCity.innerText = `${region[i].ville} (${region[i].code_postal})`;
//     newImageRegion.src = "./images/ticket_musee.png";
//     moreInfoButton.innerText = "En savoir +";

    // museName.innerText = region[i].nom_officiel;
    // adresse.innerText = `${region[i].adresse},${region[i].code_postal}, ${region[i].ville}`;
    // telephone.innerText = `Téléphone :  ${region[i].telephone}`;
    // siteWeb.innerText = `Site web :  ${region[i].url}`;
    // resume.innerText = `Histoire : ${region[i].histoire}`;
    // themes.innerText = `Thématiques associées : ${region[i].themes}`;


      // Ajouter un gestionnaire d'événements pour le bouton "En savoir plus"
    //   moreInfoButton.addEventListener("click", () => {
    //     openModal(region[i]);
    //   });

    // listMuseum.appendChild(divRegion);
    // divRegion.appendChild(museName);
    // divRegion.appendChild(museCity);
    // divRegion.appendChild(newImageRegion);
    // divRegion.appendChild(moreInfoButton);
 
    // listMuseum.appendChild(divRegion);
    // divRegion.appendChild(museName);
    // divRegion.appendChild(adresse);
    // divRegion.appendChild(telephone);
    // divRegion.appendChild(siteWeb);
    // divRegion.appendChild(resume);
    // divRegion.appendChild(themes);
  //}
//}

// Fonction pour ouvrir la MODALE REGION
// function openModal(museum) {
//   const modal = document.createElement("div");
//   modal.classList.add("modal");

//   const modalContent = document.createElement("div");
//   modalContent.classList.add("modal-content");

//   const closeButton = document.createElement("span");
//   closeButton.classList.add("close-button");
//   closeButton.innerHTML = "&times;";

//   const museumDetails = document.createElement("div");
//   museumDetails.innerHTML = `
//     <h3 class="museumName">${museum.nom_officiel}</h3>
//     <p class="museumAddress">Adresse : ${museum.adresse}, ${museum.code_postal}, ${museum.ville}</p>
//     <p class="museumCity">Téléphone : ${museum.telephone || "Non disponible"}</p>
//     <p class="museumCity">Site web : <a href=http://${museum.url}> ${museum.url || "Non disponible"}</a></p>
//     <p class="museumResume">Histoire : ${museum.histoire || "Non disponible"}</p>
//     <p class="themesMusees">Thèmes : ${museum.themes || "Non disponible"}</p>
//   `;

//   closeButton.addEventListener("click", () => {
//     modal.remove();
//   });

//   modalContent.appendChild(closeButton);
//   modalContent.appendChild(museumDetails);
//   modal.appendChild(modalContent);
//   document.body.appendChild(modal);

//   document.addEventListener('click', (event) => {
//     if (event.target == modal) {
//       modal.remove()
//     };
//   })
// }



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


  // Ajouter un gestionnaire d'événements pour le bouton "En savoir plus"
//   moreInfoButtonTheme.addEventListener("click", () => {
//     openModal(domaine_thematique[i]);
//   });
//     listMuseum.appendChild(divTheme);
//     divTheme.appendChild(museNameTheme);
//     divTheme.appendChild(moreInfoButtonTheme);
//  }
// }

