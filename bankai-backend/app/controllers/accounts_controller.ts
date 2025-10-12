import type { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'
import { createAccount, updateAccount } from '#validators/account'
import AccountPolicy from '#policies/account_policy'

export default class AccountsController {
  /**
   * Listar todas as contas
   */
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AccountPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar contas' })
      }

      const accounts = await Account.query()
        .preload('user', (userQuery) => userQuery.select(['id', 'fullName']))
        .preload('transactions').whereNot('id', 1) 

      return response.status(200).json({
        message: 'OK',
        data: accounts,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao listar contas',
      })
    }
  }

  /**
   * Criar uma nova conta
   */
  async store({ request, response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AccountPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar contas' })
      }

      const body = request.body()
      const payload = await createAccount.validate(body)

      const account = await Account.create({
        ...payload,
      })

      return response.status(201).json({
        message: 'Conta criada com sucesso.',
        data: account,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao criar conta',
      })
    }
  }

  /**
   * Mostrar detalhes de uma conta
   */
  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AccountPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver esta conta' })
      }

      const account = await Account.query()
        .where('id', params.id)
        .preload('transactions')
        .preload('user')
        .firstOrFail()

      return response.status(200).json({
        message: 'OK',
        data: account,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao buscar conta',
      })
    }
  }

  /**
   * Atualizar uma conta
   */
  async update({ params, request, response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AccountPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar esta conta' })
      }

      const body = request.body()
      const payload = await updateAccount.validate(body)

      const account = await Account.findOrFail(params.id)
      await account.merge(payload).save()

      return response.status(200).json({
        message: 'Conta atualizada com sucesso.',
        data: account,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao atualizar conta',
      })
    }
  }

  /**
   * Remover uma conta
   */
  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AccountPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover esta conta' })
      }

      const account = await Account.findOrFail(params.id)
      await account.delete()

      return response.status(200).json({
        message: 'Conta removida com sucesso',
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao remover conta',
      })
    }
  }
}
