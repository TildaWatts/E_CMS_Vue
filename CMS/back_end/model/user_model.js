
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = new mongoose.Schema({ 
    username : String,
    password : String,
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);

// module.exports = Model; 