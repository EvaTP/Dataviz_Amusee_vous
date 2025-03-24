const listRegion = document.querySelector("#region");
const region = document.querySelector("#region");



async function getRegions() {
  const response = await fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=count(*)%20AS%20total%2C%20region&group_by=region&limit=20");
  const newData = await response.json();

  console.log(newData);
  


  const ctx = document.getElementById('myChart');

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

  let regionNames =[];
  for (let i = 0; i < region.results.length; i++) {
        regionNames[i] = region.results[i].region;
        //ctx.fillStyle = "#6B2737"
  }
  return regionNames;
}

function extractTotaux(total)
{
  let totalMuseums = [];
  for (let  i=0; i< total.results.length; i++)
  {
    totalMuseums[i] = total.results[i].total; 
  }
  return totalMuseums;
}
// HTML
// const mainContainer = document.querySelector("#main-container");
// const nomMusee = document.querySelector("#nom-musee");
// const lieu = document.querySelector("#lieu");
// console.log('🐯 main-container :', data);
//https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=artiste&where=artiste%20!%3D%20%22null%22&limit=20