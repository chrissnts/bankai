import type { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'
import { createAccount, updateAccount } from '#validators/account'
import AccountPolicy from '#policies/account_policy'

export default class AccountsController {
  /**
   * Display a list of resource
   */
  async index({ response, auth, bouncer }: HttpContext) {
    try {
       const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AccountPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar contas' })
      }

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
  async store({ request, response, auth, bouncer }: HttpContext) {
    const body = request.body()
    const payload = await createAccount.validate(body)

    try {

      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AccountPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar contas' })
      }


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
  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AccountPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver conta' })
      }




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
  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const body = request.body()
    const payload = await updateAccount.validate(body)

    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(AccountPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar uma conta' })
      }

      const account = await Account.findByOrFail(params.id)
      await account.merge({ ...payload }).save()

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
   * Delete record
   */
  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AccountPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover uma conta' })
      }
      const account = await Account.findOrFail(params.id)
      await account.delete()

      return response.status(200).json({
        message: 'OK',
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }
}
