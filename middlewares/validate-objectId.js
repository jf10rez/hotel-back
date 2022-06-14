const { response } = require('express');
const {ObjectId} = require('mongodb');

const validateObjectId = ( req, res = response, next ) => {

    if( !ObjectId.isValid(req.params.idRoom) )
    return res.status(400).json({
        ok: false,
        errors: 'El id ingresado no es valido'
    })

    next()
}

module.exports = { validateObjectId }