const { response } = require("express");

const Room = require('../models/RoomModel')

const createRoom = async( req, res = response ) => {

    const room = new Room( req.body )

    try {
        
        room.user = req.uid

        const roomSave = await room.save()

        res.status(201).json({
            ok: true,
            room: roomSave
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            message: 'Se produjo un error en el servidor'
        })
    }

}

const updateRoom = async( req, res = response ) => {

    const idRoom = req.params.idRoom

    try {
        
        const room = await Room.findById( idRoom )

        if( !room ){
            res.status(404).json({
                ok: false,
                message: 'No se encontró la habitación'
            })
            return;
        }

        if( room.user.toString() !== req.uid ){
            res.status(401).json({
                ok: false,
                message: 'El usuario no puede modificar esta habitación'
            })
        }

        const newRoom = {
            ...req.body,
            user: req.uid
        }

        const roomUpdated = await Room.findByIdAndUpdate( idRoom, newRoom, { new: true } )

        res.status(200).json({
            ok: true,
            room: roomUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error con el servidor'
        })
    }

}

const getRooms = async( req, res = response ) => {

    try {
        
        const rooms = await Room.find({ user: req.uid })

        res.status(200).json({
            ok: true,
            rooms
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error en el servidor'
        })
    }

}

const deleteRoom = async( req, res = response ) => {

    const idRoom = req.params.idRoom

    try {
        
        const room = await Room.findById( idRoom )

        if( !room ){
            res.status(404).json({
                ok: false,
                message: 'No se encontró la habitación'
            })
            return;
        }

        if( room.user.toString() !== req.uid ){
            res.status(401).json({
                ok: false,
                message: 'El usuario no puede eliminar esta habitación'
            })
        }

        await Room.findByIdAndDelete( idRoom )

        res.status(200).json({
            ok: true,
            message: 'Se eliminó la habitación con éxito',
            room: idRoom
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error con el servidor'
        })
    }

}

module.exports = {
    createRoom,
    updateRoom,
    getRooms,
    deleteRoom
}