const Modal = {
    create: (
        /** @type {string} */ pTitle,
        /** @type {any} */ pBody,
        externalOpenButton = null,
        tabIndex = -1,
        onOpen = () => {},
        onClose = () => {},
        quitOnLostFocus = true
    ) => {
        // external window - on click : close
        /**@type {HTMLDivElement & {onOpen?: Function, onClose?: Function}} */
        const clickAway = document.createElement("div");
        clickAway.classList.add("modal-click-away", "hidden");

        // internal window
        const window = document.createElement("dialog");
        window.classList.add("modal-window");
        window.setAttribute("role", "dialog");
        clickAway.appendChild(window);

        // window header
        const header = document.createElement("div");
        header.classList.add("modal-header");
        const title = document.createElement("h2");
        title.textContent = pTitle;
        window.appendChild(header);
        const closeButton = document.createElement("div");
        closeButton.classList.add("modal-close-button");
        closeButton.innerHTML = '<i class="fa-solid fa-x"></i>';
        closeButton.tabIndex = 1002;

        closeButton.onclick = () => Modal.close(clickAway);
        closeButton.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.stopPropagation();
                event.preventDefault();
                Modal.close(clickAway);
            }
        });
        header.appendChild(title);
        header.appendChild(closeButton);

        const container = document.createElement("div");
        container.classList.add("modal-container");
        window.appendChild(container);

        // attach the body
        container.appendChild(pBody);

        // attach modal to the body
        document.body.appendChild(clickAway);

        // enable listeners to close on click
        clickAway.onclick = () => Modal.close(clickAway);
        window.onclick = (event) => event.stopPropagation();

        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                Modal.close(clickAway);
            }
        });

        // if external button is provided, open the modal on click
        if (externalOpenButton) {
            externalOpenButton.onclick = () => Modal.open(clickAway);
        }

        if (tabIndex > 0) {
            window.tabIndex = tabIndex;
        }
        if (quitOnLostFocus) {
            const handleOpen = (event) => {
                if (window.contains(event.target)) {
                    return;
                } else {
                    Modal.close(clickAway);
                }
            };
            clickAway.onOpen = () => {
                document.addEventListener("focusin", handleOpen);
                onOpen?.();
            };
            clickAway.onClose = () => {
                document.removeEventListener("focusin", handleOpen);
                onClose?.();
            };
        } else {
            clickAway.onOpen = onOpen;
            clickAway.onClose = onClose;
        }

        return clickAway;
    },

    open: (/** @type {HTMLElement & {onOpen?: Function}} */ modal) => {
        modal.classList.remove("hidden");
        /**@type {HTMLElement} */
        const window = modal.querySelector(".modal-window");
        window.setAttribute("open", "true");
        window.focus();

        modal.onOpen?.();
    },

    close: (/** @type {HTMLElement & {onClose?: Function}} */ modal) => {
        modal.classList.add("hidden");
        modal.querySelector(".modal-window").setAttribute("open", "false");

        modal.onClose?.();
    },
};
export default Modal;
