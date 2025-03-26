// LES VARIABLES : ---------------------------------------------------------------
const ctx = document.getElementById('myChart');

// LES FONCTIONS : ---------------------------------------------------------------

async function getRegions() {
  const response = await fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=count(*)%20AS%20total%2C%20region&group_by=region&limit=20");
  const newData = await response.json();

  let regionList = newData.results.map(e => e.region);
  let totalList = newData.results.map(e => e.total);

  const comIndex = regionList.indexOf('COM');
  const dromIndex = regionList.indexOf('DROM');
  regionList[dromIndex] = "Outre-mer"; 
  totalList[dromIndex] = totalList[dromIndex] + totalList[comIndex];
  regionList.splice(comIndex, 1);
  totalList.splice(comIndex, 1);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: regionList,
      datasets: [{
        // Supprimer ou laisser vide la propriété 'label' pour ne pas l'afficher
        data: totalList,
        borderWidth: 1,
        backgroundColor: 'rgb(107, 39, 55)',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false // Désactive l'affichage de la légende
        }
      }
    }
  });
}

// Appel de la fonction : 
getRegions();