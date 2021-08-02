
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://taskManagerUser:EHR44445@ds333098.mlab.com:33098/task-manager', { useNewUrlParser: true }).then(() => {
  console.log('conneted');

}).catch(error => {
  console.log(error);

});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
  mongoose
};