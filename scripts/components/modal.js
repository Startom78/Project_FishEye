const Modal = {
  create: (
    /** @type {string} */ pTitle,
    /** @type {any} */ pBody,
    externalOpenButton = null,
    tabIndex = -1
  ) => {
    // external window - on click : close

    const clickAway = document.createElement("div");
    clickAway.classList.add("modal-click-away");

    // internal window
    const window = document.createElement("div");
    window.classList.add("modal-window");
    clickAway.appendChild(window);

    // window header
    const header = document.createElement("div");
    header.classList.add("modal-header");
    const title = document.createElement("h2");
    title.textContent = pTitle;
    window.appendChild(header);
    const closeButton = document.createElement("div");
    closeButton.classList.add("modal-close-button");
    closeButton.innerHTML = `<i class="fa-solid fa-x"></i>`;
    closeButton.onclick = () => Modal.close(clickAway);
    header.appendChild(title);
    header.appendChild(closeButton);

    // attach the body
    window.appendChild(pBody);

    // attach modal to the body
    document.body.appendChild(clickAway);

    // by default : close the modal
    Modal.close(clickAway);
    // enable listeners to close on click
    clickAway.onclick = () => Modal.close(clickAway);
    window.onclick = (event) => event.stopPropagation();
    document.addEventListener("keydown", (event) => {
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
    return clickAway;
  },

  open: (/** @type {HTMLElement} */ modal) => {
    modal.classList.remove("hidden");
    modal.querySelector(".modal-window").focus();
    console.log("open");
  },

  close: (/** @type {HTMLElement} */ modal) => {
    modal.classList.add("hidden");
  },
};
export default Modal;
