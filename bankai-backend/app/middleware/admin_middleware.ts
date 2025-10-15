import type { HttpContext } from '@adonisjs/core/http'

export default class Admin {
  public async handle({ auth, response }: HttpContext, next: () => Promise<void>) {
    const user = auth.user
    if (!user || user.paper_id !== 1) {
      return response.unauthorized({ message: 'Acesso negado. Somente administradores.' })
    }
    await next()
  }
}