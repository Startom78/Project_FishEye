interface photographer {
    name: string;
    id: number;
    portrait: string;
    city: string;
    country: string;
    tagline: string;
    price: number;
}

interface photographerWithPicture {
    name: string;
    id: number;
    picture: string;
    city: string;
    country: string;
    tagline: string;
    price: number;
}

interface media {
    date: string;
    id: number;
    image: string;
    video: string;
    likes: number;
    photographerId: number;
    price: number;
    title: string
};
type medias = media[];

type photographerReturnType = {
    createTotalLikes: () => Node
    createCard: () => Node
    createPhotographerBanner: () => {nameCityCountryTagline: Node, img: Node}
    createCaroussel: () => Node
    
 };