const dropDown = (options, onChange) => {
  const div = document.createElement("div");
  div.classList.add("dropDown-container");

  const clickAway = document.createElement("div");
  clickAway.classList.add("dropDown-click-away", "hidden");

  const dropContainer = document.createElement("div");
  dropContainer.classList.add("dropDown");

  const chevron = document.createElement("i");
  chevron.classList.add("fa-solid", "fa-angle-up", "chevron");
  dropContainer.appendChild(chevron);
  clickAway.onclick = chevron.onclick = () => {
    dropContainer.classList.toggle("open");
    clickAway.classList.toggle("hidden");
  };

  let last = undefined;

  options.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.textContent = option;
    optionElement.classList.add("option");
    dropContainer.appendChild(optionElement);

    optionElement.onclick = (event) => {
      optionElement.remove();
      chevron.insertAdjacentElement("afterend", optionElement);
      onChange?.(option, last === optionElement);
      last = optionElement;
      event.stopPropagation();
    };
  });
  div.appendChild(clickAway);
  div.appendChild(dropContainer);

  return div;
};

export default dropDown;
