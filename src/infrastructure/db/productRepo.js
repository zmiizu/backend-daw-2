const { db } = require("./client");
const { Product } = require("../../domain/Product");


const toProduct = (r) => new Product(r);

module.exports = {
    findById: (id) =>
        db.product.findUnique({ where: { id } }).then(r => r ? toProduct(r) : null),

    findByUser: (userId) =>
        db.product.findMany({ where: { userId } }).then(rows => rows.map(toProduct)),

    findAllActive: () =>
        db.product.findMany({ where: { returnedAt: null } }).then(rows => rows.map(toProduct)),

    create: (product) => db.product.create({
        data: {
            id: product.id, movieId: product.movieId, userId: product.userId, movieTitle: product.movieTitle,
            rentedAt: product.rentedAt, returnedAt: product.returnedAt, dias: product.dias,
        },
    }),

    update: (product) => db.product.update({
        where: { id: product.id },
        data: {
            returnedAt: product.returnedAt
        },
    }),
};
