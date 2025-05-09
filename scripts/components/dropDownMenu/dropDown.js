const dropDown = (options, onChange, tabIndex = undefined) => {
    const div = document.createElement("div");
    div.classList.add("dropDown-container");
    div.tabIndex = tabIndex && tabIndex > -1 ? tabIndex : 0;

    const clickAway = document.createElement("div");
    clickAway.classList.add("dropDown-click-away", "hidden");

    const dropContainer = document.createElement("div");
    dropContainer.classList.add("dropDown");
    const resizer = new ResizeObserver(() => {
        const box = dropContainer.getBoundingClientRect();
        div.style.width = box.width + "px";
    });
    resizer.observe(dropContainer);

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

    const open = () => {
        dropContainer.classList.add("open");
        clickAway.classList.remove("hidden");
        onOpenClose();
    };

    const toggle = () => {
        dropContainer.classList.toggle("open");
        clickAway.classList.toggle("hidden");
        onOpenClose();
    };

    const onOpenClose = () => {
        const isOpen = dropContainer.classList.contains("open");
        /**@type {HTMLDivElement[]} */
        const items = Array.from(dropContainer.querySelectorAll(".option"));
        items.forEach((item) => {
            item.tabIndex = isOpen ? 0 : -1;
        });
    };

    clickAway.onclick = close;
    chevron.onclick = toggle;

    dropContainer.addEventListener("blur", () => {
        const requireClose = !clickAway.classList.contains("hidden");
        close();
        if (requireClose) {
            chevron.focus();
        }
    });

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
        optionElement.tabIndex = -1;

        const listenKeys = (event) => {
            if (!dropContainer.classList.contains("open")) return;
            /**@type {HTMLElement[]} */
            const dropdownItems = Array.from(
                dropContainer.querySelectorAll(".option")
            );

            const current = dropdownItems.indexOf(optionElement);
            const next =
                (event.key === "Tab" && !event.shiftKey) ||
                event.key === "ArrowDown";
            const prev =
                (event.key === "Tab" && event.shiftKey) ||
                event.key === "ArrowUp";
            if (next) {
                if (current === dropdownItems.length - 1) {
                    div.focus();
                    return;
                }
                // Empêcher le comportement par défaut
                event.preventDefault();
                event.stopPropagation();

                // Aller à l'élément suivant ou au premier
                const nextIndex = (current + 1) % dropdownItems.length;
                dropdownItems[nextIndex].focus();
            } else if (prev) {
                if (current == 0) {
                    option.focus();
                    return;
                }
                // Empêcher le comportement par défaut
                event.preventDefault();
                event.stopPropagation();

                // Aller à l'élément précédent ou au dernier
                const prevIndex =
                    (current - 1 + dropdownItems.length) % dropdownItems.length;
                dropdownItems[prevIndex].focus();
            } else if (event.key === "Enter") {
                activate();
                event.preventDefault();
                event.stopPropagation();
            }
        };

        const activate = () => {
            optionElement.remove();
            chevron.insertAdjacentElement("afterend", optionElement);
            onChange?.(option, last === optionElement);
            last = optionElement;
            optionElement.focus();
        };

        optionElement.onclick = (event) => {
            activate();
            event.stopPropagation();
        };

        // Ajouter un écouteur d'événements à chaque élément
        optionElement.addEventListener("keydown", listenKeys);
    });

    div.appendChild(clickAway);
    div.appendChild(dropContainer);

    return div;
};

export default dropDown;
