export const Options = (medias, onSort) => {
    function setPopularity() {
        medias.sort((a,b) => b.likes - a.likes);
        console.log('popualire', medias);
        onSort(medias);
        return medias;

    }

    function setDate(){
        medias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        console.log('date', medias);
        onSort(medias);
        return medias;
    }

    function setTitle() {
        medias.sort((a, b) => a.title.localeCompare(b.title));
        console.log('title',medias);
        onSort(medias);
        return medias;

    }
    return {setPopularity, setDate, setTitle};
};

export default Options;