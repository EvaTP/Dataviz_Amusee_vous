const listRegion = document.querySelector("#region");
const region = document.querySelector("#region");

async function getRegions() {
    const response = await fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=count(*)%20AS%20total%2C%20region&group_by=region&limit=20");
    const newData = await response.json();

    console.log(newData);
    showRegions(newData);
  }
  
    // Appel de cette fonction : 
  getRegions();
  
    // Fonction qui intègre dans le HTML nom de l'artiste :
  function showRegions(region) {
    listRegion.innerHTML = "";
  
    for (let i = 0; i < region.results.length; i++) {
      const divReg = document.createElement("div");
      divReg.classList.add("regDiv");
      divReg.innerText = region.results[i].region;
      divReg.innerText += region.results[i].total
      listRegion.appendChild(divReg);
      
    }
  }
  // HTML
  // const mainContainer = document.querySelector("#main-container");
  // const nomMusee = document.querySelector("#nom-musee");
  // const lieu = document.querySelector("#lieu");
  // console.log('🐯 main-container :', data);
  //https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=artiste&where=artiste%20!%3D%20%22null%22&limit=20