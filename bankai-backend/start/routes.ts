/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| Aqui ficam todas as rotas da aplicação.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

/**
 * Rota inicial (teste)
 */
router.get('/', async () => {
  return { message: 'API ' }
})


/**
 * Rotas de autenticação
 */
router
  .group(() => {
    // Rotas públicas
    router.post('/register', '#controllers/auth_controller.register')
    router.post('/login', '#controllers/auth_controller.login')

    // Rotas protegidas de autenticação
    router.post('/logout', '#controllers/auth_controller.logout').use([middleware.auth()])
    router.get('/me', '#controllers/auth_controller.me').use([middleware.auth()])
    router.get('/tokens', '#controllers/auth_controller.tokens').use([middleware.auth()])
    router.post('/tokens', '#controllers/auth_controller.createToken').use([middleware.auth()])
  })
  .prefix('/auth')


router
  .group(() => {
    router.get('/', '#controllers/clients_controller.index') .use([middleware.auth()])      // listar todos os clientes
    router.post('/', '#controllers/clients_controller.store') .use([middleware.auth()])      // criar cliente
    router.get('/:id', '#controllers/clients_controller.show') .use([middleware.auth()])     // mostrar cliente específico
    router.put('/:id', '#controllers/clients_controller.update') .use([middleware.auth()])   // atualizar cliente
    router.delete('/:id', '#controllers/clients_controller.destroy') .use([middleware.auth()]) // deletar cliente
  })
  .prefix('/clients')
  

