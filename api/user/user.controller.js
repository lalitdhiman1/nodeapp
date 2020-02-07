const { create, getUserByEmail, getUsers } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser:(req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password =hashSync(body.password, salt);
        create(body, (err, result)=>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                  success: 0,
                  message: "Database connection errror"
                });
              }
              return res.status(200).json({
                success: 1,
                data: result
              });
        })
    },
    loginUser: (req, res) =>{
        getUserByEmail(req.body, (err, result)=>{
            if(err){
                return console.log(err)
            }else{
                console.log(result[0].password)
                const isResult = compareSync(req.body.password, result[0].password);
                if(isResult){
                    result[0].password = undefined;
                    const tokenNumber = sign({result:result[0]}, process.env.JWT_KEY);
                    return res.json({
                        success: true,
                        message: "login successfully",
                        token: tokenNumber
                      });
                    } else {
                        return res.json({
                          success: false,
                          data: "Invalid email or password"
                        });
                      }
                // return res.status(200).json({
                //     success: 1,
                //     data: result
                //   });
            }
            
        })
    },
    getUser: (req, res) => {
        getUsers((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: true,
            data: results
          });
        });
      },
}