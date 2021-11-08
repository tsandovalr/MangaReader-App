const {Pool} = require('pg');

/* const pool = new Pool({
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});  */ 

const pool = new Pool({
    host: 'localhost',
    database: 'DB-MangaReader',
    user: 'postgres',
    password: '29758990',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});   

pool.on('error', (error, client) => {
    console.log(error);
});


const getClient = async () => {
    return await pool.connect();
}

module.exports = {
    getClient
}