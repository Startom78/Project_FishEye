//Mettre le code JavaScript lié à la page photographer.html
import createDropDown from "../components/dropDownMenu/dropDown.js";
import { initFormValidation } from "../components/formularContact/formularContact.js";
import Modal from "../components/modal.js";
import { photographerTemplate } from "../templates/photographer.js";
import {
    setPopularity,
    setDate,
    setTitle,
} from "../components/options/options.js";

function createContactModal() {
    const template = document.querySelector("#template_contact");
    if (template instanceof HTMLTemplateElement) {
        Modal.create(
            "contactez-moi",
            template.content.cloneNode(true),
            document.querySelector("#contact_opener"),
            1000,
            () => {
                document
                    .querySelector(".wrapper")
                    .setAttribute("disabled", "true");
            },
            () => {
                document
                    .querySelector(".wrapper")
                    .setAttribute("disabled", "false");
                /**@type {HTMLDivElement} */
                const opener = document.querySelector("#contact_opener");
                opener.focus();
            }
        );
        initFormValidation();
    }
}
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    createContactModal();

    // Fetch photographers and media data
    fetch("./data/photographers.json")
        .then((res) => res.json())
        .then((data) => {
            // Je récupère les données et les médias du photographe en fonction de son id
            const ptg = data.photographers.find((p) => "" + p.id === "" + id);
            const media = data.media.filter(
                (m) => "" + m.photographerId === "" + id
            );
            const photographerManager = photographerTemplate(ptg, media);
            displayBanner(photographerManager, ptg);
            displayCaroussel(photographerManager, ptg, media);
            const sortSens = [
                { name: "Popularité", sens: false },
                { name: "Date", sens: false },
                { name: "Titre", sens: false },
            ];
            const dropDown = createDropDown(
                ["Popularité", "Date", "Titre"],
                (value, toggleSens) => {
                    const sortElement = sortSens.find((s) => s.name === value);
                    if (toggleSens) {
                        sortElement.sens = !sortElement.sens;
                    }

                    switch (value) {
                        case "Popularité":
                            setPopularity(
                                media,
                                null,
                                sortElement.sens ? "desc" : ""
                            );
                            break;

                        case "Date":
                            setDate(
                                media,
                                null,
                                sortElement.sens ? "desc" : ""
                            );
                            break;

                        case "Titre":
                            setTitle(
                                media,
                                null,
                                sortElement.sens ? "desc" : ""
                            );
                            break;
                    }
                    displayCaroussel(photographerManager, ptg, media);
                }
            );
            document.querySelector(".menuSelection").appendChild(dropDown);
        })
        .catch((error) => console.error("Error:", error));
};

/**
 * @function displayBanner
 * @param {Photographer} photographer
 */
function displayBanner(photographerManager, photographer) {
    const Banner = document.querySelector(".photograph-header");
    const userBannerDOM = photographerManager.createPhotographerBanner();
    if (Banner === null) {
        console.error("Banner introuvable");
        return;
    }
    Banner.insertBefore(
        userBannerDOM.nameCityCountryTagline,
        document.querySelector("#contact_opener")
    );
    Banner.appendChild(userBannerDOM.img);
    const overlay = document.getElementById("overlay-likes");
    const totalLikesContainer = photographerManager.createTotalLikes();
    overlay.appendChild(totalLikesContainer);
}

function displayCaroussel(photographerManager, photographer, medias) {
    const caroussel = document.getElementById("main");
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";
    const carousselContent = photographerManager.createCaroussel(medias);
    caroussel.appendChild(carousselContent);
}
