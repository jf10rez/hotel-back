const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require('cors')
const cloudinary = require('cloudinary').v2
// const fileUpload = require('express-fileupload')

require ('dotenv').config();

//Crear el servidor de express
const app = express()

//Instancia de base de datos
dbConnection()

//Cors
app.use(cors())

//Directorio público
app.use( express.static('public') )

//Lectura y parseo del body con formato raw
app.use( express.json() )

//Carga de archivos
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));

//Configuration cloudinary for images
cloudinary.config({ 
    cloud_name: 'dmoxyzhdf', 
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: process.env.API_SECRET_CLOUDINARY
  });

//Rutas
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/reserve', require('./routes/reserveRoute'))
app.use('/api/image', require('./routes/imageRoutes'))
app.use('/api/room', require('./routes/roomRoute'))

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Server run in port ${ process.env.PORT }`);
});

