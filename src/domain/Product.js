
const crypto = require('crypto');

class Product {
    constructor({ id, movieId, userId, movieTitle, dias, rentedAt = new Date(),
        returnedAt = null }) {
        this.id = id;
        this.movieId = movieId;
        this.userId = userId;
        this.movieTitle = movieTitle;
        this.dias = dias;
        this.rentedAt = rentedAt;
        this.returnedAt = returnedAt;
    }

    static create({ userId, movieId, movieTitle, dias}) {
        if (!userId || !movieId || !movieTitle) {
            throw new Error("Missing rental data");
        }
        return new Product({
            id: crypto.randomUUID(),
            userId,
            movieId,
            movieTitle,
            dias,
            returnedAt: null
        })
    }

    isActive() {
        return this.returnedAt === null;
    }

    markAsReturned() {
        if (!this.isActive()) return
        this.returnedAt = new Date();
    }
}

module.exports = { Product };