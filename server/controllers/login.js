const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../helpers/database');


const userLogin = (req, res) => {
    let {email, password} = req.body;
    verifyCredentials(email, password).then(result => {
        if (result.verify){
            res.status(200).json({verify: true, title: 'Success', token: result.token, avatar: result.avatar, email: result.email});
        }
        else{
            res.status(403).json({verify: false, title: 'Error', token: result.message});
        }
    });
}

const verifyCredentials = async (email, password) => {
    let client = await db.getClient();
    let query = 'SELECT user_id, email, password, avatar FROM users WHERE email = $1';
    let params = [email];
    try{
        let result = await client.query(query, params);
        if (result.rowCount > 0){
            let same = await bcrypt.compare(password, result.rows[0].password);
            console.log(same);
            if (same){
                let payload = { email: email, password: password, id: result.rows[0].user_id, connect: true }
                let token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: 60 * 60 *24});
                return {verify: true, token: token, avatar: result.rows[0].avatar, email: email, message: 'Login success.'};
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

module.exports = {userLogin}
