
/**
 * @typedef {Object} photographer 
 * @property {string} name 
 * @property {string} id 
 * @property {string} portrait l'url absolu de l'image 
 * @property {string} city
 * @property {string} country 
 * @property {string} tagline la catchphrase
 * @property {string} price le cout journalier
 */

/**
 * @typedef {Object} photographerWithPicture 
 * @property {string} name 
 * @property {string} id 
 * @property {string} picture
 * @property {string} city
 * @property {string} country 
 * @property {string} tagline
 * @property {string} price
 */


/**
 * @typedef {Object} photographerReturnType
 * @extends photographerWithPicture
 * @property {function} createCard
 * */

/** 
 * @param {photographer} photographer 
 * @returns {photographerWithPicture} 
 */
export const extractPhotographer = (photographer) => {
    const { name, id, portrait, city, country, tagline, price } = photographer;
    const picture = `assets/images/photographers/${portrait}`;
    return { name, id,  picture, city, country, tagline, price };
}

/** 
 * @name photographerTemplate
 * @param {photographer} photographer 
 * @returns {photographerReturnType} 
 */

export const photographerTemplate = (photographer) => {
    const { name, id, picture, city, country, tagline, price } = extractPhotographer(photographer);
    
    function createCard() {
        const article = document.createElement( 'article' );
        const photographerUrl = `photographer.html?id=${id}`;
        const link = document.createElement('a');
        link.setAttribute('href', photographerUrl);
        const img = document.createElement( 'img' );
        img.classList.add("shadow")
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo de profil de ${name}`)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        link.appendChild(img);
        link.appendChild(h2);
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + (", ") + country;
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        const h5 = document.createElement( 'h5' );
        h5.textContent = price + ("€/jour");
        article.appendChild(link);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }
    return { name, id,  picture, city, country, tagline, price, createCard }
}

/** 
 * @param {photographer} photographer 
 * @returns {photographerReturnType} 
 */

export const getPhotographerBanner = (photographer) => {
    const { name, id, picture, city, country, tagline, price } = extractPhotographer(photographer);
    function createCard() {
        
        
        
        
        return
    }


    return { name, id,  picture, city, country, tagline, price, createCard }
}