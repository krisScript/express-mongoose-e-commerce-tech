const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    ratings:[
        {
            userId: {
                type: Schema.Types.ObjectId,
                required: true,
                  ref: 'User'
                },
            rating:{
                required:true,
                type:Number,
                min: 1,
                max: 5
            }
        }
    ]    
});
module.exports = mongoose.model('Rating', ratingSchema);
