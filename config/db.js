const mongoose = require("mongoose");

const connectToDb = async () => {
  const connecting = await mongoose.connect(
    "mongodb://localhost:27017/postersapp",
    {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );
  console.log(`MongoDb connected with ${connecting.connection.host}`);
};

module.exports = { connectToDb };
