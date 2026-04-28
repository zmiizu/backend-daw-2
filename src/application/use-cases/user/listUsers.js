const userRepo = require('../../../infrastructure/db/userRepo');

module.exports = async function listUsers() {
    const users = await userRepo.findAll();
    return { users: users.map(u => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt
    }))};
}