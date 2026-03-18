const { Product } = require('../../../domain/Product');
const productRepo = require('../../../infrastructure/db/productRepo');
const userRepo = require('../../../infrastructure/db/userRepo');
const emailService = require('../../../infrastructure/email/emailService');
const PRECIO_DIA = 2;

const err = (msg, status) => Object.assign(new Error(msg), { status });

module.exports = async function rent({ userId, movieTitle, dias, movieId }) {
    //se comprueba que el usuario tenga el mail verificado
    const user = await userRepo.findById(userId);
    if (!user) throw err('Usuario no encontrado', 404);
    if (!user.isEmailVerified) throw err('Verifica tu email antes de entrar', 403);

    // se guarda los alquileres en ya alquilada para comprobar si esta alquilada la pelicula
    const alquileres = await productRepo.findByUser(userId);
    const yaAlquilada = alquileres.find(a => a.movieId === movieId && a.isActive());

    //se lanza error si ya esta alquilada la pelicula
    if (yaAlquilada) {
        throw err('Error ya tienes alquilada la pelicula', 409);
    }
    
    /* Se crea el objeto alquiler y se crea el alquiler
    *  El total se calcula con el numero de dias por 2 euros
    */
    const alquiler = Product.create({ userId, movieId, movieTitle, dias });
    await productRepo.create(alquiler);
    const total = alquiler.dias * PRECIO_DIA;
    
    //Se envia mail al usuario que se ha alquilado la pelicula
    await emailService.send(user.email, 'rentConfirmation',
        { movieTitle: alquiler.movieTitle, dias: alquiler.dias, total: total });
    
    return {alquiler, total};
}