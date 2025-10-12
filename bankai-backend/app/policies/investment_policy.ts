import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissions.js'

export default class InvestmentPolicy extends BasePolicy {
  view(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id - 1].viewInvestment
  }

  makeInvestment(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id - 1].makeInvestment
  }
}