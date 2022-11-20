import Fastify from 'fastify'
import cors from '@fastify/cors'

import { poolRoutes } from './routes/pool/pool'
import { userRoutes } from './routes/user/user'
import { guesseRoutes } from './routes/guesse/guesse'
import { gamerRoutes } from './routes/gamer/gamer'
import { authRoutes } from './routes/auth/auth'

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(poolRoutes)
  await fastify.register(userRoutes)
  await fastify.register(guesseRoutes)
  await fastify.register(gamerRoutes)
  await fastify.register(authRoutes)

  await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ })
}

bootstrap()