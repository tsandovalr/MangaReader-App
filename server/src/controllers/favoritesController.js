const db = require('../helpers/database');




const addFavorite = async(req, res, next) =>{

	try{
		console.log("addFavorite")
    	let dataManga
    	let resManga = await db.query(`${manga.getFavoriteMangaById}`, [req.body.user, req.body.manga.id])
    	console.log("1")

        let query = 'SELECT * FROM mangas WHERE manga_id = $1';

    	if(resManga.rows.length == 0){

            
            
            let dataManga = await client.query(query, [id]);
         

			const addManga = async() =>{
				 await db.query(`${manga.addFavorite}`, [dataManga.manga_id, dataManga.user_id])
				res.send(JSON.stringify({
				    status: 200,
				    response: "Se ha agregado a favoritos de forma exitoza"
				}));
			}
			addManga()

			


    		
    	}else{
    		res.send(JSON.stringify({
			    status: 200,
			    response: "Esta pelicula ya se encuentra es su lista de favoritos"
			}));
    	}
		



		// console.log("addFavourite")
		// console.log(req.body)
		// let quantityComment = await db.query(`${movie.addFavourite}`, [req.body.movie.id, req.body.user])
		// res.send(JSON.stringify({
		//     status: 200,
		//     response: "Se ha agregado a favoritos de forma exitoza"
		// }));
	}catch(error){
		res.send(JSON.stringify({
            status: 404,
            response: error
        }));
		throw error
	}

}


const getFavoriteManga = async(req, res, next) =>{

	try{
		console.log("getFavoriteManga")
        const { user } = req.body;
        let i = 0;
        let data;
		let favoriteManga = await db.query(`${manga.getFavoriteManga}`, [user])

		
		res.send(JSON.stringify({
		    status: 200,
		    response: favoriteManga.rows
		}));
	}catch(error){
		res.send(JSON.stringify({
            status: 404,
            response: error
        }));
		throw error
	}
}




module.exports = { addFavorite ,getFavoriteManga }