const { Schema, model } = require("mongoose");


const ReserveSchema = Schema({
    nameClient: {
        type: String,
        required: true
    },
    emailClient: {
        type: String,
        required: true
    },
    celPhone: {
        type: Number,
        required: true
    },
    dateInitial: {
        type: String,
        required: true
    },
    dateFinal: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    }
})

ReserveSchema.method('toJSON', function(){//Para devolver la info en el controlador con el objeto modificado
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Reserve', ReserveSchema)