interface photographer {
    name: string;
    id: string;
    portrait: string;
    city: string;
    country: string;
    tagline: string;
    price: string;
}

interface photographerWithPicture {
    name: string;
    id: string;
    picture: string;
    city: string;
    country: string;
    tagline: string;
    price: string;
}


type photographerReturnType = photographerWithPicture & {createCard: () => void }