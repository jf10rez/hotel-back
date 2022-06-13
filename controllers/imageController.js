
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

const deleteImage = async( req, res = response ) => {

    try {

        const { id } = req.params

        const imageDelete = await Image.findByIdAndDelete( id )

        res.status(200).json({
          ok: true,
          imageDelete
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
          ok: false,
          message: 'Se produjo un error en el servidor'
        })
    }

}

// const updateImage = async( req, res = response ) => {

//     const { id, idRoom } = req.body
//     try {

//       if( id ){// Update image
//         const imageById = await Image.findById( id )

//         if( !imageById ){
//           res.status(400).json({
//             ok: false,
//             message: 'El id de la imagen no existe'
//           })
//           return
//         }

//         if( !req.file ){
//           res.status(400).json({
//             ok: false,
//             message: 'No se envió ninguna imagen'
//           })
//         }
        
//         const updateImage = {
//             name: req.file.originalname,
//             idRoom,
//             image: {
//               data: req.file.filename,
//               contentType: req.file.mimetype
//             }
//         }

//         const imageUpdated = await Image.findByIdAndUpdate( id, updateImage, { new: true } )

//         res.status(200).json({
//           ok: true,
//           imageUpdated
//         })
//         return
//       }else{ // Add new image for this room

//           console.log( idRoom )
//           res.status(200).json({
//             ok: true,
//             message: 'Se actualizaron las imagenes correctamente.'
//           })
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//           ok: false,
//           message: 'Se produjo un error con el servidor'
//         })
//     }

// }

module.exports = {
    storeImage,
    imagesByRoom,
    deleteImage
}