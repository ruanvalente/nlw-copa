import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";

import { z } from "zod";
import ShortUniqueId from "short-unique-id";
import { authenticated } from "../../plugins/authenticated";

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

  fastify.post(
    "/pools/join",
    { onRequest: [authenticated] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const joinPoolBody = z.object({
        code: z.string(),
      });

      const { code } = joinPoolBody.parse(request.body);

      const pool = await prisma.pool.findUnique({
        where: {
          code,
        },
        include: {
          participant: {
            where: {
              userId: request.user.sub,
            },
          },
        },
      });

      if (!pool) {
        return reply.status(404).send({
          error: "Poll not found.",
        });
      }

      if (pool.participant.length > 0) {
        return reply.status(400).send({
          error: "You already joined this poll.",
        });
      }

      if (!pool.ownerId) {
        await prisma.pool.update({
          where: {
            id: pool.id,
          },
          data: {
            ownerId: request.user.sub,
          },
        });
      }

      await prisma.participant.create({
        data: {
          poolId: pool.id,
          userId: request.user.sub,
        },
      });

      return reply.status(201).send();
    }
  );

  fastify.get(
    "/pools",
    { onRequest: [authenticated] },
    async (request: FastifyRequest) => {
      const pools = await prisma.pool.findMany({
        where: {
          participant: {
            some: {
              userId: request.user.sub,
            },
          },
        },
        include: {
          _count: {
            select: {
              participant: true,
            },
          },
          participant: {
            select: {
              id: true,
              user: {
                select: {
                  avatarUrl: true,
                },
              },
            },
            take: 4,
          },
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return { pools };
    }
  );

  fastify.get(
    "/pools/:id",
    { onRequest: [authenticated] },
    async (request: FastifyRequest) => {
      const getPoolParams = z.object({
        id: z.string(),
      });

      const { id } = getPoolParams.parse(request.params);

      const pools = await prisma.pool.findUnique({
        where: {
          id,
        },
        include: {
          _count: {
            select: {
              participant: true,
            },
          },
          participant: {
            select: {
              id: true,
              user: {
                select: {
                  avatarUrl: true,
                },
              },
            },
            take: 4,
          },
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return { pools };
    }
  );
}
