//Mettre le code JavaScript lié à la page photographer.html
import Modal from "../components/modal.js";
import {
  changeOption,
  photographerTemplate,
} from "../templates/photographer.js";
function createContactModal() {
  const template = document.querySelector("#template_contact");
  if (template instanceof HTMLTemplateElement) {
    Modal.create(
      "contactez-moi",
      template.content.cloneNode(true),
      document.querySelector("#contact_opener")
    );
  }
}
window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  createContactModal();

  // Fetch photographers and media data
  fetch("../data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      // Je récupère les données et les médias du photographe en fonction de son id
      const ptg = data.photographers.find((p) => "" + p.id === "" + id);
      const media = data.media.filter((m) => "" + m.photographerId === "" + id);
      const photographerManager = photographerTemplate(ptg, media);
      displayBanner(photographerManager, ptg);
      displayCaroussel(photographerManager, ptg, media);
      const sortMedias = (medias) => {
        displayCaroussel(photographerManager, ptg, medias);
      };
      changeOption(media, sortMedias);
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
  const main = document.getElementById("main");
  const totalLikesContainer = photographerManager.createTotalLikes();
  main.appendChild(totalLikesContainer);
}

function displayCaroussel(photographerManager, photographer, medias) {
  const caroussel = document.getElementById("main");
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";
  const carousselContent = photographerManager.createCaroussel(medias);
  caroussel.appendChild(carousselContent);
}
