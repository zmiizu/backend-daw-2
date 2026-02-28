
const crypto = require('crypto');

class Product {
    constructor({ id, movieId, userId, movieTitle, rentedAt = new Date(),
        returnedAt = null}) {
        this.id = id;
        this.movieId = movieId;
        this.userId = userId;
        this.movieTitle = movieTitle;
        this.rentedAt = rentedAt;
        this.returnedAt = returnedAt;
    }

    static create({userId, movieId, movieTitle, rentedAt, returnedAt}){
        return new Product({
            id: crypto.randomUUID(),
            userId,
            movieId,
            movieTitle,
            rentedAt: new Date(),
            returnedAt: null
        })
    }

    isActive(){
        return this.returnedAt === null;
    }

    return(){
        if(!this.isActive()) return
        this.returnedAt = new Date();
    }
}

module.exports = { Product };