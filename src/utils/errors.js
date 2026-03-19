class AppError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}

class ValidationError extends AppError{
    constructor(errors){
        super("Validation error", 400);
        this.errors = errors;
    }
}

class NotFoundError extends AppError{
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

module.exports = {
    AppError,
    ValidationError,
    NotFoundError
};