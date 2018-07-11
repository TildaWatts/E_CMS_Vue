const mongoose = require('mongoose');
const Cate = require('../model/cate__model');

exports.create = function(req,res,next){
    const cate = new Cate(req.body);
    cate.save().then(data => {
        res.json(data);
    });
};

exports.update = function(req,res,next){
    var id = req.params.id;
    Cate.findByIdAndUpdate(id,{$set : req.body},{new : false}).then(data=>{
        res.json(data);
    });
};

exports.list = function(req,res,next){

    var type = req.params.type || 1;
    Cate.find({type : type},function(err,data){
        var rpTree = reverseTree(data,null);
        res.json(rpTree);
    })

};

exports.remove = function(req,res,next){
    var id = req.params.id;
    var ids = [];
    // Cate.findByIdAndRemove(id,function (err,data) {
    //     res.json({message: '删除成功', status: 200});
    // });
    Cate.findOne({_id : id},function(err,doc){
        if(doc){
            ids = [doc._id];
            doc.getChildren().then(function(docs){
                for (let i = 0; i < docs[i].length; i++) {
                    ids.push(docs[i]._id);
                }

                Cate.remove({_id: {$in:ids}}).then(data => {
                    
                    res.json({message: '删除多条记录成功',status:200});
                });
            });
        }
    });
};


function reverseTree(data,pid) {
    var resultArr = [];
    var temp;

    var data = JSON.parse(JSON.stringify(data));

    for(var i in data){

        if(data[i].parentId === pid){

            data[i].title = data[i].text;
            resultArr.push(data[i]);

            temp = reverseTree(data,data[i]._id);
            if(temp.length > 0 ){
                data[i].children = temp;
            }
        }
    }
    return resultArr;
  }