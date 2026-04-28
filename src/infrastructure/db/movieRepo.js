const { db } = require("./client");
const { Movie } = require("../../domain/Movie");


const toMovie = (r) => new Movie(r);

module.exports = {
    //buscar por el ID de la pelicula
    findById: (id) =>
        db.movie.findUnique({ where: { id } }).then(r => r ? toMovie(r) : null),

    //buscar todas las peliculas
    findAll: () =>
        db.movie.findMany().then(rows => rows.map(toMovie)),

    //buscar por año
    findByYear: (year) =>
        db.movie.findMany({ where: { year } }).then(rows => rows.map(toMovie)),

    //crear una pelicula
    create: (movie) => db.movie.create({
        data: {
            id: movie.id, movieTitle: movie.movieTitle, desc: movie.desc,
            year: movie.year
        },
    }),

    //modificar una pelicula
    update: (movie) => db.movie.update({
        where: { id: movie.id },
        data: {
            desc: movie.desc
        },
    }),

}