export const photographerTemplate = (data) => {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/images/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.classList.add("shadow")
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + (", ");
        h3.classList.add("shadow")
        const h4 = document.createElement( 'h4' );
        h4.textContent = country;
        const h5 = document.createElement( 'h5' );
        h5.textContent = tagline;
        const h6 = document.createElement( 'h6' );
        h6.textContent = price + ("€/jour");
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        article.appendChild(h6);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}