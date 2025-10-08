import type { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'
import { createAccount } from '#validators/account'

export default class AccountsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const accounts = await Account.query().preload('transactions').preload('user')

      return response.status(200).json({
        message: 'OK',
        data: accounts,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    
    const body = request.body()
    const payload = await createAccount.validate(body)

    try {
      const account = await Account.create({
        ...payload,
      })

      return response.status(201).json({
        message: 'Conta criada com sucesso.',
        data: account,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const account = Account.query()
        .where('id', params.id)
        .preload('transactions')
        .preload('user')
        .firstOrFail()

      return response.status(200).json({
        message: 'OK',
        data: account,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
