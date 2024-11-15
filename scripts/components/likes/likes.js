const createLike = (checked = false, onclick = (checked) =>{}) => {
    const heart = document.createElement('div');
        heart.classList.add('hearts');
        if(checked) { heart.classList.add('checked') };
        heart.innerHTML = `<i class="fa-solid fa-heart fullheart"></i> <i class="fa-solid fa-heart fullheart heart-2"></i>`;
        heart.onclick = () => {
            checked = !checked; 
            onclick(checked);
            heart.classList.toggle('checked');
        };
    return heart;
}

export default createLike;