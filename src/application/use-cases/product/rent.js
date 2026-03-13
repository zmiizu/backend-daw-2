const {Product} = require('../../../domain/Product');
const productRepo = require('../../../infrastructure/db/productRepo');
const userRepo = require('../../../infrastructure/db/userRepo');
const emailService = require('../../../infrastructure/email/emailService');

const err = (msg, status) => Object.assign(new Error(msg), { status });

module.exports = async function rent({userId, movieTitle, dias, movieId}) {
    const user = await userRepo.findByEmail(email);
    if(!user.isEmailVerified) throw err ('Verifica tu email antes de entrar', 403);

    let alquiler = new Product(); 

    if(Product.isActive()){
        throw err ('Error ya tienes alquilada la pelicula');
    } else {
        alquiler.create(userId, movieId, movieTitle, dias);
        productRepo.create(alquiler);
        emailService.send(user.email, 'rentConfirmation');
    }
}