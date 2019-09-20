
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/taskManager', { useNewUrlParser: true }).then(() => {
  console.log('conneted');

}).catch(error => {
  console.log(error);

});

module.exports = {
  mongoose
};