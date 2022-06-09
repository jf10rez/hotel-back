// Route of reserves
//Host + api/reserve

const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { getReserves, createReserve } = require('../controllers/reserveController')
const { validateJWT } = require('../middlewares/validate-jwt')

// Host + api/reserve/
router.get( '/', validateJWT , getReserves )

// router.post( 
//     '/create',
//     [
//         check('')
//     ]
//     ,
//     createReserve )


module.exports = router