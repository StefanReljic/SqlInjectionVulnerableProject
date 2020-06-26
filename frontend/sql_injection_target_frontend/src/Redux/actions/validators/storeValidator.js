export function validate(store) {
    let validationErrors = [];

    if (store.name.trim() === "")
        validationErrors.push("Name is required field");

    if (store.address.trim() === "")
        validationErrors.push("Address is required field")

    if (store.phone.trim() === "")
        validationErrors.push("Phone is required field");

    return validationErrors;
}