
const bcrypt   = require('bcryptjs');
const userRepo = require('../../../infrastructure/db/userRepo');

module.exports = async function changePassword({ userId, currentPassword, newPassword }) {
  const user = await userRepo.findById(userId);
  if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) throw Object.assign(new Error('La contraseña actual es incorrecta'), { status: 401 });

  if (!newPassword || newPassword.length < 6)
    throw Object.assign(new Error('La nueva contraseña debe tener al menos 6 caracteres'), { status: 400 });

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  user.updatedAt = new Date();
  await userRepo.updatePassword(user);

  return { message: 'Contraseña actualizada correctamente' };
};
