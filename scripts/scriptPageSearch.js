// ------------------------------------------------------------------------------------- //
//                                  Hello la team,                                       //
// Pour info, j'ai fusionné et simplifié le code des pages script.js et scriptSearch.js  //
//         Tout est sur cette page-ci. Je ne l'ai pas encore liée à search.html          //
//  En fait dans scriptSearch, les fonctions étaient réécrites plusieurs fois alors que  //
//          showMuseum() était suffisante pour faire le travail à chaque fois.           //
//   Et sinon j'ai aussi restructuré ce fichier js comme on nous a conseillé de faire,   //
//   c'est-à-dire d'abord les variables, puis les fonctions, puis les event listeners.   //
// ------------------------------------------------------------------------------------- //


// LES VARIABLES : ---------------------------------------------------------------

const listMuseum = document.querySelector("#museumsList");
const selectRegion = document.querySelector("#recherche-region");
const selectTheme = document.querySelector("#recherche-thematique");


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

async function getMuseumsByRegion() {
    const response = await fetch("https://www.data.gouv.fr/fr/datasets/r/a5c5d76e-979a-4073-ba0d-0844bb3c1398");
    const data = await response.json();
    showMuseum(data);
}
function showMuseumByRegion(data, regionGiven) {
    for (let x = 0 ; x < data.length ; x++) {
        if (data.region === regionGiven) {
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
}

// LES EVENT LISTENERS : ---------------------------------------------------------

// Liste déroulante de sélection de région :
selectRegion.addEventListener('change', async function () {
    const url = this.options[this.selectedIndex].dataset.url;
    if (url) {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            showMuseum(data.results);
        } else {
            console.error("Erreur lors de la récupération des données :", response.status);
            listMuseum.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
        }
    }
});

// Liste déroulante de sélection de thème :
selectTheme.addEventListener('change', async function () {
    const url = this.options[this.selectedIndex].dataset.url;
    if (url) {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            showMuseum(data.results);
        } else {
            console.error("Erreur lors de la récupération des données :", response.status);
            listMuseum.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
        }
    }
});

