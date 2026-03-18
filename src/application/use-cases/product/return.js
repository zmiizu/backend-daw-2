const productRepo = require('../../../infrastructure/db/productRepo');
const userRepo = require('../../../infrastructure/db/userRepo');
const emailService = require('../../../infrastructure/email/emailService');

const err = (msg, status) => Object.assign(new Error(msg), { status });

module.exports = async function returnMovie({ userId, productId }) {
    //se comprueba que el usuario tenga el mail verificado
    const user = await userRepo.findById(userId);
    if (!user) throw err('Usuario no encontrado', 404);
    if (!user.isEmailVerified) throw err('Verifica tu email antes de entrar', 403);

    //se almacena los datos en rent y se comprueba que el alquiler exista y este devuelto
    const rent = await productRepo.findById(productId);
    if (!rent) {
        throw err('Alquiler no encontrado', 404);
    }
    if (!rent.isActive()) {
        throw err('La pelicula ya esta devuelta', 400);
    }

    //se marca como devuelto y se updatea en la base de datos
    rent.markAsReturned();
    await productRepo.update(rent);
    await emailService.send(user.email, 'returnConfirmation',
        { movieTitle: rent.movieTitle, returnedAt: rent.returnedAt });

    //se devuelvn los datos
    return { rent };
}