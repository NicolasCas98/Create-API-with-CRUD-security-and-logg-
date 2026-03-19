const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRoutes = require("./routes/user.routes");
const errorMiddleware = require("./middlewares/error.middlewares");

const app = express();


app.use(helmet());
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/users", usersRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});