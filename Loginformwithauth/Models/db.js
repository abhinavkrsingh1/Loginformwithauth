const mongoose = require("mongoose");
const mongoDb = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/auth")
  .then(()=> console.log("MOngodb Connected"))
  .catch((err)=>console.error('Something issues'))
};
module.exports=mongoDb;
