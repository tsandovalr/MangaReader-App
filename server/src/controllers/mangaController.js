const db = require('../helpers/database');

const mangaCreation = (req, res) => {

    let {name, genres, author, artist, description, manga_photo, publisher, copyright, subscribe} = req.body;
    setDataManga(name, genres, author, artist, description, manga_photo, publisher, copyright, false).then(response =>{
        if(response.bool){
            return res.status(200).json({message: true, text: 'Valid registration of mangas', content: response.payload});
        }else{
            return res.status(400).json({message: false, text: 'Invalid registration of mangas'});
        } 
    }); 
    
}

const setDataManga = async (name, genres, author, artist, description, manga_photo, publisher, copyright, subscribe) => {
    let client = await db.getClient();
    let query = 'INSERT INTO mangas(name, genres, author, artist, description, manga_photo, publisher, copyright, subscribe, publication_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())';
    let params = [name, genres, author, artist, description, manga_photo, publisher, copyright, subscribe];
    try{
        await client.query(query, params);
        return {bool: true, payload: {name: name, genres: genres, author: author, artist: artist, description: description, manga_photo: manga_photo, publisher: publisher, copyright: copyright, subscribe: subscribe}};
    }catch(err){
        console.log(err);
    }
}

const getMangas = (req, res) =>{
    getMangasAsync().then(response =>{
        if(response.bool){
            return res.status(200).json(response.content);
        }else{
            return res.status(400).json({message: false, text: 'Invalid registration of mangas'});
        } 
    })
    
}

const getMangasAsync = async ()=>{
    let client = await db.getClient();
    let query = 'SELECT * FROM mangas';
    try{
        let result = await client.query(query);
        return {bool: true, content: result.rows};
    }catch(err){
        console.log(err);
    }
}


const getManga = (req, res) =>{
    console.log(req.params.id);
    if(req.params.id !== ''){
        getMangaAsync(req.params.id).then(response =>{
            if(response.bool){
                return res.status(200).json(response.content);
            }else{
                return res.status(400).json({message: false, text: 'Invalid registration of mangas'});
            } 
        })
    } 
}

const getMangaAsync = async (id) =>{
    let client = await db.getClient();
    let query = 'SELECT * FROM mangas WHERE manga_id = $1';
    try{
        let result = await client.query(query, [id]);
        return {bool: true,content: result.rows[0]};
    }catch(err){
        console.log(err);
    }
} 



module.exports = { mangaCreation, getMangas , getManga }