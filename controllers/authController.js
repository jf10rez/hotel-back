const { response } = require('express')
const bcrypt = require('bcryptjs');

const userModel = require('../models/userModel')
const { generateJWT } = require("../helpers/jwt");

const loginUser = async( req, res = response ) => {

    try {
        
        const { username, password } = req.body

        let user = await userModel.findOne({username})

        if( !user ){
            return res.status(400).json({
                ok: false,
                message: `El username ingresado no existe`
            })
        }

        const validPassword = bcrypt.compareSync( password, user.password )

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                message: 'La contraseña no es correcta'
            })
        }

        const token = await generateJWT( user.id, user.username )

        res.status(200).json({
            ok: true,
            uid: user.id,
            username: user.username,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error en login'
        })
    }


}

module.exports = {
    loginUser
}