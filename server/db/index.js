const mysql = require('mysql');

const pool = mysql.createPool({
user: 'bsale_test',
database: 'bsale_test',
password: 'bsale_test',
host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com'

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