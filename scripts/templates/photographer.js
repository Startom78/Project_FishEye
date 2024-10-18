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
        article.classList.add('card-index');
        const photographerUrl = `photographer.html?id=${id}`;
        const link = document.createElement('a');
        link.setAttribute('href', photographerUrl);
        link.classList.add('card-link');
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('avatar');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo de profil de ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const description = document.createElement('div');
        description.classList.add('card-description');
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + (", ") + country;
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        const h5 = document.createElement( 'h5' );
        h5.textContent = price + ("€/jour");
        imgContainer.appendChild(img);
        link.appendChild(imgContainer);
        link.appendChild(h2);
        description.appendChild(h3);
        description.appendChild(h4);
        description.appendChild(h5);
        article.appendChild(link);
        article.appendChild(description);
        return (article);
    }
    function createPhotographerBanner() {
        const nameCityCountryTagline = document.createElement('div')
        nameCityCountryTagline.classList.add('ptgInfo')
        const h1 = document.createElement('h1');
        h1.classList.add('h1Photographer')
        h1.textContent = name;
        const cityCountry = document.createElement('div');
        cityCountry.classList.add('cityCountry');
        const h2 = document.createElement('h2');
        h2.classList.add('h2Photographer')
        h2.textContent = city + ',';
        const h3 = document.createElement('h3');
        h3.classList.add('h3Photographer');
        h3.textContent  = country;
        cityCountry.appendChild(h2);
        cityCountry.appendChild(h3);
        const h4 = document.createElement('h4');
        h4.classList.add('h4Photographer');
        h4.textContent = tagline;
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('avatar');
        const img = document.createElement('img');
        img.classList.add('imgProfile');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `photo de profil de ${name}`);
        imgContainer.appendChild(img);
        nameCityCountryTagline.appendChild(h1);
        nameCityCountryTagline.appendChild(cityCountry);
        nameCityCountryTagline.appendChild(h4);
        
        return {nameCityCountryTagline, img: imgContainer};
    }
    function createCaroussel() {
         
      const cards = document.querySelector('.cards');
      medias.forEach(media => {
        
        if (!media.video) {
            const card = document.createElement('div');
            card.classList.add('card')
            const img = document.createElement('img');
            img.setAttribute('src', `assets/images/media/${name}/${media.image}`)
            img.setAttribute('alt', "image de " + name);
            const titleLikes = document.createElement('div')
            titleLikes.classList.add('titleLikes')
            const title = document.createElement('div')
            title.textContent = media.title;
            const numberLikes = document.createElement('numberLikes');
            numberLikes.textContent = media.likes;
            const heart = document.createElement('i');
            heart.classList.add('fa', 'fa-heart');
            titleLikes.appendChild(title);
            titleLikes.appendChild(numberLikes);
            titleLikes.appendChild(heart);
            card.appendChild(img);
            card.appendChild(titleLikes);
            cards.appendChild(card);
        } 
        else {
            console.log(media);
            const card = document.createElement('div');
            card.classList.add('card')
            const video = document.createElement('video');
            video.setAttribute('src', `assets/images/media/${name}/${media.video}`)
            video.setAttribute('alt', "video de " + name);
            video.setAttribute('controls', 'true');
            card.appendChild(video);
            cards.appendChild(card);
        }
        //cards.appendChild();
        // creer balise pour vidéos
      })
      return cards
    }
    return { createPhotographerBanner, createCard, createCaroussel }
}