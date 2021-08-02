const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb://user1:QazWsx123@cluster0-shard-00-00.ha2pv.mongodb.net:27017,cluster0-shard-00-01.ha2pv.mongodb.net:27017,cluster0-shard-00-02.ha2pv.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUndefinedTopology: true },
  )
  .then(() => {
    console.log("conneted");
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = {
  mongoose,
};

// user1
// QazWsx123
