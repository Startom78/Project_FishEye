//Mettre le code JavaScript lié à la page photographer.html
import { initFormValidation } from "../components/formularContact/formularContact.js";
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
    initFormValidation();
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
      displayOptions();
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

function displayOptions() {
  const menu = document.querySelector(".menuSelection");
  console.log(menu);

  const selectionText = document.createElement("p");
  selectionText.classList.add("selectionText");
  selectionText.innerHTML = "Trier par : ";

  const dropDown = document.createElement("div");
  dropDown.classList.add("dropDown");

  const popularity = document.createElement("p");
  popularity.classList.add("option");
  popularity.textContent = "Popularité";
  console.log(popularity);

  const date = document.createElement("p");
  date.classList.add("option", "hidden");
  date.textContent = "Date";

  const title = document.createElement("p");
  title.classList.add("option", "hidden");
  title.textContent = "Titre";

  const upArrow = document.createElement("i");
  upArrow.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
  upArrow.onclick = () => {
    date.classList.toggle("hidden");
    title.classList.toggle("hidden");
    popularity.classList.add("whiteBorder");
    date.classList.add("whiteBorder");
  };

  popularity.appendChild(upArrow);
  dropDown.appendChild(popularity);
  dropDown.appendChild(date);
  dropDown.appendChild(title);
  menu.appendChild(selectionText);
  menu.appendChild(dropDown);
  return menu;
}
