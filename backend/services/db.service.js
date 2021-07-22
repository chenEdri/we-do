var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "wedding_planner_db",
    multipleStatements: true
});

connection.connect(err => {
    // if (err) throw new Error('mySql failed connection');
    if(err) console.log('failed connect to mysql');
    console.log('connected to SQL server');
})

function runSQL(req) {
    console.log('req-------->',req);
    return new Promise((resolve, reject) => {
        connection.query(req, function (error, results, fields) {
            if (error) reject(error);
            else resolve(results);
   
        });
    })
}

module.exports = {
    runSQL
}