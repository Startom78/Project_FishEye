import Modal from "../modal.js";

const Lightbox = {
  create: () => {
    const body = Lightbox.createBody();
    const modal = Modal.create("", body);
    const window = modal.querySelector(".modal-window");
    window.classList.add("lightbox");

    return modal;
  },

  createBody: () => {
    const body = document.createElement("div");
    body.classList.add("body");

    const nav = document.createElement("div");
    nav.classList.add("nav");

    const description = document.createElement("div");
    description.classList.add("description");

    const leftArrow = document.createElement("div");
    leftArrow.classList.add("leftArrow");
    leftArrow.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;

    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("mediaContainer");
    const img = document.createElement("img");
    img.classList.add("hidden", "media");

    const video = document.createElement("video");
    video.classList.add("hidden", "media");
    video.setAttribute("controls", "controls");

    //img.setAttribute('src', `assets/images/media/${name}/${medias[0].image}`)
    //img.setAttribute('alt', "image de " + name);

    const rightArrow = document.createElement("div");
    rightArrow.classList.add("rightArrow");
    rightArrow.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;

    body.appendChild(nav);
    body.appendChild(description);
    nav.appendChild(leftArrow);
    nav.appendChild(mediaContainer);
    nav.appendChild(rightArrow);
    mediaContainer.appendChild(img);
    mediaContainer.appendChild(video);
    return body;
  },

  open: (lightbox, medias, name, index) => {
    Modal.open(lightbox);
    Lightbox.openLightbox(lightbox, medias, name, index);
  },

  /**
   * @param {Medias} medias
   * @param {string} name
   */

  openLightbox: (lightbox, medias, name, index) => {
    Lightbox.openMedia(lightbox, medias[index], name);
    const left = lightbox.querySelector(".leftArrow");
    left.tabIndex = 0;

    left.onclick = () => {
      index = (index - 1 + medias.length) % medias.length;
      Lightbox.openMedia(lightbox, medias[index], name);
    };
    left.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        index = (index - 1 + medias.length) % medias.length;
        Lightbox.openMedia(lightbox, medias[index], name);
      }
    });

    const right = lightbox.querySelector(".rightArrow");
    right.onclick = () => {
      index = (index + 1 + medias.length) % medias.length;
      Lightbox.openMedia(lightbox, medias[index], name);
    };
    right.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        index = (index + 1 + medias.length) % medias.length;
        Lightbox.openMedia(lightbox, medias[index], name);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        index = (index - 1 + medias.length) % medias.length;
        Lightbox.openMedia(lightbox, medias[index], name);
      } else if (event.key === "ArrowRight") {
        index = (index + 1 + medias.length) % medias.length;
        Lightbox.openMedia(lightbox, medias[index], name);
      }
    });
  },

  openMedia: (lightbox, media, name) => {
    const video = lightbox.querySelector(".mediaContainer video");
    const img = lightbox.querySelector(".mediaContainer img");
    const description = lightbox.querySelector(".description");
    description.textContent = media.title;
    if (media.video) {
      video.classList.remove("hidden");
      img.classList.add("hidden");
      video.src = `assets/images/media-qhd/${name}/${media.video}`;
    } else {
      img.classList.remove("hidden");
      video.classList.add("hidden");
      img.src = `assets/images/media-qhd/${name}/${media.image}`;
    }
  },
};

export default Lightbox;
