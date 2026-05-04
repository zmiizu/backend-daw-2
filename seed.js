// seed.js — ejecutar desde la raíz del proyecto: node seed.js
const { db } = require('./src/infrastructure/db/client');
const { movies } = require('./movies');
const crypto = require('crypto');

async function main() {
    console.log(`Insertando ${movies.length} películas...`);

    for (const m of movies) {
        await db.movie.create({
            data: {
                id: crypto.randomUUID(),
                movieTitle: m.title,
                desc: m.plot || m.title,
                year: parseInt(m.year) || null,
            }
        });
    }

    console.log('✅ Seed completado correctamente');
    await db.$disconnect();
}

main().catch(async (e) => {
    console.error('❌ Error en seed:', e.message);
    await db.$disconnect();
    process.exit(1);
});
