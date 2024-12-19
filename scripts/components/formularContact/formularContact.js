import Modal from "../modal.js";

function validateError(element, errorMessage) {
  // cette fonction affiche un message selon le type d'erreur
  const errElement = (
    element instanceof NodeList ? element[0] : element
  ).closest(".formData");
  if (errorMessage) {
    errElement.setAttribute("data-error", errorMessage);
    errElement.setAttribute("data-error-visible", true);
  } else {
    errElement.setAttribute("data-error", "");
    errElement.setAttribute("data-error-visible", false);
  }
}

function validateInputEmpty(element) {
  // Cette fonction vérifie si le champ rentré n'est pas vide, sinon il affiche un message d'erreur
  if (element.value.length < 1) {
    validateError(element, "Champ obligatoire");
    return true;
  }
  validateError(element, null);
  return false;
}

function validateInputLength(element) {
  // Cette fonction vérifie si le champ rentré fait au moins 2 caractères, sinon il renvoie un message d'erreur
  if (element.value.length < 2) {
    validateError(element, "Doit contenir au moins 2 caractères");
    return true;
  }
  validateError(element, null);
  return false;
}

const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/; // Cette regex me permet de vérifier si le format du prénom et du nom est valide
function validateInputValidNameChars(element) {
  if (!regexName.test(element.value)) {
    validateError(element, "Contient des caractères invalides");
    return true;
  }
  validateError(element, null);
  return false;
}

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // J'utilise une regex qui me permet de vérifier si une addresse mail est valide ou non
function validateEmailChars(element) {
  if (!regex.test(element.value)) {
    validateError(element, "Email invalide");
    return true;
  }
  validateError(element, null);
  return false;
}

function validateField(validator) {
  return validator.validators.find((validate) => validate(validator.element));
}

export const initFormValidation = () => {
  // Je récupère ici les éléments de mon formulaire

  const form = document.querySelector(".formContact");
  const first_name = document.getElementById("firstName");
  const last_name = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("msg");
  const submitButton = document.getElementById("contact-submit");

  const itemsFormular = form.querySelectorAll(".formData input");
  itemsFormular.forEach((element) => {
    element.tabIndex = 1001;
  });

  const button = form.querySelector("#contact-submit");
  button.tabIndex = 1001;

  const validators = [
    // J'indique l'élémént à prendre en compte pour valider chaque partie du formulaire
    {
      element: first_name,
      validators: [
        validateInputEmpty,
        validateInputLength,
        validateInputValidNameChars,
      ],
    },
    {
      element: last_name,
      validators: [
        validateInputEmpty,
        validateInputLength,
        validateInputValidNameChars,
      ],
    },
    {
      element: email,
      validators: [validateInputEmpty, validateEmailChars],
    },
    {
      element: message,
      validators: [validateInputEmpty],
    },
  ];

  // J'appelle chaque validateur en cas de blur
  validators.forEach((validator) => {
    const element = validator.element;
    const elements = element instanceof NodeList ? [...element] : [element];
    elements.forEach((element) =>
      element.addEventListener("blur", () => {
        validateField(validator);
      })
    );
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validators.find((validator) => validateField(validator))) {
      const body = document.querySelector(".formContact");
      body.innerHTML =
        "<div> Merci pour votre message ! le photographe vous répondra inshAllah </div>";
      console.log(
        "Prénom : " + first_name.value + "\n",
        "Nom : " + last_name.value + "\n",
        "Email : " + email.value + "\n",
        "Message : " + message.value
      );
    }
  });
  submitButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!validators.find((validator) => validateField(validator))) {
        const body = document.querySelector(".formContact");
        body.innerHTML =
          "<div> Merci pour votre message ! le photographe vous répondra inshAllah </div>";
        console.log(
          "Prénom : " + first_name.value + "\n",
          "Nom : " + last_name.value + "\n",
          "Email : " + email.value + "\n",
          "Message : " + message.value
        );
      }
    }
  });
};
