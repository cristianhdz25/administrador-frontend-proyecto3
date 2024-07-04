export const handleInvalidInput = (input, errorMessages) => {
    const span = input.parentElement.querySelector(".invalid-feedback");
    input.classList.add("is-invalid");
    span.textContent = Object.keys(errorMessages[input.name])
        .filter(error => input.validity[error])
        .map(error => errorMessages[input.name][error])
        .join(" ");

    if (span.textContent === "") {
        input.classList.remove("is-invalid");
    }
};

export const validateForm = (form, errorMessages) => {
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        handleInvalidInput(input, errorMessages);
    });

    return form.checkValidity();
}

