import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

/**
 * Rota inicial - API online
 */
router.get('/', async () => {
  return { message: 'API ONLINE' }
})

/**
 * Rotas de autenticação
 */
router
  .group(() => {
    // Rotas públicas de autenticação
    router.post('/register', '#controllers/auth_controller.register')
    router.post('/login', '#controllers/auth_controller.login')

    // Rotas protegidas (usuário logado)
    router
      .group(() => {
        router.post('/logout', '#controllers/auth_controller.logout')
        router.get('/me', '#controllers/auth_controller.me')
        router.get('/tokens', '#controllers/auth_controller.tokens')
        router.post('/tokens', '#controllers/auth_controller.createToken')
      })
      .use([middleware.auth()])
  })
  .prefix('/auth')

/**
 * Rotas de Clientes — restrito a admin
 */
router
  .group(() => {
    router.get('/', '#controllers/clients_controller.index')
    router.post('/', '#controllers/clients_controller.store')
    router.put('/:id', '#controllers/clients_controller.update')
    router.delete('/:id', '#controllers/clients_controller.destroy')
  })
  .prefix('/clients')
  .middleware([middleware.auth(), middleware.admin()])

/**
 * Rotas de Contas — restrito a admin
 */
router
  .group(() => {
    router.get('/', '#controllers/accounts_controller.index')
    router.post('/', '#controllers/accounts_controller.store')
    router.get('/:id', '#controllers/accounts_controller.show')
    router.put('/:id', '#controllers/accounts_controller.update')
    router.delete('/:id', '#controllers/accounts_controller.destroy')
  })
  .prefix('/accounts')
  .middleware([middleware.auth(), middleware.admin()])

/**
 * Rotas de Transações — apenas usuário autenticado
 */
router
  .group(() => {
    router.get('/', '#controllers/transactions_controller.index')
    router.post('/', '#controllers/transactions_controller.store')
    router.get('/:id', '#controllers/transactions_controller.show')
    router.post('/transfer', '#controllers/transactions_controller.transfer')
  })
  .prefix('/transactions')
  .middleware([middleware.auth()])

/**
 * Rota do cliente logado — acessa seus próprios dados
 */
router
  .group(() => {
    router.get('/me', '#controllers/clients_controller.me')
  })
  .prefix('/clients')
  .middleware([middleware.auth()])

