 const express =require('express');
const sweets=require('../models/sweetsmodel')
const router=express.Router();
const app=express() 
const mongoose = require('mongoose')

router.get('/', (req, res, next) =>
    sweets.find().then(result => {

        res.status(200).json({
            sweetsData: result
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

)

router.get('/:id', (req, res, next) =>
    sweets.findById(req.params.id).then(result => {

        res.status(200).json({
            SweetsData: result
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

)

router.delete('/:id', (req, res, next) =>
    sweets.deleteOne({_id:req.params.id}).then(result => {

        res.status(200).json({
            sweetsData: "Choclate Deleted"
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

)

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateData = {
        name: req.body.name,
        Price: req.body.price,
        company: req.body.company,
        ManfactureDate: req.body.manfacture
    };

    sweets.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true })
        .then(updatedsweets => {
            if (!updatedsweets) {
                return res.status(404).json({ error: 'sweets not found' });
            }

            res.status(200).json({
                chocolateData: "sweets Updated"
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

 




 
app.use(express.json())
router.post('/', (req, res, next) => {
    const Sweets = new sweets({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        Price: req.body.price,
        company: req.body.company,
        ManfactureDate: req.body.manfacture

    })


    Sweets.save().then(result => {
        console.log(result)
        res.status(200).json({
            newChocolate: result
        })
    })


}
)


module.exports=router