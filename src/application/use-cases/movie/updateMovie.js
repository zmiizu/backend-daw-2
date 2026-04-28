const { Movie } = require('../../../domain/Movie');
const movieRepo = require('../../../infrastructure/db/movieRepo');

module.exports = async function updateMovie({id, movieTitle, desc, year}) {
    //se comprueba si existe la pelicula, en caso afirmativo se guarda en movie y se actualiza
    const movie = await movieRepo.findById(id);
    if (!movie) throw Object.assign(new Error('Película no encotnrada'), {status: 404});

    movie.updateMovie({movieTitle, desc, year});
    await movieRepo.update(movie);

    return{id: movie.id, movieTitle: movie.movieTitle, desc: movie.desc, year: movie.year};
}