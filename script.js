

git 

async function getMuseums() {
	const response = await fetch('https://www.data.gouv.fr/fr/datasets/r/a5c5d76e-979a-4073-ba0d-0844bb3c1398');
	const data = await response.json();

	console.log('🐤 musées :', data);
	showMuseum(data);
}
getMuseums();

function showMuseum(musee) {
	listMuseum.innerHTML = "";

	for (let i = 0; i < musee.length; i++) {
		const newDiv = document.createElement("div");
		const museumName = document.createElement("h3");
		const museumCity = document.createElement("h3");
		const newImage = document.createElement("img");

		newDiv.classList.add("museumDiv")
		museumName.classList.add("museumName");
		museumCity.classList.add("museumCity");
		newImage.classList.add("museumImage");

		museumName.innerText= musee[i].nom_officiel;
		museumCity.innerText = `${musee[i].ville} (${musee[i].code_postal})`;
		newImage.src = './images/ticket_musee.png';
		listMuseum.appendChild(newDiv);
		newDiv.appendChild(museumName);
		newDiv.appendChild(museumCity);
		newDiv.appendChild(newImage)

	}

}

const findMuseum = document.querySelector("#findMuseum");
const museumMap = document.querySelector("#museumMap");
const placeholder = document.querySelector("#placeholder");

const listMuseum = document.querySelector("#museumsList");




// HTML
// const mainContainer = document.querySelector("#main-container");
// const nomMusee = document.querySelector("#nom-musee");
// const lieu = document.querySelector("#lieu");
// console.log('🐯 main-container :', data);
