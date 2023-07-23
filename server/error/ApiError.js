export class ApiError extends Error {

    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    // Плохой запрос
    static badRequest(message) {
        return new ApiError(400, message);
    }

    // Не найден
    static notFound(message) {
        return new ApiError(404, message);
    }

    // Неавторизованно
    static unauthorized(message) {
        return new ApiError(401, message);
    }

    // Запрещено
    static forbidden(message) {
        return new ApiError(403, message);
    }


    // Внутренняя ошибка сервера
    static internalServerError(message) {
        return new ApiError(500, message);
    }

}