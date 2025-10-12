import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissions.js'

export default class TransactionPolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id - 1].listTransactions
  }

  view(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id - 1].viewStatement
  }

  makeTransfer(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id - 1].makeTransfer
  }

  checkBalance(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id - 1].checkBalance
  }
}