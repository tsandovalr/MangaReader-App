const mp = require("multiparty");
const fs = require("fs");
const fse = require("fs-extra");
const multer = require("multer");

const uploadFiles = (req, res) =>{
    let form = new mp.Form();
    form.parse(req, (err, fields, file) => {
        if (err){
            res.status(503).send(err);
        }
        else{
            let {email} = fields;
            let {files} = file;
            setFiles(files[0], email[0]).then(response =>{
                if(response.verify){
                    res.status(200).json({verify: true, title: 'Success', content: response.content});
                }else{
                    res.status(503).json({verify: false, title: 'Error'});
                }
            }); 
        }
    })
}

const setFiles = async (file, email) => {
    let type = file.originalFilename.split(".")[1];
    let filePath = `media/`+email;
    let absolutePath = filePath + `/${file.originalFilename.split("  ")[0].split(".")[0]}.` + type ;
    const storage = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, filePath);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalFilename);
        }
    })
    try{
        if (fs.existsSync(filePath)){
            //await fse.emptyDir(filePath);
            multer(storage);
        }
        else{
            fs.mkdirSync(filePath, {recursive: true});
        }
        let content = fs.readFileSync(file.path);
        fs.writeFileSync(absolutePath, content);
        fs.unlinkSync(file.path);
        return {verify: true, title:"Success", content:absolutePath};
    }catch(e){
        console.log(e);
        return {verify: false, title:"Error", content:e.message};
    }
}

const getFiles = (req, res) =>{
    res.send('Estas en el metodo files');
}

const deleteFile = (req, res) =>{
    res.send('Estas en el metodo deleteFiles');
}

module.exports ={
    uploadFiles,
    getFiles,
    deleteFile
}