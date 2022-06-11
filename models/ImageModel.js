const { Schema, model } = require("mongoose");


const ImageSchema = Schema({
    name: {
        type: String,
        required: true
    },
    idRoom: {
        type: String,
        required: true  
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = model( 'Image', ImageSchema )