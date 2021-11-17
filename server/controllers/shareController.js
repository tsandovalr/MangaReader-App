const SocialPost = require("social-post-api");
const API_KEY = "1YEZRP5-FP1MDW3-QAMHPPV-MB5Y6PF"; 
const social = new SocialPost(API_KEY);

const shareManga = (req, res) =>{
    if(req.params.id){
        getMangaAsync(req.params.id).then(response =>{
            if(response.bool){
                return res.status(200).json({content: response.content, url: response.url});
            }else{
                return res.status(400).json({message: false, text: 'Invalid sharing of manga'});
            } 
        })
    } 
}

const getMangaAsync = async (id) =>{
    let client = await db.getClient();
    let query = 'SELECT * FROM mangas WHERE manga_id = $1';
    try{
        let result = await client.query(query, [id]);
        
        await social.post({
            bool: true,content: result.rows,
            post: `Currently I'm reading ${result.rows[0].name} written by ${result.rows[0].author}`,
            platforms: ["twitter"],
            mediaUrls: [`http://localhost:8000/${result.rows[0].manga_photo}`]
          })
    }catch(err){
        console.log(err);
    }
} 

module.exports = { shareManga }