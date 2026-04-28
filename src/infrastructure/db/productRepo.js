const { db } = require("./client");
const { Product } = require("../../domain/Product");


const toProduct = (r) => new Product(r);

module.exports = {
    //buscar por ID
    findById: (id) =>
        db.product.findUnique({ where: { id } }).then(r => r ? toProduct(r) : null),

    //buscar por el ID del usuario
    findByUser: (userId) =>
        db.product.findMany({ where: { userId } }).then(rows => rows.map(toProduct)),

    //Buscar alquileres activos
    findAllActive: () =>
        db.product.findMany({ where: { returnedAt: null } }).then(rows => rows.map(toProduct)),

    //crear un producto en la bd
    create: (product) => db.product.create({
        data: {
            id: product.id, movieId: product.movieId, userId: product.userId, movieTitle: product.movieTitle,
            rentedAt: product.rentedAt, returnedAt: product.returnedAt, dias: product.dias,
        },
    }),

    //modificar cuando se devuelve el alquiler
    update: (product) => db.product.update({
        where: { id: product.id },
        data: {
            returnedAt: product.returnedAt
        },
    }),
};
