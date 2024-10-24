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

    function calculateTotalLikes() {
        console.log(medias);
        if (medias === undefined) {
            console.log("Aucun média trouvé");
            return 0;
        } 
        else {
            const totalLikes = medias.reduce((total,media) => total + media.likes, 0);
            return totalLikes;
        }
    } 
    const totalLikesValue = calculateTotalLikes();

    

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
        
        const totalLikesPriceContainer = document.createElement('article');
        totalLikesPriceContainer.classList.add('totalLikesPriceContainer');
        console.log('je suis la !');
        const likesHeart = document.createElement('div');
        likesHeart.classList.add('likesHeart');

        
        const totalLikes = document.createElement('p');
        totalLikes.classList.add('totalLikesAndPriceCss');
        totalLikes.textContent = totalLikesValue.toString();

        const heart = document.createElement('i');
        heart.classList.add('fa', 'fa-heart');

        const pricePerDay = document.createElement('div');
        pricePerDay.classList.add('pricePerDay');
        const price = document.createElement('p');
        price.textContent = photographer.price.toString() + '€' + ' / jour';

        likesHeart.appendChild(totalLikes);
        likesHeart.appendChild(heart);
        pricePerDay.appendChild(price);
        totalLikesPriceContainer.appendChild(likesHeart);
        totalLikesPriceContainer.appendChild(pricePerDay);

        return totalLikesPriceContainer;
    }
    const main = document.getElementById("main");
    const totalLikesContainer = createTotalLikes();
    main.appendChild(totalLikesContainer);
    
    

    
    

    function createCaroussel() {
         
      const cards = document.querySelector('.cards');
      medias.forEach(media => {
        
        if (!media.video) {
            const card = document.createElement('div');
            card.classList.add('card')

            const img = document.createElement('img');
            img.setAttribute('src', `assets/images/media/${name}/${media.image}`)
            img.setAttribute('alt', "image de " + name);

            const infoCard = document.createElement('div')
            infoCard.classList.add('infoCard')

            const title = document.createElement('div');
            title.textContent = media.title;

            const numberLikesContainer = document.createElement('div');
            numberLikesContainer.classList.add('numberLikesContainer');
            
            const heart = document.createElement('i');
            heart.classList.add('fa', 'fa-heart');
            numberLikesContainer.textContent = media.likes.toString();
            
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

            const title = document.createElement('div');
            title.textContent = media.title;

            const numberLikesContainer = document.createElement('div');
            numberLikesContainer.classList.add('numberLikesContainer');
            
            const heart = document.createElement('i');
            heart.classList.add('fa', 'fa-heart');
            numberLikesContainer.textContent = media.likes.toString();

            numberLikesContainer.appendChild(heart);
            infoCard.appendChild(title);
            infoCard.appendChild(numberLikesContainer);
            card.appendChild(video);
            card.appendChild(infoCard);
            cards.appendChild(card);
            }  
        })
      return cards
    }

    
    
    return {createPhotographerBanner, createCard, createCaroussel, createTotalLikes};
}