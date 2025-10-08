import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissions.js'

export default class ClientPolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id].listClients
  }

  view(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id].viewClient
  }

  create(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id].createClient
  }

  edit(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id].editClient
  }

  delete(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.paper_id].deleteClient
  }
}
