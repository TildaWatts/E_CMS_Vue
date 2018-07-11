var mongoose = require('mongoose');
const Comt = require('../model/comt_model');

exports.create = function(req,res,next){
    const comt = new Comt(req.body);//post 数据在请求体中

    comt.save().then(data => {//发送保存请求
        res.json(data);
    });
};

exports.update = function(req, res, next) {
    var id = req.params.id;
    Comt.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(data => {
        res.json(data);
    });
};

exports.remove = function(req,res,next){
    var id = req.params.id;
    Comt.findByIdAndRemove(id,function (err,data) {
        res.json({message: '删除成功', status: 200});
    });
};

exports.list = function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 5;
    var newsid = req.body.newsid;

    var queryCondition = {};
        if(req.body.newsid && req.body.newsid.trim().length > 0){
            newsid = req.body.newsid;

            queryCondition = {
                newsid : newsid
            };
        };

        if(req.body.comdetail){
            comdetail = req.body.comdetail;
            queryCondition =  {
                comdetail:new RegExp(comdetail,'i')
            }
        }
        Comt.paginate(queryCondition,{page : page, limit : +rows},function(err,result){

            res.json(result);
        });
};

exports.removes = function(req, res, next) {
    var ids = req.body.ids;
    ids = ids.split(',');
    if (ids.length > 0) {
        Comt.remove({ _id: { $in: ids } }).then(data => {
        res.json({ message: '删除多条记录成功', status: 200 });
        });
    }
};

exports.getData = function(req, res, next) {
    var id = req.params.id;
  
    Comt.findById(id, function(err, data) {
      res.json(data);
    });
  };
  