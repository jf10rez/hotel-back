
const { response } = require("express");
const Image = require("../models/ImageModel");


// const storeImage = async( req, res = response ) => {

//     const { idRoom } = req.body
//     Promise.all(
//         req.files.map(async (file) => {
//           const newImage = new Image({
//             name: file.originalname,
//             room: idRoom,
//             image: {
//                 data: file.filename,
//                 contentType: file.mimetype
//             }
//           });
    
//           return await newImage.save();
//         })
//       )
//         .then(res.status(201).json({
//             ok: true,
//             message: 'La foto subió exitosamente'
//         }))
//         .catch((e) => {
//             console.log(e)
//           res
//             .status(500)
//             .json({
//                 ok: false,
//                 message: 'Se ha presentado un error en el servidor'
//             });
//         });

// }

const imagesByRoom = async( req, res = response ) => {

    const idRoom  = req.params.idRoom
    try {

        const imagesById = await Image.find({ room: idRoom })

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

const uploadImageToCloud = async( req, res = response ) => {

  const { idRoom } = req.body
  
  try {
    
    const newImage = new Image({
      name: req.file.originalname,
      path: req.file.path,
      room: idRoom
    })

    const imageSave = await newImage.save();
     
    res.status(201).json({
      ok: true,
      image: imageSave
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
    imagesByRoom,
    deleteImage,
    uploadImageToCloud
}