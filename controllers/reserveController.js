const { response } = require('express')
const Reserve = require('../models/ReserveModel')


const getReserves = async( req, res = response ) => {

    try {
        
        const reserves = await Reserve.find( {user: req.uid} )
                                        .populate('username')

        res.status(200).json({
            ok: true,
            reserves
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error con el servidor'
        })
    }
}

const createReserve = async( req, res = response ) => {

    const reserves = new Reserve( req.body )

    try {
        
        reserves.user = req.uid

        const reserveSave = await reserves.save()

        res.status(200).json({
            ok: true,
            reserve: reserveSave
        })

    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error con el servidor'
        })
    }

}

module.exports = {
    getReserves,
    createReserve
}