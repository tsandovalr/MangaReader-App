const db = require('../helpers/database');


const cpUpload = upload.fields([{ name: 'chapterpage', maxCount: 1 }, { name: 'chapter', maxCount: 15 }])
const setChapters = async (cpUpload, id) => {
 // app.post('/chapter', cpUpload, function (req, res, next) {

    const {filename, mimetype, size} = req.files;
    const filepath = req.files.path;
    page='chapter';
    number=['chapterpage']

    let client = await db.getClient();
    let query = 'INSERT INTO chapters(page,number) VALUES($1, $2, NOW()) WHERE chapter_id=$1';
    let params = [page,number];
    try{
        await client.query(query, params);
        return {bool: true, payload: {page: page, number: number}};
    }catch(err){
        console.log(err);
    }

  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //  req.files['page'][0] -> File
  //  req.files['chapter'] -> Array

}


  const getChapters = (req, res) =>{
    getChaptersAsync().then(response =>{
        if(response.bool){
            return res.status(200).json(response.content);
        }else{
            return res.status(400).json({message: false, text: 'Invalid registration of chapters'});
        } 
    })
    
}

const getChaptersAsync = async ()=>{
    let client = await db.getClient();
    let query = 'SELECT * FROM chapters';
    try{
        let result = await client.query(query);
        return {bool: true, content: result.rows};
    }catch(err){
        console.log(err);
    }
}

const getChapter = (req, res) =>{
    console.log(req.params.id);
    if(req.params.id !== ''){
        getChapterAsync(req.params.id).then(response =>{
            if(response.bool){
                return res.status(200).json(response.content);
            }else{
                return res.status(400).json({message: false, text: 'Invalid registration of chapters'});
            } 
        })
    } 
}

const getChapterAsync = async (id) =>{
    let client = await db.getClient();
    let query = 'SELECT * FROM chapters WHERE chapter_id = $1';
    try{
        let result = await client.query(query, [id]);
        return {bool: true,content: result.rows[0]};
    }catch(err){
        console.log(err);
    }
} 

module.exports = { setChapters, getChapters, getChapter }