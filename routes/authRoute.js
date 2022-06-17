// Routes of users

// Host + /api/auth

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { loginUser, revalidateToken } = require('../controllers/authController')

//Middlewares
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')


router.post( 
    '/',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria obligatoria').not().isEmpty(),
        validateFields
    ], 
    loginUser 
)

router.get('/renew', validateJWT , revalidateToken)

module.exports = router