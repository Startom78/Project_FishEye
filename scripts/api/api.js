const API = {
    getPhotographers: async() => {
        return fetch("./data/photographers.json")
        .then (response => response.json())
        .then (data => data.photographers)
    },
    getPhotographer: async(photographerId) => {
        return fetch("./data/photographers.json")
        .then (response => response.json())
        .then (data => {
            return {
                photographer: data.photographers.find(p => p.id === photographerId),
                media: data.media.filter(m => m.photographerId === photographerId),
                city: data.photographers.find(c => c.id === photographerId).city,
                country: data.photographers.find(co => co.id === photographerId).country,
                tagline: data.photographers.find(t => t.id === photographerId).tagline,
                price: data.photographers.find(pr => pr.id === photographerId).price
            }
        })
    }
}
export default API