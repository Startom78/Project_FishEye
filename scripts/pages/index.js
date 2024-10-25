import { photographerTemplate } from "../templates/photographer.js"
import api from "../api/api.js"

async function getPhotographers() {
    return {
        photographers: await api.getPhotographers() 
    }   
}

/**
 * @function displayData
 * @param {Photographer[]} photographers
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.createCard();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}
init();