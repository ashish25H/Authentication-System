const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB connected Successfully`))
    .catch((err) => {
      console.log(`DB Connection failed`);
      console.log(err);
      process.exit(1);
    });
};
