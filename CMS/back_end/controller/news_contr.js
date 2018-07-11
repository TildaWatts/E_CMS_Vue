var mongoose = require('mongoose');
const News = require('../model/news_model');

exports.create = function(req,res,next){
    const news = new News(req.body);//post 数据在请求体中
    console.log(req.body);
    news.save().then(data => {//发送保存请求
        res.json(data);
    });
};

exports.update = function(req, res, next) {
    var id = req.params.id;
    News.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(data => {
        res.json(data);
    });
};

exports.remove = function(req,res,next){
    var id = req.params.id;
    News.findByIdAndRemove(id,function (err,data) {
        res.json({message: '删除成功', status: 200});
    });
};

exports.list = function(req,res,next){

    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 5;
    var nid = req.body.nid;

    var queryCondition = {};
    console.log(req.body);
        if(req.body.nid && req.body.nid.trim().length > 0){
            nid = req.body.nid;
            
            queryCondition = {
                nid : nid
            };
        };

        if(req.body.n_title){
            n_title = req.body.n_title;
            queryCondition =  {
                n_title:new RegExp(n_title,'i')
            }
        }

        News.paginate(queryCondition, { page: page, limit: +rows }, function(
        err,
        result
      ) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
      });

};

exports.removes = function(req, res, next) {
    var ids = req.body.ids;
    ids = ids.split(',');
    if (ids.length > 0) {
        News.remove({ _id: { $in: ids } }).then(data => {
        res.json({ message: '删除多条记录成功', status: 200 });
        });
    }
};

exports.getData = function(req, res, next) {
    var id = req.params.id;
  
    News.findById(id, function(err, data) {
      res.json(data);
    });
  };
  