import mongoose from "mongoose";

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.dkxpu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// Connect to mongoDB
export = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err: any) => {
      console.log(err);
    });
};
