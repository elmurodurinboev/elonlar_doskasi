const mongoose = require("mongoose");
// Connect mongodb local
// All function of mongoose return the asynchrone function
const connectToDb = async () => {
  const connecting = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDb connected with ${connecting.connection.host}`);
};

module.exports = { connectToDb };
