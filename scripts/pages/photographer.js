//Mettre le code JavaScript lié à la page photographer.html

window.onload = () => {
    const params = new URLSearchParams(window.location.search); 
    const id = params.get('id');
    console.log(id);

    // Fetch photographers and media data
    fetch("../data/photographers.json")
    .then(res => res.json())
    .then(data => {
        // Je récupère les données et les médias du photographe en fonction de son id
        const ptg = data.photographers.find(p => ""+p.id === ""+id);
        console.log(ptg)
        const media = data.media.filter(m => ""+m.photographerId === ""+id);
        console.log("Media: ici", media);
    })
    .catch(error => console.error('Error:', error));
}