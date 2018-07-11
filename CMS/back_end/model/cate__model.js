var mongoose = require('mongoose');
materializedPlugin = require('mongoose-materialized');

var CateSchema = new mongoose.Schema({
    text:String,
    type:Number,
    children : Object
});

CateSchema.plugin(materializedPlugin);//创建数据时候自动生成path


module.exports = mongoose.model('Cate',CateSchema);