
const userRepo = require('../../../infrastructure/db/userRepo');

module.exports = async function userDetail({ userId }) {
    const user = await userRepo.findById(userId);
    if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });

    return { id: user.id, firstName: user.firstName, lastName: user.lastName, phone: user.phone, address: user.address, email: user.email, createdAt: user.createdAt };
};
