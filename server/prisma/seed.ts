import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function bootstrap() {
  const user = await prisma.user.create({
    data: {
      name: 'Ruan Valente',
      email: 'ruan@prisma.com',
      avatarUrl: 'http://github.com/ruanvalente.png',
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participant: {
        create: {
          userId: user.id,
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-24T15:02:31.315Z',
      firstTeamCountryCode: 'ARG',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-26T15:02:31.315Z',
      firstTeamCountryCode: 'ARG',
      secondTeamCountryCode: 'DE',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 4,

          participant: {
            connect: {
              userId_poolId: {
                poolId: pool.id,
                userId: user.id,
              }
            }
          }
        }
      }
    }
  })
}

bootstrap();