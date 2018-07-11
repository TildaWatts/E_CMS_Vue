var mongoose = require('mongoose');
const User = require('../model/user_model');

exports.create = function(req,res,next){
    const user = new User(req.body);//post 数据在请求体中

    user.save().then(data => {//发送保存请求
        res.json(data);
    });
};

exports.update = function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(data => {
        res.json(data);
    });
};

exports.remove = function(req,res,next){
    var id = req.params.id;
    User.findByIdAndRemove(id,function (err,data) {
        res.json({message: '删除成功', status: 200});
    });
};

exports.list = function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 5;
    var queryCondition = {};

    if(req.body.username && req.body.username.trim().length > 0){

        name = req.body.username;

        queryCondition = {
            username : new RegExp(name , 'i')
        };
    }
        User.paginate(queryCondition,{page : page, limit : +rows},function(err,result){
            // result.rows = resulet.docs;
            // delete result.docs;
            res.json(result);
        });
};

exports.removes = function(req, res, next) {
    var ids = req.body.ids;
    ids = ids.split(',');
    if (ids.length > 0) {
        User.remove({ _id: { $in: ids } }).then(data => {
        res.json({ message: '删除多条记录成功', status: 200 });
        });
    }
};

exports.getData = function(req, res, next) {
    var id = req.params.id;
  
    User.findById(id, function(err, data) {
      res.json(data);
    });
  };
  