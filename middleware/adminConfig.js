const Admin = require('../models/admin')
const bcrypt = require('bcryptjs');
module.exports = async (req, res, next) => {
    let admin
    admin = await Admin.find()
    if(admin.length === 0){
        admin = new Admin({
            username:'admin',
            email:'newMail@mail.com',
            password:'12345678'
        })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(admin.password, salt, async (err, hash) => {
              if (err) throw err;
              admin.password = hash;
              await admin.save();
            });
          });
    }
   
}