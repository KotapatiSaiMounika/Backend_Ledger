const mongoose = require("mongoose")


function connectToDB(){
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Server is connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
}
module.exports = connectToDB;