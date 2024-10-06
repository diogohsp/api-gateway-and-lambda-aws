const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const winnerRoutes = require("./routes/winnerRoutes");

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.CONEXAO_MONGO);

// rota exemplo
app.get("/", (req, res) => {
  return res.send("Hello World!");
});

// usando o routes
app.use("/winners", winnerRoutes);

// app.listen(3000, () => {
//   console.log("excutando na porta 3000");
// });

module.exports.handler = serverless(app);
