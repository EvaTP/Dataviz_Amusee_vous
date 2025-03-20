const listDepartement = document.querySelector("#departement");
const departement = document.querySelector("#departement");

async function getDepartements() {
    const response = await fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=count(*)%20AS%20total%2C%20nom_officiel&where=nom_officiel%20!%3D%22null%22&group_by=departement");
    const newData = await response.json();
    console.log(newData);
    showDepartements(newData);
  }
  
    // Appel de cette fonction : 
  getDepartements();
  
    // Fonction qui intègre dans le HTML nom de l'artiste :
  function showDepartements(departement) {
    listDepartement.innerHTML = "";
  
    for (let i = 0; i < departement.results.length; i++) {
      const divDep = document.createElement("div");
      divDep.classList.add("depDiv");
      divDep.innerText = departement.results[i].departement;
      divDep.innerText += departement.results[i].total
      listDepartement.appendChild(divDep);
    }
  }
  // HTML
  // const mainContainer = document.querySelector("#main-container");
  // const nomMusee = document.querySelector("#nom-musee");
  // const lieu = document.querySelector("#lieu");
  // console.log('🐯 main-container :', data);
  //https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=artiste&where=artiste%20!%3D%20%22null%22&limit=20