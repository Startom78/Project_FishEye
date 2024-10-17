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

type media = string
type medias = media[]
type photographerReturnType = {
    createCard: () => Node
    createPhotographerBanner: () => {nameCityCountryTagline: Node, img: Node}
    createCaroussel: () => void
 }