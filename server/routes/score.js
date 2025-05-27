const express = require('express');
const router = express.Router();


router.use('/',(req,res)=>{
    res.send('hello, scoreRouter');
})

router.get('/:date', (req,res)=>{
    const date= req.params.date;
})

router.get('/all', (req,res)=>{
})

router.post('/', (req,res)=>{
    const date= req.body.date;
})


module.exports=router;