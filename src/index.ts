import express from "express";
import { prisma } from "./prismaClient";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Request received on root path");
  res.send("Hello World");
});

app.post('/roles', async (req, res) => {
  console.log('create role', req.body);
  try {
    const role = await prisma.role.create({
      data: {
        name: req.body.name,
        permissions: {
          connect: req.body.permissions.map((permission: string) => ({name: permission})),
        }
      }
    });
    res.status(201).json(role);
  } catch (error) {
    res.status(409).json({ error: 'Failed to create role' });
  }
});

app.get('/roles', async (req, res) => {
  const roles = await prisma.role.findMany(
    {
      include: {
        permissions: true,
      },
    }
  );
  console.log(roles)
  res.status(200).json(roles)
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
