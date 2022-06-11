const { Schema, model } = require("mongoose");


const RoomSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ocupationMax: {
        type: Date,
        required: true
    }
})

RoomSchema.method('toJSON', function(){//Para devolver la info en el controlador con el objeto modificado
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Room', RoomSchema)