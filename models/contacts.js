const db = require("./db");

// insert data in database
async function addContact(userData, userid) {
    let sqlStmt =
        "INSERT INTO contact (name, email, phone, userid) VALUES ($1, $2, $3, $4) RETURNING *";
    let { name, email, phone } = userData;
    return db.pool.query(sqlStmt, [name, email, phone, userid]);
}

//get contacts by name
async function getContacts(name, userid) {
    let sqlStmt = "SELECT  * FROM contact WHERE userid=$1 AND name=$2 ";
    return db.pool.query(sqlStmt, [userid, name]);
}

//update Contanct by name
async function updateContacts(userData, name2, userId) {
    let sqlStmt =
        "UPDATE contact SET name=$1, email=$2, phone=$3 WHERE userid=$4 AND name=$5";
    let { name, email, phone } = userData;
    let name1 = name2;
    let userid = userId;
    return db.pool.query(sqlStmt, [name, email, phone, userid, name1]);
}

//delete contacts by name
async function deleteContacts(name2, userId) {
    let sqlStmt = "DELETE FROM contact WHERE userid=$1 AND name=$2";
    let name1 = name2;
    let userid = userId;
    return db.pool.query(sqlStmt, [userid, name1]);
}

module.exports = {
    addContact,
    getContacts,
    updateContacts,
    deleteContacts,
};