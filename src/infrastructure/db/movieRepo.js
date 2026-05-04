const { db } = require("./client");
const { Movie } = require("../../domain/Movie");

const toMovie = (r) => new Movie(r);

module.exports = {
    findById: (id) =>
        db.movie.findUnique({ where: { id } }).then(r => r ? toMovie(r) : null),

    findAll: () =>
        db.movie.findMany().then(rows => rows.map(toMovie)),

    findByYear: (year) =>
        db.movie.findMany({ where: { year } }).then(rows => rows.map(toMovie)),

    create: (movie) => db.movie.create({
        data: {
            id: movie.id, movieTitle: movie.movieTitle, desc: movie.desc,
            year: movie.year
        },
    }),

    delete: (id) =>
        db.movie.delete({ where: { id } }),

    update: (movie) => db.movie.update({   
        where: { id: movie.id },
        data: {
            movieTitle: movie.movieTitle,
            desc: movie.desc,
            year: movie.year
        },
    }),
}
