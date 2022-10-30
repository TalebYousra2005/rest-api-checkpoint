const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config({ path: __dirname + "/app/config/.env" });
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_URL;
const User = require("./model/User");

mongoose
  .connect(`mongodb://localhost:27017/${MONGO_DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`connected to DATABASE`));
const routes = () => {
  router.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (err) {
      const status = err.status || 500;
      res.status(status).send(err.message);
    }
  });

  router.post("/users", (req, res) => {
    try {
      const user = new User({
        name: "yousra",
        age: 17,
        email: "talebyousra63@gmail.com",
      });
      // saving our new created instances
      const savedUser = User.save();
      res.status(201).send(savedUser);
    } catch (err) {
      res.status(err.status).send(err.message);
    }
  });

  router.put("/users/:id", (req, res) => {
    try {
      const user = User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        useFindAndModify: false,
      });
      res.status(200).json({ message: "User updated", data: user });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  router.delete("/users/:id", (req, res) => {
    try {
      User.deleteOne({ _id: req.params.id });
      res.status(200).send("User deleted");
    } catch (err) {
      res.status(err.status).send(err.message);
    }
  });
  return router;
};

app.use("/", routes());

app.listen(PORT, () => console.log(`app running on port ${PORT} `));
