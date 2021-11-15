const manga = {
   getQuantityComment:`SELECT COUNT(*) AS quantity_commentary FROM commentary WHERE manga_id=$1`,
    addFavorite:`INSERT INTO favorite(manga_id, user_id) VALUES ($1, $2)`,
   	getFavoriteManga: `SELECT * FROM favorite AS F INNER JOIN mangas AS M ON M.id = F.manga_id WHERE F.user_id=$1`,
   	getFavoriteMangaById: `SELECT * FROM mangas AS M INNER JOIN favorite AS F ON M.id=F.manga_id WHERE F.user_id=$1 AND M.id=$2`,
    addManga:`INSERT INTO mangas(name, genres, author, artist, description, manga_photo, publisher, copyright, subscribe, publication_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,

   	}


module.exports = manga;