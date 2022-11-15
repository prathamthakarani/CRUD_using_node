const Pool = require("pg").Pool;
// database conncetion
const pool = new Pool({
    user: process.env.user,
    host: "localhost",
    database: "crud",
    password: process.env.password,
    port: 5432,
});

module.exports = {
    pool,
};