
const { response } = require("express");
const Image = require("../models/ImageModel");


const storeImage = async( req, res = response ) => {

    const { idRoom } = req.body
    Promise.all(
        req.files.map(async (file) => {
          const newImage = new Image({
            name: file.originalname,
            idRoom: idRoom,
            image: {
                data: file.filename,
                contentType: file.mimetype
            }
          });
    
          return await newImage.save();
        })
      )
        .then(res.status(201).json({
            ok: true,
            message: 'La foto subió exitosamente'
        }))
        .catch((e) => {
            console.log(e)
          res
            .status(500)
            .json({
                ok: false,
                message: 'Se ha presentado un error en el servidor'
            });
        });

}

const imagesByRoom = async( req, res = response ) => {

    const idRoom  = req.params.idRoom
    try {

        const imagesById = await Image.find({ idRoom })

        res.status(200).json({
          ok: true,
          images: imagesById
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
    storeImage,
    imagesByRoom
}