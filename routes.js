'use strict';

const router = require('express').Router();

const getPoint = require('./src/api/getPoint');

router.use('/asdf', async (req,res,next) => {
    res.send(await getPoint([-110,41], 'w', [0,1000000]));
});

module.exports = exports = router;