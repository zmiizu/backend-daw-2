
const crypto = require('crypto');

class Movie {
    constructor({ id, movieTitle, desc, year }) {
        this.id = id;
        this.movieTitle = movieTitle;
        this.desc = desc;
        this.year = year;
    }
    static create({ movieTitle, desc, year }) {
        if (!movieTitle || !desc) {
            throw new Error("Faltan datos por rellenar");
        }
        return new Movie({
            id: crypto.randomUUID(),
            movieTitle,
            desc,
            year
        })
    }
    updateMovie({movieTitle, desc, year}){
        if (movieTitle) this.movieTitle = movieTitle;
        if (desc) this.desc = desc;
        if (year) this.year = year;
    }
}

module.exports = { Movie }