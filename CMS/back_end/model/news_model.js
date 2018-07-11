
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var NewsSchema = new mongoose.Schema({ 
    n_title : String,
    n_author : String,
    n_detail : String,
    nid : String,

});

NewsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('News', NewsSchema);
