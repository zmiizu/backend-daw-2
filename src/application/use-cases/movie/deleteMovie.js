const movieRepo = require('../../../infrastructure/db/movieRepo');

module.exports = async function deleteMovie({ id }) {
    const movie = await movieRepo.findById(id);
    if (!movie) throw Object.assign(new Error('Película no encontrada'), { status: 404 });

    await movieRepo.delete(id);
    return { message: 'Película eliminada correctamente' };
}
