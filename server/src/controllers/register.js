const db = require('../helpers/database');
const bcrypt = require('bcrypt');

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
    let query = 'INSERT INTO users(name, lastname, password, email, avatar, creation_date) VALUES($1, $2, $3, $4, $5, NOW())';
    let salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    let params = [name, lastname, password, email, avatarPath];
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

module.exports = { userRegistration }