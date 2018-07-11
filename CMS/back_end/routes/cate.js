var express = require('express');
var router = express.Router();
var dataCtrl = require('../controller/cate_contr');

router.post('/data',dataCtrl.create);
router.put('/data/:id',dataCtrl.update);
router.get('/list/:type',dataCtrl.list);
router.delete('/data/:id',dataCtrl.remove);

module.exports = router;