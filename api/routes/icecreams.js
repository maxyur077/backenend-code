const express = require('express');
const icecream = require('../models/icecreammodel.')
const router = express.Router();
const app = express()
const mongoose = require('mongoose')



app.use(express.json())


router.get('/', (req, res, next) =>
    icecream.find().then(result => {

        res.status(200).json({
            icecreamData: result
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

)

router.get('/:id', (req, res, next) =>
    icecream.findById(req.params.id).then(result => {

        res.status(200).json({
            icecreamData: result
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

)
router.delete('/:id', (req, res, next) =>
    icecream.deleteOne({_id:req.params.id}).then(result => {

        res.status(200).json({
            IcecreamData: "icecream Deleted"
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

    icecream.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true })
        .then(updatedIcecream => {
            if (!updatedIcecream) {
                return res.status(404).json({ error: 'Icecream not found' });
            }

            res.status(200).json({
                IcecreamData: "Icecream Updated"
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});




router.post('/', (req, res, next) => {
    const Icecream = new icecream({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        Price: req.body.price,
        company: req.body.company,
        ManfactureDate: req.body.manfacture

    })


    Icecream.save().then(result => {
        console.log(result)
        res.status(200).json({
            newChocolate: result
        })
    })


}
)








module.exports = router