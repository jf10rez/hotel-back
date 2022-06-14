// Route of reserves
//Host + api/reserve

const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { 
    getReserves, 
    createReserve, 
    updateReserve, 
    deleteReserve 
} = require('../controllers/reserveController')

//Middlewares
const { isDate } = require('../helpers/isDate')
const { isObjectId } = require('../helpers/isObjectId')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const { validateObjectId } = require('../middlewares/validate-objectId')

// Host + api/reserve/
router.get( '/', validateJWT , getReserves )

router.post( 
    '/create',
    [
        check('nameClient', 'El nameClient es obligatorio').not().isEmpty(),
        check('emailClient', 'El emailClient es obligatorio').isEmail(),
        check('celPhone', 'El celPhone es obligatorio').isNumeric(),
        check('dateInitial', 'El dateInitial es obligatorio').custom( isDate ),
        check('dateFinal', 'El dateFinal es obligatorio').custom( isDate ),
        check('user', 'El user no es valido').custom( isObjectId ),
        check('room', 'El room no es valido').custom( isObjectId ),
        validateFields
    ]
    ,
    createReserve )

router.put( 
    '/:id',
    [
        check('nameClient', 'El nameClient es obligatorio').not().isEmpty(),
        check('emailClient', 'El emailClient es obligatorio').isEmail(),
        check('celPhone', 'El celPhone es obligatorio').isNumeric(),
        check('dateInitial', 'El dateInitial es obligatorio').custom( isDate ),
        check('dateFinal', 'El dateFinal es obligatorio').custom( isDate ),
        check('user', 'El user no es valido').custom( isObjectId ),
        check('room', 'El room no es valido').custom( isObjectId ),
        validateFields,
        validateJWT,
        validateObjectId
    ],
    updateReserve
    )

    router.delete( '/:id', [validateJWT, validateObjectId], deleteReserve )

module.exports = router