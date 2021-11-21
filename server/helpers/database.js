const {Pool} = require('pg');

/* const pool = new Pool({
    host: 'localhost',
    database: 'DB-MangaReader',
    user: 'postgres',
    password: '29758990',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});  
 */
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,
    },
    idleTimeoutMillis: 1000,
    min: 0,
    query_timeout: 5000
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