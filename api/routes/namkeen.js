const express =require('express');
const namkeen=require('../models/namkeenmodel')
const router=express.Router();
const app=express()
const mongoose = require('mongoose')

app.use(express.json())

router.get('/', (req, res, next) =>
    namkeen.find().then(result => {

        res.status(200).json({
            NamkeenData: result
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

)

router.get('/:id', (req, res, next) =>
    namkeen.findById(req.params.id).then(result => {

        res.status(200).json({
            namkeenData: result
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

)

router.delete('/:id', (req, res, next) =>
    namkeen.deleteOne({_id:req.params.id}).then(result => {

        res.status(200).json({
            namkeenData: "Namkeen Deleted"
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

    namkeen.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true })
        .then(updatedNamkeen => {
            if (!updatedNamkeen) {
                return res.status(404).json({ error: 'Namkeen not found' });
            }

            res.status(200).json({
                chocolateData: "Namkeen Updated"
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});


 


router.post('/', (req, res, next) => {
    const Namkeen = new namkeen({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        Price: req.body.price,
        company: req.body.company,
        ManfactureDate: req.body.manfacture

    })


    Namkeen.save().then(result => {
        console.log(result)
        res.status(200).json({
            newChocolate: result
        })
    })


}
)


module.exports=router