



async function getMuseums() {
	const response = await fetch('https://www.data.gouv.fr/fr/datasets/r/a5c5d76e-979a-4073-ba0d-0844bb3c1398');
	const data = await response.json();

	console.log('🐤 musées :', data);
}
	getMuseums();



// HTML
// const mainContainer = document.querySelector("#main-container");
// const nomMusee = document.querySelector("#nom-musee");
// const lieu = document.querySelector("#lieu");
// console.log('🐯 main-container :', data);
