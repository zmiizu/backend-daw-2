const { Movie } = require('../../../domain/Movie');
const movieRepo = require('../../../infrastructure/db/movieRepo');

module.exports = async function MovieByYear({ year }) {
    const movieListYear = await movieRepo.findByYear(Number(year));
    return { movieListYear };
}