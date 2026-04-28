const { Movie } = require('../../../domain/Movie');
const movieRepo = require('../../../infrastructure/db/movieRepo');

module.exports = async function listMovie() {
    //listado de todas las peliculas
    const movieList = await movieRepo.findAll();
    return { movieList };
}