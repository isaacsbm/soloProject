const Bracelet = require('../models/Bracelet');

module.exports = {
    findAllBracelets: (req, res) => {
        Bracelet.find()
        .then(allBracelets => {
            console.log("All bracelets grabbed!")
            res.json(allBracelets)})
        .catch(err => res.status(400).json(err))
    },
    findOneBracelet: (req, res) => {
        Bracelet.findById(req.params.id)
            .then(oneBracelet => {
                console.log("Bracelet grabbed!")
                res.json(oneBracelet)})
            .catch(err => res.status(400).json(err))
    },
    createBracelet: (req, res) => {
        Bracelet.create(req.body)
            .then(newBracelet => {
                console.log("Bracelet created!")
                res.json(newBracelet)})
            .catch(err => res.status(400).json(err))
    },
    updateBracelet: (req, res) => {
        Bracelet.findByIdAndUpdate({_id: req.params.id})
            .then(updatedBracelet => {
                console.log("Bracelet was updated!")
                res.json(updatedBracelet)})
            .catch(err => res.status(400).json(err))
    },
    deleteBracelet: (req, res) => {
        Bracelet.findByIdAndDelete({_id: req.params.id})
            .then(deletedBracelet =>{
                console.log("Bracelet was deleted")
                res.json(deletedBracelet)
            })
            .catch(err => res.status(400).json(err))
    }
};