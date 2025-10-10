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

/**
 * 📜 Endpoint de documentação / teste
 */
router.get('/hello', async () => {
  return {
    message: 'API AdonisJS com autenticação via Access Tokens',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        logout: 'POST /auth/logout (protegida)',
        me: 'GET /auth/me (protegida)',
        tokens: 'GET /auth/tokens (protegida)',
        createToken: 'POST /auth/tokens (protegida)',
      },
      entidades: {
        cursos: 'CRUD /cursos (protegida)',
        disciplinas: 'CRUD /disciplinas (protegida)',
        alunos: 'CRUD /alunos (protegida)',
        matriculas: 'GET/POST/DELETE /matriculas (protegida)',
      },
    },
  }
})
