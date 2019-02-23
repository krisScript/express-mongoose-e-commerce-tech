const Admin = require('../models/admin')
const bcrypt = require('bcryptjs');
module.exports = async (req, res, next) => {
  const {adminUsername,
  adminPassword,
  adminEmail,} = require('../config/keys')
    let admin
    admin = await Admin.find()
    if(admin.length === 0){
        admin = new Admin({
            username:adminUsername,
            email:adminEmail,
            password:adminPassword
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