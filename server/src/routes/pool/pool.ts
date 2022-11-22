import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";

import { z } from "zod";
import ShortUniqueId from "short-unique-id";

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  fastify.post(
    "/pools",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const generatedID = new ShortUniqueId({ length: 6 });
      const createPoolBody = z.object({
        title: z.string(),
      });

      const { title } = createPoolBody.parse(request.body);
      const code = String(generatedID()).toUpperCase();

      try {
        await request.jwtVerify();
        await prisma.pool.create({
          data: {
            title,
            code,
            ownerId: request.user.sub,
            participant: {
              create: {
                userId: request.user.sub,
              },
            },
          },
        });
      } catch (error) {
        await prisma.pool.create({ data: { title, code } });
      }
      return reply.status(201).send({ code });
    }
  );
}
