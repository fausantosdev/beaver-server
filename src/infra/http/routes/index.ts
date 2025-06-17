import { FastifyInstance } from 'fastify'

import { RateLimiter } from '../middlewares/rate-limiter'
import { authRoutes } from './auth.routes'
import { taskRoutes } from './task.routes'
import { userRoutes } from './user.routes'

const routes = (app: FastifyInstance) => {
  app.addHook('onRequest', RateLimiter.handle('app', 10))
  app.register(authRoutes, { prefix: '/auth' })
  app.register(userRoutes, { prefix: '/user' })
  app.register(taskRoutes, { prefix: '/task' })
}

export { routes }

/**
 * Erro:
 * FastifyError [Error]: Async function has too many arguments. Async hooks should not use the 'done' argument.
 *
 * Explicação:
 * O Fastify fornece duas maneiras principais de lidar com operações assíncronas em ganchos e plugins:
 *
 * Retornos de chamada com done:
 * Este padrão tradicional do Node.js envolve passar um doneretorno de chamada como último argumento para a função.
 * A função executa sua lógica assíncrona e então chama done()(ou, done(error)em caso de erro), para sinalizar a conclusão.
 *
 * async/ awaitou Promessas:
 * Essa abordagem moderna do JavaScript permite definir uma função como asynce usar awaitpara pausar a execução até que
 * uma Promise seja resolvida. A função retorna implicitamente uma Promise, e o Fastify cuida da sua resolução.
 *
 * O conflito:
 * O erro ocorre porque você está misturando essas duas abordagens. Quando você declara uma função como async, o Fastify
 * espera que ela trate operações assíncronas retornando uma Promise. Introduzir o doneretorno de chamada em uma
 * asyncfunção cria ambiguidade e pode levar a comportamentos inesperados, pois o Fastify pode tentar lidar com a conclusão
 * do hook/plugin duas vezes (uma vez por meio da resolução da Promise e outra por meio do doneretorno de chamada).
 *
 * Solução:
 *
 * Para resolver esse erro, você deve escolher um dos dois métodos de tratamento assíncrono:
 *
 * Remova o done argumento das async funções: Se o seu hook ou plugin for uma async função, remova o done argumento
 * da assinatura dele. Trate operações assíncronas usando awaitou retornando Promises.
 *
 * Converter async funções em funções baseadas em retorno de chamada (se done realmente desejado): Se você precisar usar
 * o done retorno de chamada especificamente por algum motivo, a função não deve ser declarada como async.
 */
