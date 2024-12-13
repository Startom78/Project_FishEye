const createLike = (
  checked = false,
  onChange = (checked) => {},
  onClick = null
) => {
  const heart = document.createElement("div");
  heart.classList.add("hearts");
  if (checked) {
    heart.classList.add("checked");
  }
  heart.innerHTML = `<i class="fa-solid fa-heart fullheart"></i> <i class="fa-solid fa-heart fullheart heart-2"></i>`;

  return heart;
};

export default createLike;
