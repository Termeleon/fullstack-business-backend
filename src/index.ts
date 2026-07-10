import express from "express";
import { prisma } from "./prismaClient";
import rolesRouter from "./routes/roles";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(rolesRouter);

app.get("/", (req, res) => {
  console.log("Request received on root path");
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
