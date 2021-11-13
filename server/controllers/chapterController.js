const mp = require("multiparty");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const db = require('../helpers/database');
//const sharp = require('sharp');
const path = require('path');

const createCharpters = (req, res) =>{
     let { body, files} = req
     
    if(body && files){
        saveFilesCharpters(files.files[0].filename, body.name, body.manga_id, body.token, body.listFiles).then(response =>{
            if(response.verify){
                res.status(200).json({verify: true, title: 'Success', content: response.content});
            }else{
                res.status(503).json({verify: false, title: 'Error'});
            }
        }); 
    }  
}

const saveFilesCharpters = async (filename, name, manga_id, token, list) => {
    try{
         let client = await db.getClient();
         let query = 'INSERT INTO chapters(name, page, manga_id) VALUES($1, $2, $3)';
         let params = [name, filename, manga_id];
         await client.query(query, params);    
         return {verify: true, title:"Success"};    
     }catch(e){
         console.log(e);
         return {verify: false, title:"Error", content:e.message};
     } 
    
}


const getCharpters = async (req, res) => {
    let text = "SELECT page FROM chapters";
    let results;
    let dataUrl;
    let client = await db.getClient();
    try{
        results = await client.query(text);
        let rows = results.rows.map(item =>{              
            return item.page;
        });

        console.log(rows.length);
        res.status(200).json({content: results.rows, url: results.rows})
    }catch(e){
      console.log(e);
      res.status(500).json({title: "Error", content:"Database query error"});
    }  

} 

const getCharpter = (req, res) =>{
    if(req.params.id){
        getCharpterAsync(req.params.id).then(response =>{
            if(response.boolean){
                return res.status(200).json({content: response.content, number: response.content.length});
            }else{
                return res.status(400).json({message: false, text: 'Invalid registration of mangas'});
            } 
        })
    }  
}

const getCharpterAsync = async (id) =>{
    let client = await db.getClient();
    let query = 'SELECT * FROM chapters WHERE manga_id = $1';
    try{
        let result = await client.query(query, [id]);
        return {boolean: true,content: result.rows};
    }catch(err){
        console.log(err);
    }
} 

const updateCharpters = (req, res) =>{
    res.send('Estas en el metodo deleteFiles');
}

const deleteCharpters = async (req, res) =>{
    if(req.params.id){
        const query = "DELETE FROM chapters WHERE manga_id=$1";
        const client = await db.getClient();
        try {
            await client.query(query, [req.params.id]);
            return res.status(200).json({result: 'Data Delete'});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports ={
    createCharpters,
    getCharpters,
    getCharpter,
    updateCharpters,
    deleteCharpters
}