const { Router } = require('express');
const createMovie = require('../../../application/use-cases/movie/createMovie');
const getMoviesByYear = require('../../../application/use-cases/movie/getMoviesByYear');
const listMovies = require('../../../application/use-cases/movie/listMovies');
const updateMovie = require('../../../application/use-cases/movie/updateMovie');
const authMiddleware = require('../authMiddleware');
const adminMiddleware = require('../adminMiddleware');
const deleteMovie = require('../../../application/use-cases/movie/deleteMovie');

const fail = (err, res) => res.status(err.status || 500).json({ error: err.message });

const router = Router();

router.post('/create-a-new-movie', authMiddleware, adminMiddleware, async (req, res) => {
    const { movieTitle, desc, year } = req.body ?? {};
    if (!movieTitle || !desc || !year)
        return res.status(400).json({ error: 'El titulo, la descripción y el año son requeridos' });
    try { return res.status(201).json(await createMovie({ movieTitle, desc, year })); }
    catch (err) { return fail(err, res); }
});

router.get('/movies-by-year', async (req, res) => {
    const { year } = req.query ?? {};
    if (!year)
        return res.status(400).json({ error: 'No has añadido el año' });
    try { return res.status(200).json(await getMoviesByYear({ year })); }
    catch (err) { return fail(err, res); }
});

router.get('/all-movies', async (req, res) => {
    try { return res.status(200).json(await listMovies()); }
    catch (err) { return fail(err, res); }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { movieTitle, desc, year } = req.body ?? {};
    try { return res.status(200).json(await updateMovie({ id: req.params.id, movieTitle, desc, year })); }
    catch (err) { return fail(err, res); }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ error: 'No has añadido el id de la pelicula' });
    try { return res.status(200).json(await deleteMovie({ id })); }  
    catch (err) { return fail(err, res); }
});

module.exports = router;
