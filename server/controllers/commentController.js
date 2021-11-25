const jwt = require("jsonwebtoken");
const db = require('../helpers/database');
//const URL ='https://manga-reader-node.herokuapp.com/';
//const URL ='http://localhost:8000/';

const addComment = async (req, res) =>{
    let { body } = req
    if(body.token && body.manga_id && body.text){
        let verify = jwt.verify(body.token, process.env.JWT_SECRET);
        let client = await db.getClient();
        if(verify.connect){
            let query = 'INSERT INTO comments(text,date,user_id,manga_id) VALUES($1,NOW(),$2,$3)';
            let params = [body.text,verify.id,body.manga_id];
            await client.query(query, params);
            res.status(200).json({verify: true, text:'Comment Created'})
        }else{
            res.status(503).json({verify: false, text:'Token Invalid'})
        }
    }else{
        res.status(503).json({verify: false, text:'Data Invalid'})
    }
}

const getComments = async (req, res) =>{
    let client = await db.getClient();
    let query = 'SELECT * FROM comments';
    try{
        let result = await client.query(query);
        if(result.rowCount > 0){
            res.status(200).json({verify: true, content: result.rows}) ;
        }else{
            res.status(503).json({verify: false});
        }
    }catch(err){
        console.log(err);
    }
}
  


const getComment = async (req, res) =>{
    if(req.params.id){
        let client = await db.getClient();
        let query = 'SELECT * FROM comments WHERE manga_id = $1';
        try{
            let result = await client.query(query, [req.params.id]);
           res.status(200).json({verify: true,content: result.rows});
        }catch(err){
            console.log(err);
        }
    }else{
        res.status(503).json({verify: false});
    }

}

const updateComment = async (req, res) =>{
    let { body } = req;
    console.log(req.params.id);
    if(body.text && body.token){
        let verify = jwt.verify(body.token, process.env.JWT_SECRET);
        if(verify.connect){
            const query = "UPDATE comments SET text= $1 WHERE comment_id=$2 ";
            const client = await db.getClient();
            let params = [body.text, req.params.id];
            try {
                let result = await client.query(query, params);
                console.log(result.rows[0]);
                res.status(200).json({verify: true,content: result.rows[0]});
            } catch (error) {
                console.log(error);
            } 
        }else{
            res.status(503).json({verify: false, text:'Token Invalid'})
        }
    }else{
        res.status(503).json({verify: false, text:'Data Invalid'})
    }
    
}

const deleteComment = async (req, res) =>{
    if(req.params.id){
        const query = "DELETE FROM comments WHERE comment_id=$1";
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
    addComment,
    getComments,
    getComment,
    updateComment,
    deleteComment
}