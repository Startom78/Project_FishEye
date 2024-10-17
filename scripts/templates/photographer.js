/** 
 * @function photographerTemplate
 * @param {photographer} photographer 
 * @param {medias} [medias] 
 * @returns {photographerReturnType} 
 */
export const photographerTemplate = (photographer, medias) => {
    /**  
     * @returns {photographerWithPicture} 
    */
    const extractPhotographer = () => {
        const { name, id, portrait, city, country, tagline, price } = photographer;
        const picture = `assets/images/photographers/${portrait}`;
        return { name, id,  picture, city, country, tagline, price };
    }
    const { name, id, picture, city, country, tagline, price } = extractPhotographer();
    
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
    function createPhotographerBanner() {
        console.log("bonjour");
        const nameCityCountryTagline = document.createElement('div')
        nameCityCountryTagline.classList.add('ptgInfo')
        const h1 = document.createElement('h1');
        h1.classList.add('h1Photographer')
        h1.textContent = name;
        const h2 = document.createElement('h2');
        h2.classList.add('h2Photographer')
        h2.textContent = city + ',';
        const h3 = document.createElement('h3');
        h3.classList.add('h3Photographer');
        h3.textContent  = country;
        const h4 = document.createElement('h4');
        h4.classList.add('h4Photographer');
        h4.textContent = tagline;
        const img = document.createElement('img');
        img.setAttribute('src', picture)
        img.setAttribute('alt', `photo de profil de ${name}`)
        nameCityCountryTagline.appendChild(h1);
        nameCityCountryTagline.appendChild(h2);
        nameCityCountryTagline.appendChild(h3);
        nameCityCountryTagline.appendChild(h4);
        
        return {nameCityCountryTagline, img};
    }
    function createCaroussel() {

    }
    return { createPhotographerBanner, createCard, createCaroussel }
}