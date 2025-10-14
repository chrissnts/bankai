import Transaction from '#models/transaction'
import TransactionPolicy from '#policies/transaction_policy'
import { createTransaction } from '#validators/transaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  /**
   * Display a list of resource
   */
  async index({ auth, bouncer, response, params }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(TransactionPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar transações' })
      }

      if (user.paper_id == 1) {
        const transactions = await Transaction.query()
          .preload('account', (AccountQuery) => AccountQuery.select('id', 'account_number'))


        return response.status(201).json({
          message: 'OK',
          data: transactions
        })

      }
      if (user.paper_id == 2) {
        const transactions = await Transaction.query().where('account_id', params.id)

        return response.status(201).json({
          message: 'OK',
          data: transactions
        })
      }



    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao listar transações'
      })
    }
  }

  /**
   * Display form to create a new record
   */


  /**
   * Handle form submission for the create action
   */
  async store({ request, bouncer, auth, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()


      if (await bouncer.with(TransactionPolicy).denies('makeTransfer')) {
        return response.forbidden({ message: 'Você não tem permissão para fazer transações' })
      }


      const body = request.body()
      const payload = await createTransaction.validate(body)

      const transaction = await Transaction.create({
        ...payload,
      })

      return response.status(201).json({
        message: 'Transação feita com sucesso',
        data: transaction
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro na transação'
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, auth, response, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(TransactionPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver esta transação' })
      }

      const transaction = await Transaction.query().where('id', params.id)

      return response.status(201).json({
        message: 'OK',
        data: transaction
      })

    } catch (error) {
      return response.status(500).json({
        message:'Error',
      })
    }
  }

  /**
   * Edit individual record
   */

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}