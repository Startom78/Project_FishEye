//Mettre le code JavaScript lié à la page photographer.html
import Modal from "../components/modal.js";
import { photographerTemplate } from "../templates/photographer.js";
function createContactModal() {
    const template = document.querySelector('#template_contact');
    if (template instanceof HTMLTemplateElement) {
        Modal.create("contactez-moi", template.content.cloneNode(true), document.querySelector('#contact_opener'));

    }
} 
window.onload = () => {
    const params = new URLSearchParams(window.location.search); 
    const id = params.get('id');
    createContactModal();
    // Fetch photographers and media data
    fetch("../data/photographers.json")
    .then(res => res.json())
    .then(data => {
        // Je récupère les données et les médias du photographe en fonction de son id
        const ptg = data.photographers.find(p => ""+p.id === ""+id);
        const media = data.media.filter(m => ""+m.photographerId === ""+id);
        displayBanner(ptg);
        displayCaroussel(ptg,media);
    })
     .catch(error => console.error('Error:', error)); 
}

/**
 * @function displayBanner
 * @param {photographer} photographer 
 */
 function displayBanner(photographer) {
    const Banner = document.querySelector(".photograph-header");
    const photographerManager = photographerTemplate(photographer);
    const userBannerDOM = photographerManager.createPhotographerBanner();
    if(Banner === null) {console.error("Banner introuvable"); return}
    Banner.insertBefore(userBannerDOM.nameCityCountryTagline, document.querySelector('#contact_opener'));
    Banner.appendChild(userBannerDOM.img);
}

function displayCaroussel(photographer, medias) {
    const caroussel = document.getElementById("main");
    const photographerManager = photographerTemplate(photographer, medias,);
    const carousselContent = photographerManager.createCaroussel();
    caroussel.appendChild(carousselContent);
}

