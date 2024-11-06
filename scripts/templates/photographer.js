import Lightbox from "../components/lightbox/lightbox.js";
import Modal from "../components/modal.js";

/** 
 * @function photographerTemplate
 * @param {Photographer} photographer 
 * @param {Medias} [medias] 
 * @returns {PhotographerReturnType} 
 */
export const photographerTemplate = (photographer, medias) => {
    /**  
     * @returns {PhotographerWithPicture} 
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

    function createTotalLikes() {
        const fixedContainer = document.createElement('div');
        fixedContainer.classList.add('fixedBottom');

        const wrapperContainer = document.createElement('div');
        wrapperContainer.classList.add('wrapper', 'items-end', 'flex');

        const totalLikesPriceContainer = document.createElement('div');
        totalLikesPriceContainer.classList.add('totalLikesPriceContainer');
        console.log('je suis la !');
        const likesHeart = document.createElement('div');
        likesHeart.classList.add('likesHeart');

        
        const totalLikes = document.createElement('p');
        totalLikes.classList.add('totalLikesAndPriceCss');
        totalLikes.textContent = "0";

        const heart = document.createElement('i');
        heart.classList.add('fa-solid', 'fa-heart');

        const pricePerDay = document.createElement('div');
        pricePerDay.classList.add('pricePerDay');
        const price = document.createElement('p');
        price.textContent = photographer.price.toString() + '€' + ' / jour';

        likesHeart.appendChild(totalLikes);
        likesHeart.appendChild(heart);
        pricePerDay.appendChild(price);
        totalLikesPriceContainer.appendChild(likesHeart);
        totalLikesPriceContainer.appendChild(pricePerDay);
        wrapperContainer.appendChild(totalLikesPriceContainer);
        fixedContainer.appendChild(wrapperContainer);

        return fixedContainer;
    }
    
    
    /**
     * 
     * @param {Medias} medias 
     */

    function updateTotalLikes(medias) {
        const totalLikes = document.querySelector('.totalLikesPriceContainer .totalLikesAndPriceCss');
        totalLikes.textContent = ""+medias.reduce((total, media) => total + (+media.likes), 0);

    }

    
    

    function createCaroussel() {
        const lightbox = Lightbox.create();
        
      const cards = document.querySelector('.cards');
      medias.forEach((media, index) => {
        
        if (!media.video) {
            const card = document.createElement('div');
            card.classList.add('card')

            const img = document.createElement('img');
            img.setAttribute('src', `assets/images/media/${name}/${media.image}`)
            img.setAttribute('alt', "image de " + name);
            img.onclick = () => {
                Lightbox.open(lightbox, medias, name, index);
            }
            const infoCard = document.createElement('div')
            infoCard.classList.add('infoCard')

            const title = document.createElement('div');
            title.textContent = media.title;

            const numberLikesContainer = document.createElement('div');
            numberLikesContainer.classList.add('numberLikesContainer');
            
            
            const heart = document.createElement('i');
            heart.classList.add('fa-solid', 'fa-heart');

            const numberLikes = document.createElement('span');
            numberLikes.textContent = media.likes.toString();
            numberLikesContainer.onclick = () => {
                media.likes++;
                numberLikes.textContent = media.likes.toString();
                updateTotalLikes(medias);
            }
            
            numberLikesContainer.appendChild(numberLikes);
            numberLikesContainer.appendChild(heart);
            infoCard.appendChild(title);
            infoCard.appendChild(numberLikesContainer);
            card.appendChild(img);
            card.appendChild(infoCard);
            cards.appendChild(card);
        } 
        else {
            const card = document.createElement('div');
            card.classList.add('card');

            const infoCard = document.createElement('div')
            infoCard.classList.add('infoCard')

            const video = document.createElement('video');
            video.setAttribute('src', `assets/images/media/${name}/${media.video}`)
            video.setAttribute('alt', "video de " + name);
            video.setAttribute('controls', 'true');
            video.onclick = () => {
                Lightbox.open(lightbox, medias, name, index);
            }

            const title = document.createElement('div');
            title.textContent = media.title;

            const numberLikesContainer = document.createElement('div');
            numberLikesContainer.classList.add('numberLikesContainer');
            
            const heart = document.createElement('i');
            heart.classList.add('fa', 'fa-heart');
            numberLikesContainer.textContent = media.likes.toString();
            heart.onclick = () => {
                media.likes++;
                numberLikesContainer.textContent = media.likes.toString();
                updateTotalLikes(medias);
            }
            numberLikesContainer.appendChild(heart);
            infoCard.appendChild(title);
            infoCard.appendChild(numberLikesContainer);
            card.appendChild(video);
            card.appendChild(infoCard);
            cards.appendChild(card);
            }  
        })
        updateTotalLikes(medias);
      return cards
    }

    function createSelectionLightBox() {
        const menu = document.querySelector('.content');
        if (menu){ 
            console.log("je suis bien détecté");
        }
        else {
            console.log("faux")};
        const sortText = document.createElement('div');
        sortText.classList.add('textSelection');
        sortText.textContent = "trier par :";
        menu.appendChild(sortText);
        return menu;
    }

    
    
    return {createPhotographerBanner, createCard, createCaroussel, updateTotalLikes, createTotalLikes, createSelectionLightBox};
}