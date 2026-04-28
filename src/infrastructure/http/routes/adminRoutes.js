const { Router } = require('express');
const listUsers = require('../../../application/use-cases/user/listUsers');
const getUserDetail = require('../../../application/use-cases/user/getUserDetail');
const deleteUser = require('../../../application/use-cases/user/deleteUser');
const authMiddleware = require('../authMiddleware');
const adminMiddleware = require('../adminMiddleware');

const fail = (err, res) => res.status(err.status || 500).json({ error: err.message });

const router = Router();

router.get('/lista-de-usuarios', authMiddleware, adminMiddleware, async (req, res) => {
    try { return res.status(200).json(await listUsers()); }
    catch (err) { return fail(err, res); }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        return res.status(400).json({ error: 'No has añadido el id de usario' });
    try { return res.status(200).json(await deleteUser({ userId })); }
    catch (err) { return fail(err, res); }
});

router.get('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        return res.status(400).json({ error: 'No has añadido el id de usario' });
    try { return res.status(200).json(await getUserDetail({ userId })); }
    catch (err) { return fail(err, res); }
});

module.exports = router;