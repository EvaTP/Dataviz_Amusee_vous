const selectTheme = document.getElementById("Themes")
const map = L.map('mapId').setView([46.603354, 1.888334], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let markerGroup = L.layerGroup().addTo(map)

async function getMuseums() {
    let apiUrl =
        "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?limit=100";
    if (selectTheme.value) {
        apiUrl += `&${selectTheme.value}`
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    const total = data.total_count;
    let offset = 100;
    let museums = data.results;
    while (offset <= total) {
        const res = await fetch(`${apiUrl}&offset=${offset}`)
        const dat = await res.json();
        dat.results.forEach(result => {
            museums.push(result)
        })
        offset += 100;
    }



    museums.forEach(item => {
        const longitude = item.coordonnees.lon
        const latitude = item.coordonnees.lat
        L.marker([latitude, longitude]).addTo(markerGroup)
            .bindPopup("Nom: " + (item.nom_officiel ? item.nom_officiel : "Non disponible") + "<br>" +
                "Adresse: " + (item.adresse ? item.adresse : "Non disponible") + "<br>" +
                "Code postal: " + (item.code_postal ? item.code_postal : "Non disponible") + "<br>" +
                "Ville: " + (item.ville ? item.ville : "Non disponible") + "<br>" +
                "Région: " + (item.region ? item.region : "Non disponible") + "<br>" +
                "Département: " + (item.departement ? item.departement : "Non disponible") + "<br>" +
                "Site Web: " + (item.url ? '<a href="http://' + item.url + '" target="_blank">' + item.url + '</a>' : "Non disponible"))





    })
}
getMuseums()

selectTheme.addEventListener("change", () => {
    markerGroup.clearLayers();
    getMuseums();
})
