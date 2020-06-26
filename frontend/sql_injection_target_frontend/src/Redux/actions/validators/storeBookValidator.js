export function validate(item) {
    let validationErrors = [];

    if (item.selectedStore.value === undefined)
        validationErrors.push("Store is required field")

    if (item.selectedBook.value === undefined)
        validationErrors.push("Book is required field")

    if (parseInt(item.quantity) <= 0)
        validationErrors.push("Quantity must be greater than zero")

    return validationErrors;
}