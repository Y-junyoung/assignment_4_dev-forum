import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

// app.get("/users", async (_, res) => {
//     const users = await prismaClient.user.findMany();

//     res.json(users);
//   });

export default prismaClient;
