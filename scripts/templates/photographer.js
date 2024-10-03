export const photographerTemplate = (data) => {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/images/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const photographerUrl = "photographer.html";
        const link = document.createElement('a');
        link.setAttribute('href', photographerUrl);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.classList.add("shadow")
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        //img.setAttribute("alt", `photo de profil de ${data.name}`)
        link.appendChild(img);
        link.appendChild(h2);
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + (", ") + country;
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        const h5 = document.createElement( 'h5' );
        h5.textContent = price + ("€/jour");
        article.appendChild(link);
        //article.appendChild(img);
        //article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}