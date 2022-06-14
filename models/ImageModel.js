const { Schema, model } = require("mongoose");


const ImageSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    }
})

module.exports = model( 'Image', ImageSchema )