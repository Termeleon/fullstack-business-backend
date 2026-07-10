import express from "express";
import { prisma } from "../prismaClient";
import bodyParser from "body-parser";

const router = express.Router();

router.post('/roles', async (req, res) => {
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
      if ((error as any).code === "P2002") {
        res.status(409).json({ error: "Role already exists" });
        return;
      }
  
      console.error(error);
      res.status(500).json({ error: "Failed to create role" });
    }
  });
  
  router.get('/roles', async (req, res) => {
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

export default router;