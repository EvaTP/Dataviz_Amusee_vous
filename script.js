async function getSites() {
	const response = await fetch('https://www.data.gouv.fr/fr/datasets/r/ea98fdcb-5c24-4646-9823-c6d2914d0b36');
	const data = await response.json();

	console.log('🐤 sites :', data);
}
	getSites();
  
