interface Photographer {
    name: string;
    id: number;
    portrait: string;
    city: string;
    country: string;
    tagline: string;
    price: number;
}

interface PhotographerWithPicture {
    name: string;
    id: number;
    picture: string;
    city: string;
    country: string;
    tagline: string;
    price: number;
}

interface Media {
    date: string;
    id: number;
    image: string;
    video: string;
    likes: number;
    photographerId: number;
    price: number;
    title: string
};
type Medias = Media[];
type Options = Option[];

type PhotographerReturnType = {
    updateTotalLikes: (medias: Medias) => void
    createCard: () => Node
    createPhotographerBanner: () => {nameCityCountryTagline: Node, img: Node}
    createCaroussel: () => Node
    createTotalLikes: () => Node
    createSelectionLightBox: () => Node
 };