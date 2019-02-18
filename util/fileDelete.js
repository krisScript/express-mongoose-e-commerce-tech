const fs = require('fs')
const fileDelete = fileUrl => {
  console.log(fileUrl,'The shit is this bullshit')
    if(fileUrl){
       fs.unlink(fileUrl,(err) => {
          if(err){
            throw err
          }
        })
      }
}
module.exports = fileDelete