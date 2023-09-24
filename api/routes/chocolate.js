const express = require('express');
const chocolate = require('../models/chocolatemodel')
const mongoose = require('mongoose')
const router = express.Router();
const app = express()

router.get('/', (req, res, next) =>
    chocolate.find().then(result => {

        res.status(200).json({
            chocolateData: result
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

)


router.get('/:id', (req, res, next) =>
    chocolate.findById(req.params.id).then(result => {

        res.status(200).json({
            chocolateData: result
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

)

app.use(express.json())
router.post('/', (req, res, next) => {
    const Chocolate = new chocolate({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        Price: req.body.price,
        company: req.body.company,
        ManfactureDate: req.body.manfacture

    })


    Chocolate.save().then(result => {
        console.log(result)
        res.status(200).json({
            newChocolate: result
        })
    })


}
)

router.delete('/:id', (req, res, next) =>
    chocolate.deleteOne({ _id: req.params.id }).then(result => {

        res.status(200).json({
            chocolateData: "Choclate Deleted"
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

    chocolate.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true })
        .then(updatedChocolate => {
            if (!updatedChocolate) {
                return res.status(404).json({ error: 'Chocolate not found' });
            }

            res.status(200).json({
                chocolateData: "Chocolate Updated"
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});


module.exports = router