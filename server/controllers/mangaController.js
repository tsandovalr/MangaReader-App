const db = require('../helpers/database');
const jwt = require('jsonwebtoken');
//const URL ='https://manga-reader-node.herokuapp.com/';
const URL ='http://localhost:8000/';

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
        if(result.rowCount > 0){
            return {bool: true, content: result.rows, url: URL+`${result.rows[0].manga_photo}`};
        }else{
            return {bool: false};
        }
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
        return {bool: true,content: result.rows, url: URL+`${result.rows[0].manga_photo}`};
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
        const query3 = 'DELETE FROM subscriptions WHERE manga_id=$1';
        const client = await db.getClient();
        try {
            await client.query(query1, [req.params.id]);
            await client.query(query3, [req.params.id]);
            await client.query(query2, [req.params.id]);
            return res.status(200).json({result: 'Data Delete'});
        } catch (error) {
            console.log(error);
        }
    }
}

const toSubcribe = async (req,res) =>{
    let { body } = req;
    const client = await db.getClient();
    let query = '';
    if(body.manga_id && body.token){
        let token = jwt.verify(body.token, process.env.JWT_SECRET);
       if(token.connect){
           try {
               query = 'INSERT INTO subscriptions(user_id, manga_id) VALUES($1, $2)';
               await client.query(query,[token.id, body.manga_id]);

               query = 'SELECT * FROM users INNER JOIN subscriptions ON users.user_id = subscriptions.user_id';
               let result1 = await client.query(query);

               query = 'SELECT * FROM mangas INNER JOIN subscriptions ON mangas.manga_id = subscriptions.manga_id';
               let result2 = await client.query(query);

               if(result1.rows[0].user_id === result2.rows[0].user_id && result1.rows[0].manga_id === result2.rows[0].manga_id){
                   return res.status(200).json({verify: true});
               }else{
                   return res.status(503).json({verify: false});
               }
           } catch (error) {
            console.log(error);
           }
       }else{
           res.status(404).json({verify: false, message: 'Fail Connect'});
       }
    }else{
        return res.status(503).json({verify: false, message: 'there is no data'});
    }
}

module.exports = { 
    mangaCreation, 
    getMangas , 
    getManga, 
    updateManga, 
    deleteManga,
    toSubcribe }