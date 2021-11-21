const db = require('../helpers/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const URL = 'http://localhost:8000/';
//const URL ='https://manga-reader-node.herokuapp.com/';

const userRegistration = (req, res) => {
    let {name, lastname, email, password, avatar} = req.body;
    let field = verifyData(name, email, password);
    if(field !== 'OK'){
        res.status(400).json({title: 'Error', content: field});
    }else{
        insertUserData(name, lastname, email, password, avatar).then(response =>{
            if(response.bool){
                return res.status(200).json({message: true, text: 'Valid registration'});
            }else{
                return res.status(400).json({message: false, text: 'Invalid registration'});
            } 
        });
    } 
}

const insertUserData = async (name, lastname, email, password, avatarPath = null) => {
    let client = await db.getClient();
    let query = 'INSERT INTO users(name, lastname, password, email, avatar, creation_date, rol_id) VALUES($1, $2, $3, $4, $5, NOW(), $6)';
    let salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    let params = [name, lastname, password, email, avatarPath, 1];
    if (avatarPath){
        try{
            await client.query(query, params);
            return {bool: true, payload: {email: email, password: password}};
        }catch(err){
            console.log(err);
        }
    }
}

const verifyData = (name, email, password) => {
    if (name.length < 1 || email.length < 1 || password.length < 1){
        return 'One or more fields empty.';
    }
    else if (name.length < 3 || name.length > 25){
        return 'Name must be between 3 and 25 characters.';
    }
    else if (password.length < 5 || password.length > 30){
        return 'Passwords must be between 5 and 30 characters.';
    }
    else{
        return 'OK';
    }
}

const userLogin = (req, res) => {
    let {email, password} = req.body;
    verifyCredentials(email, password).then(result => {
        if (result.verify){
            res.status(200).json({verify: true, title: 'Success', token: result.token, avatar: result.avatar, email: result.email, user_data: result.user_data});
        }
        else{
            res.status(403).json({verify: false, title: 'Error', token: result.message});
        }
    });
}

const verifyCredentials = async (email, password) => {
    let client = await db.getClient();
    let query = 'SELECT user_id, name, lastname, email, password, avatar FROM users WHERE email = $1';
    let params = [email];
    try{
        let result = await client.query(query, params);
        if (result.rowCount > 0){
            let same = await bcrypt.compare(password, result.rows[0].password);
            if (same){
                let payload = { email: email, password: password, id: result.rows[0].user_id, connect: true }
                let token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: 60 * 60 *24});
                return {verify: true, token: token, avatar: result.rows[0].avatar, email: email, user_data: result.rows[0].name+'-'+result.rows[0].lastname, message: 'Login success.'};
            }
            else{
                return {verify: false, token: null, message: 'Incorrect password.'};
            }
        }
        else{
            return {verify: false, token: null, message: 'Password not found.'};
        }
    }catch(e){
        console.log(e);
        return {verify: false, token: null, message: 'Error checking credentials.'};
    }finally{
        client.release();
    }
}

const userLogout = (req, res) =>{

}


const mangasSubscribed = async (req, res) =>{
    let { body } = req;
    const client = await db.getClient();
    let result;
    let query;
    if(body.token){
        let token = jwt.verify(body.token, process.env.JWT_SECRET);
        if(token.connect){
            query = 'SELECT * FROM subscriptions WHERE user_id = $1';
            result = await client.query(query,[token.id]);
            if(result.rowCount > 0){
                query = 'SELECT * FROM mangas WHERE manga_id = $1';
                let manga_id = result.rows[0].manga_id;
                result = await client.query(query,[manga_id]);
                res.status(200).json({content: result.rows, verify: true, url: URL+`${result.rows[0].manga_photo}`}) 
            }else{
                    return;
                }
            }else{
                return res.status(503).json({verify: false});
            }   
        }else{
            res.status(404).json({verify: false, message: 'there is no data'});
        }
}

const unsubscribeManga = async (req, res) =>{
    let { body } = req;
    if(body.token && body.manga_id){
        let token = jwt.verify(body.token, process.env.JWT_SECRET);
        if(token.connect){
            const client = await db.getClient();
            const query = 'DELETE FROM subscriptions WHERE manga_id=$1';
            try {
                await client.query(query, [body.manga_id]);
                return res.status(200).json({verify:true, result: 'Manga Unsubscribee'});
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = {
    userRegistration,
    userLogin,
    userLogout,
    mangasSubscribed,
    unsubscribeManga
}