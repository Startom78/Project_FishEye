const dropDown = (options, onChange, tabIndex = 0) => {
  const div = document.createElement("div");
  div.classList.add("dropDown-container");

  const clickAway = document.createElement("div");
  clickAway.classList.add("dropDown-click-away", "hidden");

  const dropContainer = document.createElement("div");
  dropContainer.classList.add("dropDown");
  dropContainer.tabIndex = tabIndex;

  const chevron = document.createElement("i");
  chevron.classList.add("fa-solid", "fa-angle-up", "chevron");
  chevron.tabIndex = 0;
  chevron.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      dropContainer.classList.toggle("open");
      clickAway.classList.toggle("hidden");
      onOpenClose();
    }
  });

  dropContainer.appendChild(chevron);
  const close = () => {
    dropContainer.classList.remove("open");
    clickAway.classList.add("hidden");
    onOpenClose();
  };
  const onOpenClose = () => {
    const isOpen = dropContainer.classList.contains("open");
    const items = dropContainer.querySelectorAll(".option");
    items.forEach((item) => {
      item.tabIndex = isOpen ? tabIndex : -1;
    });
  };
  clickAway.onclick = chevron.onclick = close;

  dropContainer.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      close();
      chevron.focus();
    }
  });

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
  // Sélectionner toutes les options du dropdown
  const dropdownItems = dropContainer.querySelectorAll(".option");

  // Ajouter un écouteur d'événements à chaque élément
  dropdownItems.forEach((item, index) => {
    item.addEventListener("keydown", (event) => {
      if (!dropContainer.classList.contains("open")) return;
      if (event.key === "Tab" || event.key === "ArrowDown") {
        // Empêcher le comportement par défaut
        event.preventDefault();
        // Aller à l'élément suivant ou au premier
        const nextIndex = (index + 1) % dropdownItems.length;
        dropdownItems[nextIndex].focus();
      } else if (event.key === "ArrowUp") {
        // Empêcher le comportement par défaut
        event.preventDefault();
        // Aller à l'élément précédent ou au dernier
        const prevIndex =
          (index - 1 + dropdownItems.length) % dropdownItems.length;
        dropdownItems[prevIndex].focus();
      }
    });
  });

  div.appendChild(clickAway);
  div.appendChild(dropContainer);

  return div;
};

export default dropDown;
