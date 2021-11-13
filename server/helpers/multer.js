const multer = require("multer");
const path = require('path');

const multerService = (pathFiles) =>{
    const storage = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, path.join(__dirname, pathFiles));
        },
        filename: (req, file, cb) => {
            let unique = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname+'-'+unique+'.'+file.mimetype.split('/')[1]);
        }
    });
    return storage;
}


module.exports ={ multerService}