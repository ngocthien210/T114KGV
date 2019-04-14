const express = require('express');
const router = express.Router();

router.get('/test',function(req,res){
    res.json({
        msg:"Posts works"
    });
});

module.exports = router;