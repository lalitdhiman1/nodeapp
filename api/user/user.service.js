const pool = require('../../config/db');

module.exports = {
    create: (data, cb)=>{
        pool.query('insert into users(username, email, password) values(?,?,?)', [data.username, data.email, data.password], (err, result)=>{
            if(err){
                cb(err)
            }
            return cb(null, result)
        })

    },
    getUserByEmail:(data, cb)=>{
        pool.query('select * from users where username=?', [data.username], (err, result)=>{
            if(err){
                cb(err)
            }
            return cb(null, result)
        })

    },
    getUsers:(cb)=>{
        pool.query('select * from users',(err, result)=>{
            if(err){
                cb(err)
            }
            return cb(null, result)
        })

    }
}