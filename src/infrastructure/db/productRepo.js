const { db } = require("./client");
const { Product } = require("../../domain/Product");



const toProduct = (r) => new Product(r);

module.exports = {
    findById: (id) =>
        db.product.findUnique({ where: { id } }).then(r => r ? toProduct(r) : null),

    findByUserId: (userId) =>
        db.product.findMany({ where: { userId } }).then(rows => rows.map(toProduct)),

    findActiveRentals: () =>
        db.product.findMany({ where: { returnedAt: null } }).then(rows => rows.map(toProduct)),

    create: (product) => db.product.create({
        data: {
            id: product.id, movieId: product.movieId, userId: product.userId, movieTitle: product.movieTitle,
            rentedAt: product.rentedAt, returnedAt: product.returnedAt,
        },
    }),

    updateRental: (product) => db.product.update({
        where: { id: product.id },
        data: {
            rentedAt: product.rentedAt,
        },
    }),

    returnMovie: (product) => db.product.update({
        where: { id: product.id },
        data: {
            returnedAt: product.returnedAt
        },
    }),
};
