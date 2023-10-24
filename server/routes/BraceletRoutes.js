const BraceletController = require('../controllers/BraceletController');

module.exports = app => {
    app.get('/api/bracelets', BraceletController.findAllBracelets);
    app.get('/api/bracelets/:id', BraceletController.findOneBracelet);
    app.post('/api/bracelets', BraceletController.createBracelet);
    app.delete('/api/bracelets/:id', BraceletController.deleteBracelet);
    app.patch('/api/bracelets/:id', BraceletController.updateBracelet);
};