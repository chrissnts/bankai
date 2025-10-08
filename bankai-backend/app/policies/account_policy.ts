import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissions.js'

export default class AccountPolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id].listAccounts
  }

  view(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id].viewAccount
  }

  create(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id].createAccount
  }

  edit(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id].editAccount
  }

  delete(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id].deleteAccount
  }
}