
const Image = require("../models/ImageModel");


const storeImage = async( req, res = response ) => {

    const { idRoom } = req.body
    Promise.all(
        req.files.map(async (file) => {
            console.log(file)
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

// const storeImage = async( req, res = response ) => {

//     if (!req.files 
//         || Object.keys(req.files).length === 0
//         || !req.files.image
//         ) {
//         res.status(400).json({
//             ok: false,
//             message: 'Debe seleccionar un archivo'
//         });
//         return;
//     }

//     // console.log(req.files.image); return
//     const { image } = req.files;

//     // console.log(image); return

//     const uploadPath =  path.join( __dirname, '../uploads/', image.name );

//     // console.log( uploadPath ); return

//     image.mv(uploadPath, async(err) => {
//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 message: 'Se produjo un error en el servidor'
//             });
//         }

//         const { idRoom, name } = req.body

//         // const roomExist = await Image.find({ idRoom })
        
//         // if( !roomExist ){
//         //     return res.status(400).json({
//         //         ok: false,
//         //         message: 'No se encontró la habitación'
//         //     })
//         // }

//         const image = new Image({
//             name,
//             idRoom,
//             image: {
//                 data: req.files.image.data,
//                 contentType: uploadPath
//             }
//         })

//         const imageSave = await image.save()

//         res.status(200).json({
//             ok: true,
//             message: 'La imagén se guardó correctamente',
//             imageSave
//         })
//     });
// }

module.exports = {
    storeImage
}