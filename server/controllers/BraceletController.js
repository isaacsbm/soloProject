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
        const newImage = req.file; // Extract the new image file from the request
    
        Bracelet.findById(req.params.id)
            .then(bracelet => {
                if (!bracelet) {
                    return res.status(404).json({ error: 'Bracelet not found' });
                }
    
                // If a new image is provided, update the image path
                if (newImage) {
                    // Check if an old image exists and delete it
                    if (bracelet.image) {
                        try {
                            fs.unlinkSync(bracelet.image);
                        } catch (error) {
                            console.log('Error deleting old image file: ', error);
                        }
                    }

                    // Update the image path with the path of the new image
                    bracelet.image = newImage.path;
                    console.log(newImage)
                }
    
                // Define the update object for `findByIdAndUpdate`
                const updateObject = {
                    name: req.body.name,
                    description: req.body.description,
                    era: req.body.era,
                    // Add image update if necessary
                    // image: newImage ? newImage.path : undefined,
                };
    
                // Use findByIdAndUpdate to update the bracelet
                Bracelet.findByIdAndUpdate(req.params.id, updateObject, { new: true })
                    .then(updatedBracelet => {
                        if (!updatedBracelet) {
                            return res.status(404).json({ error: 'Bracelet not found' });
                        }
                        consloe.log(updatedBracelet)
                        console.log('Bracelet was updated!');
                        res.json(updatedBracelet);
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },
    
    deleteBracelet: (req, res) => {
            Bracelet.findByIdAndDelete (req.params.id)
                .then(bracelet => {
                    console.log(typeof bracelet.image)
                    if(bracelet.image)
                        //!Incomplete path, call and make sure it is relative to the file position
                    { try{
                            fs.unlinkSync(bracelet.image)
                        }
                        catch (error){
                        console.log('Error deleting image file: ', error);
                    }
                    
                    return res.json({deleted: true})
                }})
                .catch(err => res.status(400).json(err));
    }
};