// LES VARIABLES : ---------------------------------------------------------------

const selectRegion = document.querySelector("#recherche-region");
const selectTheme = document.querySelector("#recherche-thematique");
const listMuseum = document.querySelector("#museumsList");
const resultsCountDiv = document.querySelector('#resultsCount');
const apiUrl =
  "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records";

// LES FONCTIONS : ---------------------------------------------------------------

// Fonction qui affiche TOUS LES MUSEES (API muséophile) :
async function getMuseums() {
  const response = await fetch("https://www.data.gouv.fr/fr/datasets/r/a5c5d76e-979a-4073-ba0d-0844bb3c1398");
  const data = await response.json();

  const promise = await fetch("https://www.data.gouv.fr/fr/datasets/r/ea98fdcb-5c24-4646-9823-c6d2914d0b36");
  const acrList = await promise.json();

  showMuseum(data, acrList);
}
// Appel de cette fonction :
getMuseums();

// Fonction qui intègre dans le HTML nom du musée + ville + code postal + image générale :
function showMuseum(museum, acr) {
  document.querySelector("#loader").style.display = "none";
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
    newImage.src = showIcon(selectTheme)
    moreInfoButton.innerText = "En savoir +";

    listMuseum.appendChild(newDiv);
    newDiv.appendChild(museumName);
    newDiv.appendChild(museumCity);
    newDiv.appendChild(newImage);
    newDiv.appendChild(moreInfoButton);

    // Ajouter un gestionnaire d'événements pour le bouton "En savoir plus"
    moreInfoButton.addEventListener("click", () => {
      openModal(museum[i], acr);
    });
  }
}

// afficher les icones thematiques
function showIcon(theme) {
  if (theme) {
    console.log(theme.value);
    switch (theme.value) {
      case "where=domaine_thematique%3D%22archéologie%20du%20bâti%22OR%22archéologie%22":
        return "./icones/archeologie.png";
        break;
      case "where=domaine_thematique%3D%22Arts%20décoratifs%22":
        return "./icones/artsdecoratifs.png";
        break;
      case "where=domaine_thematique%3D%22Egyptien%22":
        return "./icones/egypte.png";
        break;
      case "where=domaine_thematique%3D%22Gallo-romain%22":
        return "./icones/galloromain.png";
        break;
      case "where=domaine_thematique%3D%22Grec%22":
        return "./icones/grece.png";
        break;
      case "where=domaine_thematique%3D%22Arts%20de%20l%27Islam%22&refine=domaine_thematique%3A%22Arts%20de%20l%27Islam%22":
        return "./icones/islam.png";
        break;
      case "where=domaine_thematique%3D%22Art%20moderne%20et%20contemporain%22":
        return "./icones/artmoderne.png";
        break;
      case "where=domaine_thematique%3D%22Beaux-arts%22":
        return "./icones/beauxartspeinture.png";
        break;
      case "where=domaine_thematique%3D%22Design%22%20OR%20domaine_thematique%3D%22Mode%22":
        return "./icones/modedesign.png";
        break;
      case "where=domaine_thematique%3D%22Ethnologie%22":
        return "./icones/ethnologie.png";
        break;
      case "where=domaine_thematique%3D%22Protohistoire%22%20OR%20domaine_thematique%3D%22Histoire%22":
        return "./icones/histoire.png";
        break;
      case "where=domaine_thematique%3D%22Littérature%22":
        return "./icones/litterature.png";
        break;
      case "where=domaine_thematique%3D%22Militaria%22":
        return "./icones/militaria.png";
        break;
      case "where=domaine_thematique%3D%22Musique%20-%20chant%20-%20danse%22":
        return "./icones/musiquechantdanse.png";
        break;
      case "where=domaine_thematique%3D%22Mémoire%20de%20l%27esclavage%22OR%22Esclavage%2C%20société%20de%20plantation%2C%20histoire%20de%20La%20Réunion%2C%20colonisation%2C%20industrie%20sucrière%22":
        return "./icones/esclavage.png";
        break;
      case "where=domaine_thematique%3D%22Numismatique%22":
        return "./icones/numismatique.png";
        break;
      case "where=domaine_thematique%3D%22Peinture%22":
        return "./icones/beauxartspeinture.png";
        break;
      case "where=domaine_thematique%3D%22Photographie%22":
        return "./icones/photo.png";
        break;
      case "where=domaine_thematique%3D%22Sciences%20de%20la%20nature%22":
        return "./icones/sciences.png";
        break;
      case "where=domaine_thematique%3D%22Sciences%20fondamentales%22":
        return "./icones/sciences.png";
        break;
      case "where=domaine_thematique%3D%22Technique%20et%20industrie%22":
        return "./icones/technique-industrie.png";
        break;
      case "select=domaine_thematique&where=domaine_thematique%3D%22Afrique%22":
        return "./icones/afrique.png";
        break;
      case "select=domaine_thematique&where=domaine_thematique%3D%22Amérique%22":
        return "./icones/amerique.png";
        break;
      case "select=domaine_thematique&where=domaine_thematique%3D%22Asie%22":
        return "./icones/asie.png";
        break;
      case "select=domaine_thematique&where=domaine_thematique%3D%22Océanie%22":
        return "./icones/oceanie.png";
        break;

      default:
        return "./icones/ticketMusee.png";
        console.log("Désolé, nous n'avons plus de " + theme + ".");
    }
  }
}

// Fonction pour convertir des degrés en radian
function convertRad(input) {
  return (Math.PI * input) / 180;
}

// Fonction pour calculer la distance entre deux points géographiques
function calculateDistance(lat_a_degre, lon_a_degre, lat_b_degre, lon_b_degre) {

  R = 6378000 //Rayon de la terre en mètre

  lat_a = convertRad(lat_a_degre);
  lon_a = convertRad(lon_a_degre);
  lat_b = convertRad(lat_b_degre);
  lon_b = convertRad(lon_b_degre);

  distance = R * (Math.PI / 2 - Math.asin(Math.sin(lat_b) * Math.sin(lat_a) + Math.cos(lon_b - lon_a) * Math.cos(lat_b) * Math.cos(lat_a)))
  return distance;
}

// Fonction pour ouvrir la modale
function openModal(museum, acr) {

  const tableauDistances = [];
  for (let x = 0; x < acr.length; x++) {
    if (acr[x].numero_departement === museum.code_postal.substr(0, 2)) {
      if (acr[x].coordonnees !== null) {
        const distance = calculateDistance(acr[x].coordonnees.lat, acr[x].coordonnees.lon, museum.coordonnees.lat, museum.coordonnees.lon);
        const distanceACR = { dist: distance, titre_courant: acr[x].titre_courant, commune: `${acr[x].commune_forme_editoriale} (${acr[x].insee})`, description: acr[x].description_de_l_edifice };
        tableauDistances.push(distanceACR);
      }
    }
  }
  tableauDistances.sort(function compare(a, b) {
    if (a.dist < b.dist) {
      return -1;
    }
    if (a.dist > b.dist) {
      return 1;
    }
    return 0;
  })

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
  <br><div class="separator"></div><br>
  `;

  const detailsACR = document.createElement('div');
  detailsACR.classList.add('detailsACRModale');
  detailsACR.innerHTML = `
  <h3 class="ACRTitle"><strong>Pour compléter votre visite, <br>vous trouverez ci-dessous les 3 architectures contemporaines remarquables les plus proches de ce musée : </strong></h3><br>
  <h4 class="ACRName"><strong>${tableauDistances[0].titre_courant}</strong></h4>
  <p class="CommuneACR">${tableauDistances[0].commune}</p>
  <p class="descriptionACR">${tableauDistances[0].description || ""}</p>
  <br>
  <h4 class="ACRName"><strong>${tableauDistances[1].titre_courant}</strong></h4>
  <p class="CommuneACR">${tableauDistances[1].commune}</p>
  <p class="descriptionACR">${tableauDistances[1].description || ""}</p>
  <br>
  <h4 class="ACRName"><strong>${tableauDistances[2].titre_courant}</strong></h4>
  <p class="CommuneACR">${tableauDistances[2].commune}</p>
  <p class="descriptionACR">${tableauDistances[2].description || ""}</p>
  `

  closeButton.addEventListener("click", () => {
    modal.remove();
  });

  modalContent.appendChild(closeButton);
  modalContent.appendChild(museumDetails);
  modalContent.appendChild(detailsACR)
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  document.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.remove();
    }
  });
}
// ____________________________________________________________

// Fonction afficher les résultats des menus déroulants REGION et THEMATIQUE
// on ajoute l'url de base de l'API (apiUrl) à la châine de requête ("?")

async function showSearchResults() {
  listMuseum.innerHTML = ""; // rajout de ceci pour effacer la précédente recherche

  let regionQuery = selectRegion.value;
  let themeQuery = selectTheme.value;
  let fullUrl = apiUrl;

  // construire l'url avec les filtres sélectionnés
  if (regionQuery || themeQuery) {
    fullUrl += "?";
    if (regionQuery) {
      fullUrl += regionQuery;
      if (themeQuery) {
        fullUrl += "&" + themeQuery;
      }
    } else if (themeQuery) {
      fullUrl += themeQuery;
    }
  }
  const response = await fetch(fullUrl);

  const promise = await fetch("https://www.data.gouv.fr/fr/datasets/r/ea98fdcb-5c24-4646-9823-c6d2914d0b36");
  const acrList = await promise.json();

  if (!response.ok) {
    console.error(
      "Erreur lors de la récupération des données :",
      response.status
    );
    listMuseum.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
    return; // Arrête l'exécution de la fonction en cas d'erreur
  }

  const data = await response.json();
  const searchResults = data.results; // variable qui stocke les résultats de la recherche

  // Affiche le nombre de résultats
  const resultCount = searchResults.length;
  const resultCountElement = document.createElement("p");
  resultCountElement.innerText = `Nombre de résultats : ${resultCount}`;
  resultCountElement.classList.add("compteurReponses");

  if (resultCount === 0) {
    listMuseum.innerHTML += "<p>Aucun résultat pour votre recherche.</p>";
  } else {
    showMuseum(searchResults, acrList);
  }
  // Ajoute le compteur avant la liste des musées
  resultsCountDiv.innerText = "";
  resultsCountDiv.appendChild(resultCountElement);
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
