const BraceletController = require('../controllers/BraceletController');
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
const upload = require('../controllers/uploads')
module.exports = app => {
    app.get('/api/bracelets/', BraceletController.findAllBracelets);
    app.get('/api/bracelets/:id', BraceletController.findOneBracelet);
    app.post('/api/bracelets/', 
        upload.single('file'), BraceletController.createBracelet
        );
    app.delete('/api/bracelets/delete/:id', BraceletController.deleteBracelet);
    app.patch('/api/bracelets/:id', BraceletController.updateBracelet);
    // app.post('/api/testupload', upload.single('file'),(req, res, err) => {
    //     console.log(req.file)
    //     if (err) {
    //         // console.log(err)
    //         return res.status(500).json(err)
    //     }
    // })
}