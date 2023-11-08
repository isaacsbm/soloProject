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
    app.delete('/api/bracelets/:id', BraceletController.deleteBracelet);
    app.patch('/api/bracelets/:id', upload.single('image'), BraceletController.updateBracelet);
}