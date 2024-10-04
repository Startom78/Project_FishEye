//Mettre le code JavaScript lié à la page photographer.html

import Modal from "../components/modal.js"
window.onload = () => {

    const params = new URLSearchParams(window.location.search); 
    const id = params.get('id');
    console.log(id)

    fetch("../data/photographers.json")
    .then(res => res.json)
    .then(data => {
        const ptg = data.photographers.find(p => ""+p.id === ""+id)
        //const media
    })
}

