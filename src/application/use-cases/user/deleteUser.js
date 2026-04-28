
const userRepo = require('../../../infrastructure/db/userRepo');

module.exports = async function deleteUser({ userId }) {
    const user = await userRepo.findById(userId);
    if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });

    await userRepo.delete(userId);
    return { message: 'Usuario eliminado correctamente' };
};
