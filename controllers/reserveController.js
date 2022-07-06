const { response } = require('express')
const dayjs = require("dayjs")

const Reserve = require('../models/ReserveModel')
const { getDatesInRange } = require('../helpers/datesInRange')
const { simplifyArray } = require('../helpers/simplifyArray')


const getReserves = async( req, res = response ) => {

    try {
        
        const reserves = await Reserve.find( {user: req.uid} )
                                        .populate('room')

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

    const { room, dateInitial, dateFinal } = req.body

    try {

        const dateInitialFormat = dayjs(dateInitial).format('YYYY/MM/DD')
        const dateFinalFormat = dayjs(dateFinal).format('YYYY/MM/DD')

        const differenceDates = dayjs(dateInitial).diff(dayjs(dateFinal))

        if( differenceDates >= 0 ){
            return res.status(400).json({
                ok: false,
                message: 'La fecha final no puede ser menor o igual a la inicial'
            })
        }

        //exist reserve in this room?
        const existReserve = await Reserve.find( { room, dateInitial: dateInitialFormat } )

        if( existReserve.length > 0 ){
            res.status(412).json({
                ok: false,
                message: 'La habitación ya está reservada para esta fecha'
            })
            return
        }

        //establish format for dates
        req.body.dateInitial = dateInitialFormat
        req.body.dateFinal = dateFinalFormat

        const reserves = new Reserve( req.body )

        const reserveSave = await reserves.save()
        
        const roomReserve = await Reserve.findById( reserveSave.id )
                                            .populate('room')

        res.status(200).json({
            ok: true,
            reserve: roomReserve
        })

    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error con el servidor'
        })
    }

}

const updateReserve = async( req, res = response ) => {

    const { room, dateInitial } = req.body
    const id = req.params.id

    try {

        //exist reserve in this room?
        const existReserve = await Reserve.find( { room, dateInitial } )

        if( existReserve.length > 0 ){
            res.status(412).json({
                ok: false,
                message: 'La habitación ya está reservada para esta fecha'
            })
            return
        }

        const reserve = await Reserve.findById( id )

        if( !reserve ){
            res.status(404).json({
                ok: false,
                message: 'No se encontró la reserva'
            })
            return;
        }

        if( reserve.user.toString() !== req.uid ){
            res.status(401).json({
                ok: false,
                message: 'El usuario no puede modificar esta habitación'
            })
        }

        const updateReserve = {
            ...req.body,
            user: req.uid
        }

        const reserveUpdated = await Reserve.findByIdAndUpdate( id, updateReserve, { new: true } )

        res.status(200).json({
            ok: true,
            reserve: reserveUpdated
        })

    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error con el servidor'
        })
    }

}

const deleteReserve = async( req, res = response ) => {

    const id = req.params.id

    try {

        const reserve = await Reserve.findById( id )

        if( !reserve ){
            res.status(404).json({
                ok: false,
                message: 'No se encontró la reserva'
            })
            return;
        }

        if( reserve.user.toString() !== req.uid ){
            res.status(401).json({
                ok: false,
                message: 'El usuario no puede modificar esta habitación'
            })
        }

        await Reserve.findByIdAndDelete( id )

        res.status(200).json({
            ok: true,
            message: 'Se eliminó la reserva con éxito',
            id
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error con el servidor'
        })
    }

}

const getDatesUnavailable = async( req, res = response ) => {

    const { id } = req.params

    try {
        
        const reserve = await Reserve.find({room: id})

        if( reserve.length <= 0 ){
            return res.status(200).json({
                ok: true,
                dates: [],
                message: 'No existen reservas para esa habitación'
            })
        }

        const searchDates = new Promise( (resolve) => {
            const dates = reserve.map( dates => {
                return getDatesInRange( dates.dateInitial, dates.dateFinal )
            } )
            resolve(dates)
        } )

        Promise.all([searchDates]).then( data => {

            const dates = simplifyArray(data[0])

            res.status(200).json({
                ok: true,
                dates
            })
        } ).catch( error =>{
            console.log(error)
            res.status(500).json({
                ok: false,
                message: 'Se produjo un error con el servidor'
            })
        } )


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error con el servidor'
        })
    }

}

module.exports = {
    getReserves,
    createReserve,
    updateReserve,
    deleteReserve,
    getDatesUnavailable
}