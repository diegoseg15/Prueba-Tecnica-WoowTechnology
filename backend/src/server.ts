import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/users.routes";

dotenv.config();

const app = express();
const path = "/api";

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.json({
    message: "API funcionandoooo!!",
  });
});

app.use(`${path}/auth`, authRoutes);
app.use(`${path}/users`, usersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
