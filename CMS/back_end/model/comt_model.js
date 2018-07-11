
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ComtSchema = new mongoose.Schema({ 
    username : String,
    comtime : String,
    comdetail: String,
    newsid: String,
});

ComtSchema.plugin(mongoosePaginate);

//Comment这是数据库的表名，传到数据库转化成comments
module.exports = mongoose.model('Comment', ComtSchema);
