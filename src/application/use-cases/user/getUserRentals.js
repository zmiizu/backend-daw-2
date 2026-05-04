const { db } = require('../../../infrastructure/db/client');

module.exports = async function getUserRentals({ userId }) {
    const rentals = await db.product.findMany({
        where: { userId }
    });
    return { rentals };
};