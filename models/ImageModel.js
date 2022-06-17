const { Schema, model } = require("mongoose");


const ImageSchema = Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    }
})

ImageSchema.method('toJSON', function(){//Para devolver la info en el controlador con el objeto modificado
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model( 'Image', ImageSchema )