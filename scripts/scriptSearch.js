const selectRegion = document.querySelector("#recherche-region");
const outputSearchRegion = document.querySelector("#outputSearchByRegion")

// async function getRegions(){
//   const response = await fetch("")
// }

selectRegion.addEventListener('change', async function() {
  const url = this.options[this.selectedIndex].dataset.url;
  if (url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        showByRegion(data.results);
    } else {
        console.error("Erreur lors de la récupération des données :", response.status);
        outputSearchRegion.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
    }
  }
});


// recherche par région
function showByRegion(region){
	outputSearchRegion.innerHTML = "";

  for (let i = 0; i < region.length; i++) {
    const divRegion = document.createElement("div");
    const museName = document.createElement("h3");
    const adresse = document.createElement("p");
    const telephone = document.createElement("p");
    const siteWeb = document.createElement("p");
    const resume = document.createElement("p");
    const themes = document.createElement("p");
    
    divRegion.classList.add("museumDiv");
    museName.classList.add("museumName");
    adresse.classList.add("museumAddress");
    telephone.classList.add("museumCity");
    siteWeb.classList.add("museumCity");
    resume.classList.add("museumResume");
    themes.classList.add("themesMusees");

    museName.innerText = region[i].nom_officiel;
    adresse.innerText = `${region[i].adresse},${region[i].code_postal}, ${region[i].ville}`;
    telephone.innerText = `Téléphone :  ${region[i].telephone}`;
    siteWeb.innerText = `Site web :  ${region[i].url}`;
    resume.innerText = `Histoire : ${region[i].histoire}`;
    themes.innerText = `Thématiques associées : ${region[i].themes}`;
    
    outputSearchRegion.appendChild(divRegion);
    divRegion.appendChild(museName);
    divRegion.appendChild(adresse);
    divRegion.appendChild(telephone);
    divRegion.appendChild(siteWeb);
    divRegion.appendChild(resume);
    divRegion.appendChild(themes);
  }
}

