const db = require('../helpers/database');

const mangaCreation = (req, res) => {
    let { body, files} = req;
    if(body && files){
        setDataManga(body.name, body.genres, body.author, body.artist, body.description, files.files[0].filename, body.publisher, body.copyright, false).then(response =>{
            if(response.bool){
                return res.status(200).json({message: true, text: 'Valid registration of mangas', content: response.payload});
            }else{
                return res.status(400).json({message: false, text: 'Invalid registration of mangas'});
            } 
        }); 
    } 
    
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
            return res.status(200).json({content: response.content, url: response.url});
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
        return {bool: true, content: result.rows, url: `http://localhost:8000/${result.rows[0].manga_photo}`};
    }catch(err){
        console.log(err);
    }
}

const getManga = (req, res) =>{
    if(req.params.id){
        getMangaAsync(req.params.id).then(response =>{
            if(response.bool){
                return res.status(200).json({content: response.content, url: response.url});
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
        return {bool: true,content: result.rows, url: `http://localhost:8000/${result.rows[0].manga_photo}`};
    }catch(err){
        console.log(err);
    }
} 

const updateManga = (req, res) =>{
    let {name, genres, author, artist, description, manga_photo, publisher, copyright} = req.body;
    updateMangaAsync(name, genres, author, artist, description, manga_photo, publisher, copyright, req.params.id).then(response =>{
        if(response.bool){
            return res.status(200).json(response.content);
        }else{
            return res.status(400).json({message: false, text: 'Invalid update of mangas'});
        } 
    })
   
}

const updateMangaAsync = async (name, genres, author, artist, description, manga_photo, publisher, copyright, manga_id) =>{
    const query = "UPDATE mangas SET name= $1, genres= $2, author= $3, artist= $4, description= $5, manga_photo= $6, publisher= $7, copyright= $8 WHERE manga_id=$9";
    const client = await db.getClient();
    let params = [name, genres, author, artist, description, manga_photo, publisher, copyright, manga_id]
    try {
        let result = await client.query(query, params);
        return {bool: true,content: result.rows[0]};
    } catch (error) {
        console.log(error);
    }
}

const deleteManga = async (req, res) =>{
    console.log(req.params.id)
    if(req.params.id){
        const query1 = "DELETE FROM chapters WHERE manga_id=$1";
        const query2 = "DELETE FROM mangas WHERE manga_id=$1";
        const client = await db.getClient();
        try {
            await client.query(query1, [req.params.id]);
            await client.query(query2, [req.params.id]);
            return res.status(200).json({result: 'Data Delete'});
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = { mangaCreation, getMangas , getManga, updateManga, deleteManga }