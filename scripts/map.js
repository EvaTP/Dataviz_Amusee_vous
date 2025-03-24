async function getMuseums() {
    const response = await fetch("https://www.data.gouv.fr/fr/datasets/r/a5c5d76e-979a-4073-ba0d-0844bb3c1398");
    const data = await response.json();
    console.log(data[0].coordonnees)


    
    function putmarker(data) {
    
        const map = L.map('mapid').setView([46.603354, 1.888334], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
        data.forEach(item => {
            const longitude = item.coordonnees.lon
            const latitude = item.coordonnees.lat
            console.log(latitude,longitude)
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup("Nom: "+item.nom_officiel+"<br>"+"Adresse: "+item.adresse+"<br>"+"Code postal: "+item.code_postal+"<br>"+"Ville: "+item.ville+"<br>"+"Région: "+item.region+"<br>"+" Département: "+item.departement+"<br>"+"URL: "+item.url)
        })
    }
    putmarker(data)
}
getMuseums()

