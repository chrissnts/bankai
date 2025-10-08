import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import logger from '@adonisjs/core/services/logger'
import { permissions } from '../utils/permissions.js'

export default class AuthController {
  
  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)
      const user = await User.create(payload)
      // Criar token de acesso para o usuário recém-registrado
      const token = await User.accessTokens.create(user, ['*'], {
        name: 'Registration Token',
        expiresIn: '30 days',
      })

      return response.created({
        message: 'Usuário registrado com sucesso',
        user: {
          id: user.id,
          cpf: user.cpf,
          fullName: user.fullName,
          email: user.email,
          paper_id: user.paper_id,
          createdAt: user.createdAt,
        },
        token: {
          type: 'bearer',
          value: token.value!.release(),
          expiresAt: token.expiresAt,
        },
        permissions: { ...permissions[user.paper_id] },
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erro ao registrar usuário',
        errors: error.messages || error.message,
      })
    }
  }

  /**
   * Fazer login do usuário
   */
  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)

      logger.info(`${email} - ${password}`)

      const user = await User.verifyCredentials(email, password)

      // Criar token de acesso
      const token = await User.accessTokens.create(user, ['*'], {
        name: 'Login Token',
        expiresIn: '30 days',
      })

      logger.info(permissions[user.paper_id])
      return response.ok({
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
        token: {
          type: 'bearer',
          value: token.value!.release(),
          expiresAt: token.expiresAt,
        },
        permissions: { ...permissions[user.paper_id] },
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Credenciais inválidas',
      })
    }
  }

  /**
   * Fazer logout do usuário (invalidar token atual)
   */
  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const token = auth.user?.currentAccessToken

      if (token) {
        await User.accessTokens.delete(user, token.identifier)
      }

      return response.ok({
        message: 'Logout realizado com sucesso',
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Token inválido',
      })
    }
  }

  /**
   * Obter informações do usuário autenticado
   */
  async me({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      return response.ok({
        user: {
          id: user.id,
          cpf: user.cpf,
          fullName: user.fullName,
          email: user.email,
          paper_id: user.paper_id,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Token inválido',
      })
    }
  }

  /**
   * Listar todos os tokens do usuário autenticado
   */
  async tokens({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const tokens = await User.accessTokens.all(user)

      return response.ok({
        tokens: tokens.map(token => ({
          name: token.name,
          type: token.type,
          abilities: token.abilities,
          lastUsedAt: token.lastUsedAt,
          expiresAt: token.expiresAt,
          createdAt: token.createdAt,
        }))
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Token inválido',
      })
    }
  }

  /**
   * Criar um novo token para o usuário autenticado
   */
  async createToken({ auth, request, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const { name, abilities, expiresIn } = request.only(['name', 'abilities', 'expiresIn'])

      const token = await User.accessTokens.create(user, abilities || ['*'], {
        name: name || 'API Token',
        expiresIn: expiresIn || '30 days',
      })

      return response.created({
        message: 'Token criado com sucesso',
        token: {
          type: 'bearer',
          value: token.value!.release(),
          name: token.name,
          abilities: token.abilities,
          expiresAt: token.expiresAt,
        },
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erro ao criar token',
        error: error.message,
      })
    }
  }
}