const { Movie } = require('../../../domain/Movie');
const movieRepo = require('../../../infrastructure/db/movieRepo');

module.exports = async function createMovie({ movieTitle, desc, year }) {
    //se crea pelicula, se añade al repo y se devuelve
    const movie = Movie.create({ movieTitle, desc, year});
    await movieRepo.create(movie);
    return {movie};
}