// LES VARIABLES : ---------------------------------------------------------------
const listRegion = document.querySelector("#region");
const region = document.querySelector("#region");
const ctx = document.getElementById('myChart');


async function getRegions() {
  const response = await fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=count(*)%20AS%20total%2C%20region&group_by=region&limit=20");
  const newData = await response.json();
  console.log(newData);

  let regionList = newData.results.map(e => e.region)
  let totalList = newData.results.map(e => e.total)

  const comIndex = regionList.indexOf('COM')
  const dromIndex = regionList.indexOf('DROM')
  regionList[dromIndex] = "Outre-mer" 
  totalList[dromIndex] = totalList[dromIndex] + totalList[comIndex]
  regionList.splice(comIndex, 1)
  totalList.splice(comIndex, 1)

  console.log(regionList)
  console.log(totalList)



  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: regionList,
      datasets: [{
        label: 'Nombre de musées',
        data: totalList,
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



// HTML
// const mainContainer = document.querySelector("#main-container");
// const nomMusee = document.querySelector("#nom-musee");
// const lieu = document.querySelector("#lieu");
// console.log('🐯 main-container :', data);
//https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=artiste&where=artiste%20!%3D%20%22null%22&limit=20