// LES VARIABLES : ---------------------------------------------------------------
const listRegion = document.querySelector("#region");
const region = document.querySelector("#region");
const ctx = document.getElementById('myChart');


async function getRegions() {
  const response = await fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=count(*)%20AS%20total%2C%20region&group_by=region&limit=20");
  const newData = await response.json();
  console.log(newData);





  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: extractRegions(newData),
      datasets: [{
        label: 'Nombre de musées',
        data: extractTotaux(newData),
        borderWidth: 1,
        backgroundColor: 'rgb(67, 22, 38)',


      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Appel de cette fonction : 
getRegions();

// Fonction qui intègre dans le HTML nom de l'artiste :
function extractRegions(region) {

  let regionNames = [];
  for (let i = 0; i < region.results.length; i++) {
    if (region.results[i].region != "COM")
      regionNames[i] = region.results[i].region;

    if (region.results[i].region == "DROM")
      regionNames[i] = "Outre Mer";

  }
  console.log('debug : ', regionNames)
  return regionNames;
}

function extractTotaux(data) {
  let totalMuseums = [];
  let totalCom =[];
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i].region =="COM" )
      {
         totalCom = data.results[i].total;
        
      } 
     else if (data.results[i].region =="DROM")
        {
          data.results[i].total = data.results[i].total + totalCom;
        } 
    totalMuseums[i] = data.results[i].total;

  }
  return totalMuseums;
}
// HTML
// const mainContainer = document.querySelector("#main-container");
// const nomMusee = document.querySelector("#nom-musee");
// const lieu = document.querySelector("#lieu");
// console.log('🐯 main-container :', data);
//https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=artiste&where=artiste%20!%3D%20%22null%22&limit=20