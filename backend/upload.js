const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'downloads/');
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss SSS');
        const name = `${date}-${file.originalname}`.replaceAll(' ', '');
        cb(null, name);
    }
});

module.exports = multer({
    storage: storage
});