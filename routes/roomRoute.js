const { Router } = require("express");
const router= Router()
const { check } = require('express-validator')


const { createRoom, updateRoom, getRooms, deleteRoom } = require("../controllers/roomController")

//Middlewares;
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateObjectId } = require("../middlewares/validate-objectId");

router.use( validateJWT )

router.get( '/', getRooms )

router.post(
    '/',
    [
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('price', 'El price es obligatorio').isNumeric(),
        check('ocupationMax','La ocuppationMax es obligatorio').isNumeric(),
        validateFields
    ],
    createRoom
)

router.put( 
    '/:idRoom',
    [
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('price', 'El price es obligatorio').isNumeric(),
        check('ocupationMax','La ocuppationMax es obligatorio').isNumeric(),
        validateFields,
        validateObjectId,
    ],
    updateRoom
)

router.delete( '/:idRoom', validateObjectId, deleteRoom )

module.exports = router