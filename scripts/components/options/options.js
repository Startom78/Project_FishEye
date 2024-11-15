export const Options = (medias, onSort) => {
    function setPopularity() {
        medias.sort((a,b) => b.likes - a.likes);
        onSort(medias);
        
        return medias;
    }

    function setDate(){
        medias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        onSort(medias);
        return medias;
    }

    function setTitle() {
        medias.sort((a, b) => a.title.localeCompare(b.title));
        onSort(medias);
        return medias;

    }
    return {setPopularity, setDate, setTitle};
};

export default Options;