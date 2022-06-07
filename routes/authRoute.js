// Routes of users

// Host + /api/auth

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

//Middlewares
const { validateFields } = require('../middlewares/validate-fields')

const { loginUser } = require('../controllers/authController')

router.post( 
    '/',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria obligatoria').not().isEmpty(),
        validateFields
    ], 
    loginUser )

module.exports = router