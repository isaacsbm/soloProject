const Bracelet = require('../models/Bracelet');
const fs = require('fs');

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
        if(!req.file){
            // console.log("unsucessful file upload")
            return res.status(400).json({msg: 'No image uploaded'})
        }
        // if(error) {
        //     return res.status(400).json(error)  
        //   }
        Bracelet.create({
            name: req.body.name, 
            description: req.body.description,
            era: req.body.era,
            image: req.file.path
        })
            .then(newBracelet => {
                console.log("Bracelet created and file uploaded!")
                res.json(newBracelet)})
            .catch(err =>{
                res.status(400).json(err)
            })
    },
    updateBracelet: (req, res) => {
        const newImage = req.file;
        console.log('REQ:', req)
        console.log('newImage: ', req.file)
        Bracelet.findById(req.params.id)
            .then(bracelet => {
                if (!bracelet) {
                    return res.status(404).json({ error: 'Bracelet not found' });
                }

                if (newImage) {
                    // Check if an old image exists and delete it
                    if (bracelet.image) {
                        try {
                            fs.unlinkSync(bracelet.image);
                        } catch (error) {
                            console.log('Error deleting old image file: ', error);
                        }
                    }
                    // UPDATE PATH OF OLD IMAGE WITH NEW IMAGE
                    bracelet.image = newImage.path;
                }

                //UPDATE FORM INPUTS
                bracelet.name = req.body.name;
                bracelet.description = req.body.description;
                bracelet.era = req.body.era;

                bracelet.save()
                    .then(updatedBracelet => {
                        console.log('Bracelet was updated!');
                        res.json(updatedBracelet);
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));

    },
    deleteBracelet: (req, res) => {
        Bracelet.findById(req.params.id)
            .then(bracelet => {
                if(!bracelet) {
                    return res.status(404).json({error: 'Bracelet not found!'})
                }

                if(bracelet.image){
                    try {
                        fs.unlinkSync(bracelet.image);
                    } catch(error){
                        console.log('Error deleteing image file: ', error);
                    }
                }
        Bracelet.findByIdAndDelete(req.params.id)
            .then(()=> {
                res.json({deleted: true});
            })
            .catch(err => res.status(400).json(err));
            })
        .catch(err => res.status(400).json(err));
    }
};