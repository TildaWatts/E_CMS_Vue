var express = require('express');
var router = express.Router();     
var dataCtrl = require('../controller/news_contr');

router.post('/data',dataCtrl.create);
router.post('/list',dataCtrl.list);
router.get('/data/:id',dataCtrl.getData);
router.put('/data/:id', dataCtrl.update);
router.delete('/data/:id', dataCtrl.remove);
router.post('/removes', dataCtrl.removes);

module.exports = router;
