const listArtists = document.querySelector("#artists");
const artists = document.querySelector("#artists");

async function getArtists() {
    const response = await fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=artiste&where=artiste%20!%3D%20%22null%22&limit=20");
    const newData = await response.json();
    console.log(newData);
    showArtists(newData);
  }
  
    // Appel de cette fonction : 
  getArtists();
  
    // Fonction qui intègre dans le HTML nom de l'artiste :
  function showArtists(artists) {
    listArtists.innerHTML = "";
  
    for (let i = 0; i < artists.results.length; i++) {
      const divArtist = document.createElement("div");
      divArtist.classList.add("artistDiv");
      divArtist.innerText = artists.results[i].artiste;
      listArtists.appendChild(divArtist);
    }
  }
  // HTML
  // const mainContainer = document.querySelector("#main-container");
  // const nomMusee = document.querySelector("#nom-musee");
  // const lieu = document.querySelector("#lieu");
  // console.log('🐯 main-container :', data);
  //https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?select=artiste&where=artiste%20!%3D%20%22null%22&limit=20