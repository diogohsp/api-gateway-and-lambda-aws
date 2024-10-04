import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import serverless from "serverless-http";

// Carrega as variáveis de ambiente
dotenv.config();

console.log(process.env.CONEXAO_MONGO);
console.log(process.env.PORT);

const app = express();
app.use(express.json());
const port = process.env.PORT;

const Winner = mongoose.model("Winner", {
  name: String,
  prize: String,
  date: String,
});

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

// Create
app.post("/", async (req, res) => {
  const winner = new Winner({
    name: req.body.name,
    prize: req.body.prize,
    date: req.body.date,
  });

  await winner.save();
  return res.send(winner);
});

// Read
app.get("/list", async (req, res) => {
  const winners = await Winner.find();
  return res.send(winners);
});

// Remove
app.delete("/delete/:id", async (req, res) => {
  const winner = await Winner.findByIdAndDelete(req.params.id);
  return res.send(winner);
});

app.listen(port, () => {
  console.log(process.env.CONEXAO_MONGO); // Verificar a variável aqui
  mongoose.connect(process.env.CONEXAO_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`App running on port ${port}`);
});

export const handler = serverless(app);
