const { Product } = require('../../../domain/Product');
const productRepo = require('../../../infrastructure/db/productRepo');
const userRepo = require('../../../infrastructure/db/userRepo');
const emailService = require('../../../infrastructure/email/emailService');
const PRECIO_DIA = 2;

const err = (msg, status) => Object.assign(new Error(msg), { status });

module.exports = async function rent({ userId, movieTitle, dias, movieId }) {
    const user = await userRepo.findById(userId);
    if (!user) throw err('Usuario no encontrado', 404);
    if (!user.isEmailVerified) throw err('Verifica tu email antes de entrar', 403);

    const alquileres = await productRepo.findByUser(userId);
    const yaAlquilada = alquileres.find(a => a.movieId === movieId && a.isActive());

    if (yaAlquilada) {
        throw err('Error ya tienes alquilada la pelicula');
    }
    
    const alquiler = Product.create({ userId, movieId, movieTitle, dias });
    await productRepo.create(alquiler);

    const total = dias * PRECIO_DIA;
    await emailService.send(user.email, 'rentConfirmation',
        { movieTitle: alquiler.movieTitle, dias: alquiler.dias, total: total });

}