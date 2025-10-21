import Transaction from '#models/transaction'
import TransactionPolicy from '#policies/transaction_policy'
import { createTransaction } from '#validators/transaction'
import type { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'
import db from '@adonisjs/lucid/services/db'

export default class TransactionsController {
  /**
   * Lista todas as transações
   */
  async index({ auth, bouncer, response }: HttpContext) {
  try {
    const user = await auth.getUserOrFail();

    if (await bouncer.with(TransactionPolicy).denies('list')) {
      return response.forbidden({ message: 'Você não tem permissão para listar transações' });
    }

    // Busca a conta do usuário para pegar o id da conta
    const account = await user.related('account').query().first();

    if (!account) {
      return response.status(404).json({ message: 'Conta do usuário não encontrada' });
    }

    // Busca transações da conta do usuário, preload account selecionando só id e account_number (id usado)
    const transactions = await Transaction.query()
      .where('account_id', account.id)
      .preload('account', (query) => query.select('id')) // seleciona só o id da conta
    

    return response.status(200).json({
      message: 'OK',
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: 'Erro ao listar transações',
    });
  }
}


  /**
   * Cria uma transação genérica (não Pix)
   */
  async store({ request, bouncer, auth, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(TransactionPolicy).denies('makeTransfer')) {
        return response.forbidden({ message: 'Você não tem permissão para fazer transações' })
      }

      const body = request.body()
      const payload = await createTransaction.validate(body)

      const transaction = await Transaction.create(payload)

      return response.status(201).json({
        message: 'Transação feita com sucesso',
        data: transaction,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro na transação',
      })
    }
  }

  /**
   * Transferência Pix entre contas
   */
  async transfer({ request, auth, response }: HttpContext) {
    const trx = await db.transaction()

    try {
      const user = await auth.getUserOrFail()

      const { fromAccount, toAccount, amount } = request.only([
        'fromAccount',
        'toAccount',
        'amount',
      ])

      console.log('fromAccount:', fromAccount)
      console.log('toAccount:', toAccount)
      console.log('amount:', amount)
      // validaçoes (que provavelmente era pra ser na service)
      if (!fromAccount || !toAccount || !amount || Number.isNaN(Number(amount))) {
        await trx.rollback()
        return response.status(400).json({ message: 'Dados inválidos para transferência' })
      }

      if (fromAccount.id === toAccount.id) {
        await trx.rollback()
        return response
          .status(400)
          .json({ message: 'Não é possível transferir para a mesma conta' })
      }

      // busca contas
      const source = await Account.find(fromAccount)
      const destination = await Account.find(toAccount);

      if (!source) {
        await trx.rollback()
        return response.status(404).json({ message: 'Conta de origem não encontrada' })
      }

      if (!destination) {
        await trx.rollback()
        return response.status(404).json({ message: 'Conta de destino não encontrada' })
      }

      const transferAmount = Number(parseFloat(amount).toFixed(2))

      // verifica saldo suficiente
      if (source.balance < transferAmount) {
        await trx.rollback()
        return response.status(400).json({ message: 'Saldo insuficiente para a transferência' })
      }

      // atualiza saldos
      source.balance = Number((Number(source.balance) - transferAmount).toFixed(2))
      destination.balance = Number((Number(destination.balance) + transferAmount).toFixed(2))

      await source.useTransaction(trx).save()
      await destination.useTransaction(trx).save()


      // cria as transactions
      await Transaction.create({
        account_id: source.id,
        type: 'pix',
        amount: amount,
        description: `Transferência Pix para ${destination.id}`,
      }, { client: trx })

      await Transaction.create({
        account_id: destination.id,
        type: 'pix',
        amount: amount,
        description: `Transferência Pix recebida da conta  ${source.id}`,
      }, { client: trx })


      await trx.commit()

      return response
        .status(201)
        .json({
          message: 'Transferência realizada com sucesso!',
        })
    } catch (error) {
      await trx.rollback()
      console.error(error)
      return response.status(500).json({ message: 'Erro ao realizar transferência' })
    }
  }

  /**
 * Deposita dinheiro na própria conta (poupança)
 */
async deposit({ request, auth, response }: HttpContext) {
  const trx = await db.transaction()

  try {
    const user = await auth.getUserOrFail()
    const { amount } = request.only(['amount'])

    if (!amount || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      return response.status(400).json({ message: 'Valor de depósito inválido' })
    }

    const depositAmount = Number(parseFloat(amount).toFixed(2))


    const account = await Account.findByOrFail('user_id', user.id)
    account.balance = Number((Number(account.balance) + depositAmount).toFixed(2))

    await account.useTransaction(trx).save()


    await Transaction.create({
      account_id: account.id,
      type: 'deposit',
      amount: depositAmount,
      description: 'Depósito em poupança',
    }, { client: trx })


    await trx.commit()

    return response.status(201).json({ message: 'Depósito realizado com sucesso!' })

  } catch (error) {
    await trx.rollback()
    console.error(error)
    return response.status(500).json({ message: 'Erro ao realizar depósito' })
  }
}


  /**
   * Mostra uma transação individual
   */
  async show({ params, auth, response, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(TransactionPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver esta transação' })
      }

      const transaction = await Transaction.query().where('id', params.id).first()

      if (!transaction) {
        return response.status(404).json({ message: 'Transação não encontrada' })
      }

      return response.status(200).json({
        message: 'OK',
        data: transaction,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Erro ao buscar transação' })
    }
  }
}
