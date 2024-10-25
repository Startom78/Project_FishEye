import Modal from "../modal.js";

const Lightbox = {
    /**
     * @param {Medias} medias 
     * @param {string} name
     * @returns {HTMLElement}
     */
    create: (medias, name)  => {
        const body = document.createElement('div');
        body.classList.add('card');
        const img = document.createElement('img');
            img.setAttribute('src', `assets/images/media/${name}/${medias[0].image}`)
            img.setAttribute('alt', "image de " + name);
        body.appendChild(img);
        return Modal.create("", body);
    },

    open: (lightbox, name,  medias, index) => {
        Modal.open(lightbox);
        lightbox.querySelector('img').src = `assets/images/media/${name}/${medias[index].image}` ;

    }
}

export default Lightbox;