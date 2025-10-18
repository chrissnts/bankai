import User from '#models/user'
import Address from '#models/address'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { permissions } from '../utils/permissions.js'

export default class AddressPolicy extends BasePolicy {
  private getPerm(user: User | null) {
    if (!user) return null
    return permissions[user.paper_id] || null
  }

  list(user: User | null): AuthorizerResponse {
    const perm = this.getPerm(user)
    return perm ? perm.listAddress : false
  }

  view(user: User | null): AuthorizerResponse {
    const perm = this.getPerm(user)
    return perm ? perm.viewAddress : false
  }

  create(user: User | null): AuthorizerResponse {
    const perm = this.getPerm(user)
    return perm ? perm.createAddress : false
  }

  edit(user: User | null): AuthorizerResponse {
    const perm = this.getPerm(user)
    return perm ? perm.editAddress : false
  }

  delete(user: User | null): AuthorizerResponse {
    const perm = this.getPerm(user)
    return perm ? perm.deleteAddress : false
  }
}
