export function validate(book) {
    let validationErrors = [];

    if (book.name.trim() === "")
        validationErrors.push("Book name is required field");

    if (book.writer.trim() === "")
        validationErrors.push("Writer is required field");

    if (book.publisher.trim() === "")
        validationErrors.push("Publisher is required field")

    if (book.publishingYear.trim() === "")
        validationErrors.push("Publishing year is required field")

    return validationErrors
}