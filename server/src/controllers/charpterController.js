const mp = require("multiparty");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const db = require('../helpers/database');
const sharp = require('sharp');

const createCharpters = async (req, res) =>{
    let form = new mp.Form();
    form.parse(req, (err, fields, file) => {
        if (err){
            res.status(503).send(err);
        }
        else{
            let {name, manga_id} = fields;
            let {files} = file;
            saveFilesCharpters(files[0], name[0], manga_id[0]).then(response =>{
                if(response.verify){
                    res.status(200).json({verify: true, title: 'Success', content: response.content});
                }else{
                    res.status(503).json({verify: false, title: 'Error'});
                }
            });  
        }
    })
}

const saveFilesCharpters = async (file, name, manga_id) => {
    let type = file.originalFilename.split(".")[1];
    let filePath = `media/${name}`;
    let absolutePath = filePath + `/${file.originalFilename.split("  ")[0].split(".")[0]}.` + type ;
    if(filePath){
        const storage = multer.diskStorage({
            destination: (req, file, cb) =>{
                cb(null, filePath);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalFilename);
            }
        })
        try{
             if (fs.existsSync(filePath)){
                 multer(storage);
             }
             else{
                 fs.mkdirSync(filePath, {recursive: true});
             }
             let content = fs.readFileSync(file.path);
             fs.writeFileSync(absolutePath, content);
             fs.unlinkSync(file.path); 
           
            // ------
             let client = await db.getClient();
             let query = 'INSERT INTO chapters(name, page, manga_id) VALUES($1, $2, $3)';
             let xarray = new Array(1).fill(file.originalFilename.split("  ")[0])[0];
             let params = [name,xarray,manga_id];
             await client.query(query, params);  
             return {verify: true, title:"Success", content:absolutePath};    
         }catch(e){
             console.log(e);
             return {verify: false, title:"Error", content:e.message};
         } 
    }
}


const getCharpters = async (req, res) => {
    let text = "SELECT page FROM chapters";
    //let params = [1];
    let results;
    let dataUrl;
    let client = await db.getClient();
    try{
        results = await client.query(text);
        let rows = results.rows.map(item =>{              
            return item.page;
        });

    if (!rows[0]){
            res.status(200).json(rows[0]);
        }
        else{
            let path = rows[0];
            let mime = "image/" + path.split(".")[1]
            fs.readFile(path, {encoding: "base64"}, (readError, data) => {
                if (readError){
                  console.log(readError);
                  res.status(500).json({title:"error", content:readError.message});
                }
                else{
                    dataUrl = `data:${mime};base64,${data}`;                    
                    res.status(200).json({content:dataUrl});   
                }
            })
        }  
        console.log(rows);
    }catch(e){
      console.log(e);
      res.status(500).json({title: "Error", content:"Database query error"});
    }  

} 

const getCharpter = (req, res) =>{
    console.log(req.params.id);
    if(req.params.id !== ''){
        getCharpterAsync(req.params.id).then(response =>{
            if(response.bool){
                return res.status(200).json(response.content);
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
        return {bool: true,content: result.rows};
    }catch(err){
        console.log(err);
    }
} 

const updateCharpters = (req, res) =>{
    res.send('Estas en el metodo deleteFiles');
}

const deleteCharpters = (req, res) =>{
    res.send('Estas en el metodo deleteFiles');
}

module.exports ={
    createCharpters,
    getCharpters,
    getCharpter,
    updateCharpters,
    deleteCharpters
}