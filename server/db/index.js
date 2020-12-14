const mysql = require('mysql');

const pool = mysql.createPool({
user: 'xx',
database: 'xx',
password: 'xx',
host: 'xx'

});

let bsaledb = {

};

bsaledb.all = () => {
    return new Promise((resolve, reject) =>{
            pool.query('SELECT * FROM product;', (err,results)=>{
                if(err){
                return reject(err);
                }
                return resolve(results);
            });
    });
};

bsaledb.search = (buscar) => {
    return new Promise((resolve, reject) =>{
             let like = '%' + buscar + '%';
             pool.query('Select * FROM product where name like ? ;', like , (err,results)=>{
                if(err){
                return reject(err);
                }
                return resolve(results);
            });
    });
};

module.exports = bsaledb;
