const db = require('../helpers/database');

const chapterCreation = (req, res) => {

    let page=[];
    let {page, number} = req.body;
    setDataChapter(page, number, false).then(response =>{
        if(response.bool){
            return res.status(200).json({message: true, text: 'Valid registration of chapters', content: response.payload});
        }else{
            return res.status(400).json({message: false, text: 'Invalid registration of chapters'});
        } 
    }); 
    
}

const setDataChapter = async (page,number) => {
    let client = await db.getClient();2
    let query = 'INSERT INTO chapters(page,number) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())';
    let params = [page,number];
    try{
        await client.query(query, params);
        return {bool: true, payload: {page: page, number: number}};
    }catch(err){
        console.log(err);
    }
}